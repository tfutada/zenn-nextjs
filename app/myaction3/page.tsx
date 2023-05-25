'use client';

import {addItem} from "@/app/myaction3/_myactions";
import {useTransition} from "react";

export default function ActionForm() {
    let [isPending, startTransition] = useTransition();

    const param1 = '123'

    const handler = async (p: string) => {
        await addItem(p)
    }

    return (
        <>
            <button onClick={() => startTransition(() => handler(param1))}>
                Add To Cart
            </button>
        </>
    )
}
