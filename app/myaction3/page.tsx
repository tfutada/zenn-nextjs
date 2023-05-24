'use client';

import {useTransition} from "react";
import {addItem} from "@/app/myaction3/_myactions";

export default function ActionForm() {
    let [isPending, startTransition] = useTransition();

    const param1 = '123'
    const param2 = 123

    const handler = () => {
        addItem(param1)
    }

    return (
        <>
            <button onClick={() => startTransition(handler)}>
                Add To Cart
            </button>
        </>
    )
}
