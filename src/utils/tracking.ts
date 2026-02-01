import { updateShopifyCartAttributes } from './shopify';

// utils/tracking.ts
export const TRACKING_COOKIE_EXPIRY = 365; // days

export const setTrackingCookie = (name: string, value: string) => {
    const hostname = window.location.hostname;
    // For local development, don't set a domain
    const domain = hostname === 'localhost' || hostname === '127.0.0.1'
        ? ''
        : `; domain=.${hostname.split('.').slice(-2).join('.')}`;

    document.cookie = `${name}=${value}; path=/; max-age=${TRACKING_COOKIE_EXPIRY * 24 * 60 * 60
        }${domain}; SameSite=Lax`;
};

export const getTrackingCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

export const persistTrackingIds = () => {
    // Meta
    const fbp = getTrackingCookie('_fbp') || `fb.1.${Date.now()}.${Math.floor(Math.random() * 100000)}`;
    const fbc = getTrackingCookie('_fbc') || null;

    setTrackingCookie('_fbp', fbp);
    if (fbc) setTrackingCookie('_fbc', fbc);

    // TikTok
    const ttp = getTrackingCookie('_ttp') || `ttp.${Date.now()}.${Math.floor(Math.random() * 100000)}`;
    const ttclid = getTrackingCookie('ttclid') || null;

    setTrackingCookie('_ttp', ttp);
    if (ttclid) setTrackingCookie('ttclid', ttclid);

    // LocalStorage for SPA persistence
    localStorage.setItem('trackingIds', JSON.stringify({ _fbp: fbp, _fbc: fbc, _ttp: ttp, ttclid }));
};

export const getTrackingIds = () => {
    const data = localStorage.getItem('trackingIds');
    return data ? JSON.parse(data) : {};
};

export const addTrackingToCart = async (cartId: string) => {
    const trackingIds = getTrackingIds();
    const attributes = Object.entries(trackingIds)
        .filter(([, value]) => value !== null)
        .map(([key, value]) => ({ key, value: String(value) }));

    if (attributes.length === 0) return;

    try {
        await updateShopifyCartAttributes(cartId, attributes);
    } catch (error) {
        console.error('Error adding tracking to cart:', error);
    }
};
