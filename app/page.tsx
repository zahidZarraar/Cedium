import { useSession } from "next-auth/react";
import Nav from "../components/Nav";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ListBlogs from "@/components/ListBlogs";

export default async function Home() {
  // const { data: session } = useSession();

  // if (session) {
  //   console.log('logged in !');
  // }

  return (
    <main className="py-5 flex min-h-screen flex-col items-center justify-between">
      {/* Blogs */}
      <MaxWidthWrapper>
        <ListBlogs />
      </MaxWidthWrapper>
    </main>
  );
}
