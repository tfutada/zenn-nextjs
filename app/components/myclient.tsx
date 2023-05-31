'use client';

function MyClient() {
    const val = window.screenY
    console.log(val)

    return (
        <div>
            window screenY = {val}
        </div>
    )
}

export default MyClient
