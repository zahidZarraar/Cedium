import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // console.log('token : ', token);

  // if (!token) {
  //   return NextResponse.redirect(new URL("/api", req.url));
  // }

  return NextResponse.next();
}

// export const config = {
//   matcher: ["/api/blogs/:path*"]
// };
