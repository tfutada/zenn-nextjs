'use server';


import {revalidatePath} from "next/cache";

export async function addItem(value: string) {
    console.log('addItem', value);
    revalidatePath(`/myaction3`); // server mutation
}