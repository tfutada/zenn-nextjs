import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";
import {rateLimit} from "@/app/my-ratelimit/sliding-window";

const redis = new Redis({
    url: process.env.REDIS_REST_API_URL ?? 'expect redis url',
    token: process.env.REDIS_REST_API_TOKEN ?? 'expect redis token'
});

const limiter = {
    'sliding': Ratelimit.slidingWindow(10, "10 s"),
    'bucket': Ratelimit.tokenBucket(1, "10 s", 20)
}

const ratelimit = new Ratelimit({
    redis,
    limiter: limiter.sliding
});

export async function middleware(request: NextRequest) {
    const ip = request.ip ?? "127.0.0.1";
    const resp = await ratelimit.limit(ip);

    // const resp = await rateLimit(ip, 10, 10); // 10 requests per 60 seconds

    console.log(`success: ${resp.success}, remaining: ${resp.remaining}, reset: ${resp.reset}`)

    return resp.success
        ? NextResponse.next()
        : new NextResponse("Too many requests", {status: 429});
}
