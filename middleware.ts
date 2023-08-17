
import type { NextRequest } from 'next/server'

// https://vercel.com/docs/concepts/edge-network/headers
export function middleware(request: NextRequest) {

    const clientIP = request.ip ?? "127.0.0.1";
    console.log(`MW: clientIP: ${clientIP}`);

    // The public IP address of the client that made the request.
    // If you are trying to use Vercel behind a proxy, we currently overwrite the
    // X-Forwarded-For
    //  header and do not forward external IPs.
    //  This restriction is in place to prevent IP spoofing.
    //  Please contact us if allowing Vercel to trust your X-Forwarded-For IP is a feature your Team needs (Enterprise only).
    const x_real_ip = request.headers.get('x-real-ip');
    const x_forwarded_for = request.headers.get('x-forwarded-for');

    console.log(`MW: x-real-ip: ${x_real_ip}`);
    console.log(`MW: x-forwarded-for: ${x_forwarded_for}`);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        // '/'
    ],
};
