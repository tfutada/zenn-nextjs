import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import {rateLimit} from "@/app/my-ratelimit/sliding-window";

const redis = new Redis({
    url: process.env.REDIS_REST_API_URL ?? 'expect redis url',
    token: process.env.REDIS_REST_API_TOKEN ?? 'expect redis token'
});

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, "10 s")
});

export async function middleware(request: NextRequest) {
    const key = request.ip ?? "127.0.0.1";
    const algo = "sliding-window";

    let resp = {success: false, remaining: 0, reset: 0}

    if (algo === "sliding-window") {
        resp = await ratelimit.limit(key);
    } else if (algo === "my-fixed-window") {
        resp = await rateLimit(key, 10, 10);
    }

    console.log(`success: ${resp.success}, remaining: ${resp.remaining}, reset: ${resp.reset}`)

    return resp.success ? NextResponse.next()
        : new NextResponse("Too many requests", {status: 429});
}
