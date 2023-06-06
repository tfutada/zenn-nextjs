import dynamic from 'next/dynamic';

const SessionCookie = dynamic(() => import('@/app/components/mycookie'), {ssr: false});


export default function MySession() {

    return (
        <div>
            <SessionCookie/>
        </div>
    )
}
