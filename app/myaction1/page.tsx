export default function ActionForm() {
    // Server Actions. These are executed on the server.
    async function addItem(formData: FormData) {
        'use server'; // This is required for server actions.
        console.log(JSON.stringify(formData));
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
