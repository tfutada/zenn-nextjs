import {unwrap} from "@/app/common";

// this page becomes dynamic as it fails to connect to UPSTREAM_URL at build time
// ├ λ /api-upstream-fetch                    0 B                0 B
export const dynamic = "force-dynamic"


const upstream_url = unwrap(process.env.UPSTREAM_URL)

export async function GET(request: Request) {
    try {
        // fetch an upstream api
        const res = await fetch(`${upstream_url}/set_cookie`);

        // log the headers
        for (let [key, value] of res.headers.entries()) {
            console.log(`${key}: ${value}`);
        }

        const json = await res.json();
        console.log(json);

        if (!res.ok) {
            return new Response('failed at Upstream', {
                status: res.status,
            });
        }

        const headers: { [key: string]: string } = {}
        // my_cookie=my_value; Path=/; Max-Age=1687226886; HttpOnly
        const set_cookie = res.headers.get('set-cookie')
        console.log(set_cookie)
        if (set_cookie) {
            headers['set-cookie'] = set_cookie
        } else {
            console.log('!!! no set-cookie')
        }


        return new Response('Hello, Next.js!', {
            status: 200,
            headers
        });
    } catch (error) {
        console.error('Error fetching data from upstream API:', error);
        return new Response('Error fetching data from upstream API', {
            status: 500,
        });
    }
}
