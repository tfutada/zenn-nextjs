import {kv} from "@vercel/kv";

export default async function Cart({params}: { params: { user: string } }) {

    const obj = [{id: 'item1', quantity: 1}, {id: 'item2', quantity: 3}];
    await kv.set(`cart:${params.user}`, obj);

    const cart = await kv.get<{ id: string; quantity: number }[]>(`cart:${params.user}`);

    return (
        <div>
            {cart?.map((item: any) => (
                <div key={item.id}>
                    {item.id} : {item.quantity}
                </div>
            ))}
        </div>
    );
}
