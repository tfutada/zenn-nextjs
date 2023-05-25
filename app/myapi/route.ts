import {kv} from '@vercel/kv';
import {NextResponse} from 'next/server';

export async function GET() {

    await kv.set(`cart:123`, "abc");

    const cart = await kv.get('cart:123');
    return NextResponse.json(cart);
}
