import {Redis} from "@upstash/redis";

const redis = new Redis({
    url: process.env.REDIS_REST_API_URL ?? 'expect redis url',
    token: process.env.REDIS_REST_API_TOKEN ?? 'expect redis token'
});

export async function rateLimit(ip: string, maxRequests: number, windowInSecs: number): Promise<any> {
    const now = Date.now();
    const windowStart = now - windowInSecs * 1000;
    const key = `rate:${ip}`;

    try {
        // Remove old requests from the list
        await redis.zremrangebyscore(key, 0, windowStart);

        // Get the count of requests in the current window
        const current = await redis.zcount(key, '-inf', '+inf');
        let resp = {success: current < maxRequests, remaining: maxRequests - current, reset: windowInSecs};

        if (resp.success) {
            // If under the limit, log the request and proceed
            await redis.zadd(key, {score: now, member: `timestamp:${now}`});
            await redis.expire(key, windowInSecs);
        }

        return resp;
    } catch (err) {
        console.error('Redis error:', err);
        return {};
    }
}
