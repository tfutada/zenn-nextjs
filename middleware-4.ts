import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware4(request: NextRequest) {
    // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
    // Getting cookies from the request using the `RequestCookies` API
    let cookie = request.cookies.get('nextjs')?.value;
    console.log(cookie); // => 'fast'
    const allCookies = request.cookies.getAll();
    console.log(allCookies); // => [{ name: 'nextjs', value: 'fast' }]

    request.cookies.has('nextjs'); // => true
    request.cookies.delete('nextjs');
    request.cookies.has('nextjs'); // => false

    // Setting cookies on the response using the `ResponseCookies` API
    const response = NextResponse.next();
    response.cookies.set('vercel', 'fast');
    response.cookies.set({
        name: 'vercel',
        value: 'fast',
        path: '/',
    });

    let cookie2 = response.cookies.get('vercel');
    console.log(cookie2); // => { name: 'vercel', value: 'fast', Path: '/' }
    // The outgoing response will have a `Set-Cookie:vercel=fast;path=/test` header.

    return response;
}