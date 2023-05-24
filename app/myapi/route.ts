import {kv} from '@vercel/kv';
import {NextResponse} from 'next/server';

export async function GET() {
    const user = await kv.hgetall('shopping_cart:123');
    return NextResponse.json(user);
}
