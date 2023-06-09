import {getServerSession} from "next-auth/next";
import {options} from "@/app/options";

export default function ActionForm() {
    // Server Actions. These are executed on the server.
    async function addItem(formData: FormData) {
        'use server'; // This is required for server actions.

        const session = await getServerSession(options)
        const user = session?.user

        console.log('user:', user)
    }

    return (
        <div>
            <form action={addItem}>
                <input type="text" name="id" defaultValue="A001" className="bg-gray-500"/>
                <button type="submit">カートに追加</button>
            </form>
        </div>
    )
}
