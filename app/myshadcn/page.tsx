import {Button} from "@/components/ui/button"
import {EnvelopeOpenIcon} from "@radix-ui/react-icons";


export default async function Page() {
    return (
        <div>
            <Button>
                <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Login with Email
            </Button>
        </div>
    )
}
