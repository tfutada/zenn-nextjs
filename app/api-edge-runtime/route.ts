import {NextResponse} from 'next/server';

export const dynamic = 'auto'
export const dynamicParams = true
export const revalidate = 60
export const fetchCache = 'auto'
export const runtime = 'edge'
export const preferredRegion = 'auto'

export async function GET(request: Request) {
    const {searchParams} = new URL(request.url)
    const id = searchParams.get('id')
    console.log(id);

    const cart = {
        items: [1, 2, 3]
    }

    return NextResponse.json(cart);
}
