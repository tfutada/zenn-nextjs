import {kv} from "@vercel/kv";

export default async function ActionForm() {

    const cart = await kv.get<{ id: string; quantity: number }[]>(`cart:456`);

    // Server Actions. These are executed on the server.
    async function addItem(formData: FormData) {
        'use server'; // This is required for server actions.
        console.log(formData.get('id'));
    }

    return (
        <>
            <div>
                {cart?.map((item: any) => (
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
