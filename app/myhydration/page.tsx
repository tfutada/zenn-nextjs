
import dynamic from 'next/dynamic';

const MyClient = dynamic(() => import('@/app/components/myclient'), { ssr: false });


export default function ActionForm() {

    return (
        <div>
            <MyClient/>
        </div>
    )
}
