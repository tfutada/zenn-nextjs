'use client';

import {
    LoginButton,
    LogoutButton,
} from "@/app/components/buttons";
import {NextAuthProvider} from "@/app/providers";
import {useSession} from "next-auth/react";
import {useEffect} from "react";

export default async function Home() {
    return (
        <NextAuthProvider>
            <ClientHome/>
        </NextAuthProvider>
    )
}


function ClientHome() {
    const {data: session} = useSession();
    const user = session?.user

    useEffect(() => {
            console.log("session.user", session?.user)
        }
        , [session])

    return (
        <main
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
            }}
        >
            <div>
                <div>{`${JSON.stringify(user)}`}</div>
                {user ? <div>Logged in</div> : <div>Not logged in</div>}
                {user ? <LogoutButton/> : <LoginButton/>}
            </div>
        </main>
    );
}
