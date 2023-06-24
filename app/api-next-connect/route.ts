import {getUsers, randomId, saveUsers} from "@/app/api-next-connect/api";
import type {User} from "@/app/api-next-connect/common";
import {validateUser} from "@/app/api-next-connect/common";
import {logRequest} from "@/app/api-next-connect/middleware";
import {createEdgeRouter} from "next-connect";
import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";

const router = createEdgeRouter<NextRequest, { params?: unknown }>();

router.use(logRequest);

router.get((req) => {
    const users = getUsers(req);
    return NextResponse.json({users});
});

router.post(async (req) => {
    const users = getUsers(req);
    const body = await req.json();
    const newUser = {
        id: randomId(),
        ...body,
    } as User;
    validateUser(newUser);
    users.push(newUser);
    const res = NextResponse.json({
        message: "User has been created",
    });
    saveUsers(res, users);
    return res;
});

export async function GET(request: NextRequest, ctx: { params?: unknown }) {
    return router.run(request, ctx);
}

export async function POST(request: NextRequest, ctx: { params?: unknown }) {
    return router.run(request, ctx);
}