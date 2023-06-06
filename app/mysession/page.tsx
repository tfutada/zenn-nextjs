import dynamic from 'next/dynamic';
import {cookies} from 'next/headers';

const SessionCookie = dynamic(() => import('@/app/components/mycookie'), {ssr: false});
const MY_TOKEN = 'mytoken';


export default function MySession() {
    const cookieStore = cookies();
    const token = cookieStore.get(MY_TOKEN);

    console.log('token', token)

    return (
        <div>
            {!token && <SessionCookie/>}
        </div>
    )
}
