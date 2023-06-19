import {unwrap} from "@/app/common";


const upstream_url = unwrap(process.env.UPSTREAM_URL)

export async function GET(request: Request) {

    // fetch an upstream api
    const res = await fetch(`${upstream_url}/set_cookie`, {
        next: {revalidate: 60}
    });

    // log the headers
    for (let [key, value] of res.headers.entries()) {
        console.log(`${key}: ${value}`);
    }

    const json = await res.json();
    console.log(json);

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

}
