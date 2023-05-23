import {kv} from '@vercel/kv';
import {NextResponse} from 'next/server';

export async function GET() {
    const user = await kv.hgetall('shopping_cart:111');
    return NextResponse.json(user);
}
