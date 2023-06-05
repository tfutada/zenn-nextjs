import {kv} from '@vercel/kv';

export async function rateLimit(ip: string, maxRequests: number, windowInSecs: number): Promise<any> {
    const now = Date.now();
    const windowStart = now - windowInSecs * 1000;
    const key = `rate:${ip}`;

    try {
        // Remove old requests from the list
        await kv.zremrangebyscore(key, 0, windowStart);

        // Get the count of requests in the current window
        const current = await kv.zcount(key, '-inf', '+inf');
        let resp = {success: current < maxRequests, remaining: maxRequests - current, reset: windowInSecs};

        if (resp.success) {
            // If under the limit, log the request and proceed
            await kv.zadd(key, {score: now, member: `timestamp:${now}`});
            await kv.expire(key, windowInSecs);
        }

        return resp;
    } catch (err) {
        console.error('Redis error:', err);
        return {};
    }
}
