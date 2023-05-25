'use client';

import {addItem1, addItem2} from "@/app/myaction4/_myactions";

export default function ActionForm() {
    const handler = async () => {
        const [ret1, ret2] = await Promise.all([
            addItem1("abc"),
            addItem2("123")
        ]);
        console.log(ret1)
        console.log(ret2)
    }

    return (
        <>
            <button onClick={handler}>
                Add To Cart
            </button>
        </>
    )
}
