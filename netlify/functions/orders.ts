import { Handler } from "@netlify/functions";
import fetch from "node-fetch";
import crypto from "crypto";

interface ShopifyOrder {
    id: number;
    email?: string;
    phone?: string;
    total_price: string;
    currency: string;
    order_status_url?: string;
    note_attributes: Array<{ name: string; value: string }>;
    line_items: Array<{ product_id: number; quantity: number; title: string }>;
}

const sha256 = (str?: string) =>
    str ? crypto.createHash("sha256").update(str).digest("hex") : undefined;

export const handler: Handler = async (event) => {
    // Basic validation
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const order: ShopifyOrder = JSON.parse(event.body || "{}");

        // Map Shopify note_attributes to a helper object
        const attributes: Record<string, string> = {};
        (order.note_attributes || []).forEach(attr => {
            attributes[attr.name] = attr.value;
        });

        const {
            id,
            email,
            phone,
            line_items,
            total_price,
            currency,
            order_status_url,
        } = order;

        // deterministic dedupe id
        const eventId = crypto
            .createHash("sha256")
            .update(String(id))
            .digest("hex");

        const ip =
            event.headers["x-nf-client-connection-ip"] ||
            event.headers["x-forwarded-for"] ||
            "";

        const userAgent = event.headers["user-agent"] || "";

        const commonUserData = {
            em: sha256(email?.toLowerCase()),
            ph: sha256(phone),
            fbp: attributes._fbp,
            fbc: attributes._fbc,
            client_ip_address: ip,
            client_user_agent: userAgent,
        };

        /* ---------------- META CAPI ---------------- */
        if (process.env.META_PIXEL_ID && process.env.META_ACCESS_TOKEN) {
            try {
                await fetch(
                    `https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            data: [
                                {
                                    event_name: "Purchase",
                                    event_time: Math.floor(Date.now() / 1000),
                                    event_source_url: order_status_url,
                                    event_id: eventId,
                                    action_source: "website",
                                    user_data: commonUserData,
                                    custom_data: {
                                        currency,
                                        value: Number(total_price),
                                        content_ids: line_items.map(li => String(li.product_id)),
                                        content_type: "product",
                                    },
                                },
                            ],
                            access_token: process.env.META_ACCESS_TOKEN,
                        }),
                    }
                );
            } catch (err) {
                console.error("Meta CAPI Error:", err);
            }
        }

        /* ---------------- TIKTOK EVENTS API ---------------- */
        if (process.env.TIKTOK_PIXEL_ID) {
            try {
                await fetch("https://business-api.tiktok.com/open_api/v1.3/pixel/track/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        pixel_code: process.env.TIKTOK_PIXEL_ID,
                        event: "Purchase",
                        event_id: eventId,
                        timestamp: Math.floor(Date.now() / 1000),
                        context: {
                            user: {
                                email: sha256(email?.toLowerCase()),
                                phone_number: sha256(phone),
                                external_id: sha256(email),
                                ttclid: attributes.ttclid,
                                ttp: attributes._ttp,
                                fbp: attributes._fbp,
                                fbc: attributes._fbc,
                                ip,
                                user_agent: userAgent,
                            },
                            page: {
                                url: order_status_url,
                            },
                        },
                        properties: {
                            currency,
                            value: Number(total_price),
                            content_ids: line_items.map(li => String(li.product_id)),
                            content_type: "product",
                        },
                    }),
                });
            } catch (err) {
                console.error("TikTok CAPI Error:", err);
            }
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (err) {
        console.error("Purchase Processing Error:", err);

        return {
            statusCode: 500,
            body: JSON.stringify({ success: false }),
        };
    }
};
