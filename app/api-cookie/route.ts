import {cookies} from 'next/headers';
import {v4} from 'uuid';

const MY_TOKEN = 'mytoken';
export async function GET(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get(MY_TOKEN);

    const headers: { [key: string]: string } = {}
    if (!token) {
        headers['Set-Cookie'] = `${MY_TOKEN}=${v4()}; path=/; HttpOnly; SameSite=Strict`;
    }

    return new Response('Hello, Next.js!', {
        status: 200,
        headers
    });
}
