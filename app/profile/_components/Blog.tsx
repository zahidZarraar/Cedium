import { deleteBlog } from "@/actions/deleteBlog";
import { useValidateBlog } from "@/hooks/useHooks";
import { formatDate } from "@/lib/utils";
import { type Blog } from "@prisma/client";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const Blog = ({ blog }: any) => {
  const showDelete = useValidateBlog(Number(blog?.id));

  const handler = async () => {
    const res = await deleteBlog(Number(blog?.id));

    if (res) {
      toast.success("Blog Deleted");
    } else {
      toast.error("server side error");
    }
  };

  return (
    <li
      key={blog.id}
      className="flex justify-between p-4 bg-gray-100 rounded-md shadow-sm"
    >
      <div>
        <h3 className="text-xl font-semibold">{blog?.title}</h3>
        <p className="text-gray-700">{blog?.description}</p>
        <p className="text-gray-500">
          Updated at: {blog?.updatedAt && formatDate(blog?.updatedAt)}
        </p>
      </div>

      {showDelete && (
        <button onClick={handler}>
          <Trash2 size={20} className="text-gray-800" />
        </button>
      )}
    </li>
  );
};

export default Blog;
