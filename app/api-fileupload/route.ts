import {NextRequest} from "next/server";
import {writeFile} from 'fs/promises'

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};

// We don't need formidable anymore in App Router.
// https://ethanmick.com/how-to-upload-a-file-in-next-js-13-app-directory/
// https://codersteps.com/articles/building-a-file-uploader-from-scratch-with-next-js-app-directory
export async function POST(request: NextRequest) {

    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    if (!file) {
        return new Response("File blob is required.", {
                status: 400
            }
        );
    }

    console.log(file.size);

    const buffer = Buffer.from(await file.arrayBuffer());
    // const path = `/tmp/${file.name}`
    // await writeFile(path, buffer)
    // console.log(`open ${path} to see the uploaded file`)

    return new Response('Done!', {
        status: 200
    });
}