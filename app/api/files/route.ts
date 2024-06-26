import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

// export const config = {
//     api: {
//         bodyParser: false
//     }
// };

export async function POST(req: Request) {
    console.log("form data : " + req.json());

    return Response.json({ data: "hiii" })
    // try {
    //     const data = await request.json();
    //     // const file: File | null = data.get("file") as unknown as File;
    //     // data.append("file", file);
    //     // data.append("pinataMetadata", JSON.stringify({ name: "File to upload" }));

    //     const res = await axios.post(
    //         "https://api.pinata.cloud/pinning/pinFileToIPFS",
    //         data,
    //         {
    //             headers: { "Content-Type": "multipart/form-data" },
    //             transformRequest: (formData) => formData
    //         }
    //     );

    //     // console.log("res : " + res);

    //     const { IpfsHash } = res.data;
    //     // console.log(IpfsHash);

    //     return NextResponse.json({ IpfsHash }, { status: 200 });
    // } catch (e) {
    //     console.log(e);
    //     return NextResponse.json(
    //         { error: "Internal Server Error" },
    //         { status: 500 }
    //     );
    // }
}
