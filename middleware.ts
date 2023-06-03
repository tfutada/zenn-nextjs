import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

const redis = new Redis({
    url: process.env.KV_REST_API_URL ?? 'expect redis url',
    token: process.env.KV_REST_API_TOKEN ?? 'expect redis token'
});

// An interval of `10s` and refillRate of 5 will cause a new token to be added every 2 seconds
const limiter = {
    'sliding': Ratelimit.slidingWindow(10, "10 s"),
    'bucket': Ratelimit.tokenBucket(5, "10 s", 10)
}

const ratelimit = new Ratelimit({
    redis,
    limiter: limiter.bucket
});

export async function middleware(request: NextRequest) {
    const ip = request.ip ?? "127.0.0.1";
    const resp = await ratelimit.limit(
        ip
    );

    console.log(`success: ${resp.success}, remaining: ${resp.remaining}, reset: ${resp.reset}`)

    return resp.success
        ? NextResponse.next()
        : new NextResponse("Too many requests", {status: 429});
}
