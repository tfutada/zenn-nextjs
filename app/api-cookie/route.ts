import {cookies} from 'next/headers';
import {v4} from 'uuid';
import {kv} from "@vercel/kv";
import {Cart, MY_TOKEN} from "@/app/myconst";

export async function GET(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get(MY_TOKEN);
    console.log(request.headers.get('cookie'))

    const headers: { [key: string]: string } = {}
    if (!token) {
        const key = v4();
        headers['Set-Cookie'] = `${MY_TOKEN}=${key}; path=/; HttpOnly; SameSite=Strict`;

        // 手抜きでここでカートにアイテムを仕込みます。
        // 実際はボタンを設置して、サーバアクション等でカートに追加します。
        const vals: Cart[] = [{id: "1", quantity: 3}, {id: "2", quantity: 4}, {id: "3", quantity: 5}]
        await kv.set(key, vals);
    }

    return new Response('Hello, Next.js!', {
        status: 200,
        headers
    });
}
