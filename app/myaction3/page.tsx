'use client';

import {useTransition} from "react";
import {addItem} from "@/app/myaction3/_myactions";

export default function ActionForm() {
    // let [isPending, startTransition] = useTransition();

    const param1 = '123'

    const handler = async () => {
        await addItem(param1)
    }

    return (
        <>
            <button onClick={handler}>
                Add To Cart
            </button>
        </>
    )
}
