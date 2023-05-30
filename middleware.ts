import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

const redis = new Redis({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN
});

const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
});


export async function middleware(request: NextRequest) {
    console.log('middleware')
    const ip = request.ip ?? "127.0.0.1";
    const {success, pending, limit, reset, remaining} = await ratelimit.limit(
        ip
    );
    return success
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/blocked", request.url));
}

