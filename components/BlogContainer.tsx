import Image from "next/image";
import BlogMiniBox from "./ui/BlogMiniBox";
import { User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BlogT {
    updatedAt: Date;
    title: string;
    description: string;
    author: string;
}

const BlogContainer = ({ title, updatedAt, description, author }: BlogT) => {
    //   const router = useRouter();

    return (
        <main className="w-full flex flex-wrap justify-between items-center p-4 border-b pb-5 border-gray-300">
            {/* left side */}
            <section className="flex-1 pr-5 flex w-full h-full flex-col justify-between space-y-3">
                <h2 className="flex items-center text-gray-500">
                    <User2 className="mr-1 bg-gray-500 text-white rounded-full p-1" />
                    {author}
                </h2>
                <div>
                    <Link href="blogs/a" className="font-bold text-xl sm:text-[1.2rem]">{title}</Link>
                    <p>{description}</p>
                </div>

                {/* mini blog overview features */}
                <BlogMiniBox updatedAt={updatedAt} />
            </section>
            {/* right side(blog image) */}
            <section className="my-auto hover:cursor">
                <Image
                    src="/assets/blogImage.jpeg"
                    className="rounded-md object-cover min-h-[150px]"
                    alt="blog image"
                    width={240}
                    height={160}
                />
            </section>
        </main>
    );
};

export default BlogContainer;
