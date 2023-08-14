import {getServerSession} from "next-auth/next";
import {options} from "@/app/options";
import {google, calendar_v3} from 'googleapis'
import Calendar = calendar_v3.Calendar

export const dynamic = "force-dynamic"


export default async function Page() {
    const session = await getServerSession(options)
    const user = session?.user

    console.log('Google2', user)
    const oauth2Client = new google.auth.OAuth2({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: 'http://localhost:3000/google-calendar'
    })
    const accessToken = user?.accessToken
    if (!accessToken) {
        return (
            <div>accessToken is null</div>
        )
    }

    oauth2Client.setCredentials({access_token: accessToken})
    const calendar: Calendar = google.calendar({version: 'v3', auth: oauth2Client})
    const calendarResponse = await calendar.calendarList.list()

    console.log(calendarResponse.data)

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
                <div>render Google events, calendarResponse.data</div>
            </div>
        </main>
    );
}
