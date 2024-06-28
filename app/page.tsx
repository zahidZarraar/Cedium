import ListBlogs from "@/components/ListBlogs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="py-5 flex min-h-screen flex-col items-center justify-between">
      {/* Blogs */}
      <Suspense fallback={<>Loading....</>}>
        <MaxWidthWrapper>
          <ListBlogs />
        </MaxWidthWrapper>
      </Suspense>
    </main>
  );
}
