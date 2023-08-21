import {NextRequest, NextResponse} from 'next/server';
import {cookies} from "next/headers";

export const dynamic = "force-dynamic"

// https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
//
// Good to know: .set() is only available in a Server Action or Route Handler.
export async function GET(request: NextRequest) {
    console.log('in api-set-cookie')

    const cookieStore = cookies()
    cookieStore.getAll().map((cookie) => (
        console.log(cookie)))

    // cookies().set('name', 'lee')
    // // or

    cookies().set('name1', 'lee1')
    cookies().set('name2', 'lee2', { secure: true, expires: new Date(0) })

    return NextResponse.json({message: "ok"});
}

// this returns a cookie.

// HTTP/1.1 200 OK
// < date: Mon, 21 Aug 2023 01:04:27 GMT
// < vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept-Encoding
// < content-type: application/json
// < set-cookie: name=lee; Path=/
// < connection: close
// < transfer-encoding: chunked
// <
// * Closing connection 0
// {"message":"ok"}%