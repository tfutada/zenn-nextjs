import {NextRequest, NextResponse} from 'next/server';

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
    const clientIP = request.ip ?? "127.0.0.1";
    console.log(`API: clientIP: ${clientIP}`);

    return NextResponse.json({message: "ok"});
}
