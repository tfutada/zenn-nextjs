
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    const clientIP = request.ip ?? "127.0.0.1";
    console.log(`MW: clientIP: ${clientIP}`);


}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
};
