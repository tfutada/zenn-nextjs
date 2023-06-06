import dynamic from 'next/dynamic';
import {cookies} from 'next/headers';
import {kv} from "@vercel/kv";
import {Cart, MY_TOKEN} from "@/app/myconst";

const SessionCookie = dynamic(() => import('@/app/components/mycookie'), {ssr: false});


export default async function MySession() {
    const cookieStore = cookies();
    const token = cookieStore.get(MY_TOKEN);

    let items: Cart[] = [];

    if (token?.value) {
        items = await kv.get<Cart[]>(token.value) ?? [];
    }

    return (
        <div>
            {!token && <SessionCookie/>}
            <div>
                {items.map((item) => (
                    <div key={item.id}>
                        アイテムID {item.id} : {item.quantity}個
                    </div>
                ))}
            </div>
        </div>
    )
}
