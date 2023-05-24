import {kv} from "@vercel/kv";
import {revalidatePath} from "next/cache";

interface Cart {
    id: string;
    quantity: number;
}

const KEY = 'cart:456'

export default async function ActionForm() {
    let cart = await kv.get<Cart[]>(KEY);

    // Server Actions. These are executed on the server.
    async function addItem(formData: FormData): Promise<void> {
        'use server'; // This is required for server actions.
        const id = formData.get('id') as string;
        const vals: Cart[] = [...(cart ?? []), {id, quantity: 1}]
        await kv.set(KEY, vals);
        revalidatePath('/myaction2')
    }

    return (
        <>
            <div>
                {cart?.map((item: Cart) => (
                    <div key={item.id}>
                        {item.id} : {item.quantity}
                    </div>
                ))}
            </div>
            <form action={addItem}>
                <input type="text" name="id" defaultValue="A001" className="bg-gray-500"/>
                <button type="submit">カートに追加２</button>
            </form>
        </>
    )
}
