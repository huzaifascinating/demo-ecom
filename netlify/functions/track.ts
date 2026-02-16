import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import crypto from "crypto";

const sha256 = (str?: string) =>
    str ? crypto.createHash("sha256").update(str).digest("hex") : undefined;

export const handler: Handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const payload = JSON.parse(event.body || "{}");
        const { eventName, eventData, userData, sourceUrl, eventId } = payload;

        if (!eventName) {
            return { statusCode: 400, body: "Event name is required" };
        }

        const ip =
            event.headers["x-nf-client-connection-ip"] ||
            event.headers["x-forwarded-for"] ||
            "";

        const userAgent = event.headers["user-agent"] || "";

        // Common User Data for CAPI
        const commonUserData = {
            em: userData?.email ? sha256(userData.email.toLowerCase()) : undefined,
            ph: userData?.phone ? sha256(userData.phone) : undefined,
            fbp: userData?.fbp,
            fbc: userData?.fbc,
            client_ip_address: ip,
            client_user_agent: userAgent,
        };

        const responseData: any[] = [];

        /* ---------------- META CAPI ---------------- */
        if (process.env.META_PIXEL_ID && process.env.META_ACCESS_TOKEN) {
            try {
                const metaResponse = await fetch(
                    `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            data: [
                                {
                                    event_name: eventName,
                                    event_time: Math.floor(Date.now() / 1000),
                                    event_source_url: sourceUrl,
                                    event_id: eventId, // Used for deduplication with Pixel
                                    action_source: "website",
                                    user_data: commonUserData,
                                    custom_data: eventData,
                                },
                            ],
                            access_token: process.env.META_ACCESS_TOKEN,
                        }),
                    }
                );
                const metaJson = await metaResponse.json();
                responseData.push({ service: "meta", status: metaResponse.status, data: metaJson });
            } catch (err) {
                console.error("Meta CAPI Error:", err);
                responseData.push({ service: "meta", error: String(err) });
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, responses: responseData }),
        };
    } catch (err) {
        console.error("Tracking Processing Error:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: String(err) }),
        };
    }
};
