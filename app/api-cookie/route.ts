import {cookies} from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    const headers: { [key: string]: string } = {}
    if (!token) {
        headers['Set-Cookie'] = uuidv4();
    }

    return new Response('Hello, Next.js!', {
        status: 200,
        headers
    });
}
