// https://nextjs.org/docs/app/building-your-application/routing/middleware#setting-headers
//
// < HTTP/1.1 200 OK
// < date: Wed, 16 Aug 2023 01:56:51 GMT
// < x-hello-from-middleware2: hello
// < vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept-Encoding
// < content-type: application/json
// < connection: close
// < transfer-encoding: chunked
// <
// * Closing connection 0

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middlewareHeader(request: NextRequest) {
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-hello-from-middleware1', 'hello') // this won't be sent to the client

    // You can also set request headers in NextResponse.rewrite
    const response = NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    })

    // Set a new response header `x-hello-from-middleware2`
    response.headers.set('x-hello-from-middleware2', 'hello') // this will be sent to the client
    return response
}