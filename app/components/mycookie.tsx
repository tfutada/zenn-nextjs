'use client';

import {useEffect} from "react";
import {useRouter} from 'next/navigation';


export default function SessionCookie() {
    const router = useRouter()

    useEffect(
        () => {
            fetch('/api-cookie')
                .then((res) => res.text())
                .then((data) => {
                        console.log('data', data)
                        router.push("/")
                    }
                )
        }, []
    )

    return (
        <div>
            loading...
        </div>
    )
}
