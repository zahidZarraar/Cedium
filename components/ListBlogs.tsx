import { Blog } from "@prisma/client";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/blogs", {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  console.log("res : ", res);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const ListBlogs = async () => {
  const data = await getData();

  console.log("dtga : ", data);

  return (
    <main>
      <h1 className='pb-10 text-3xl font-semibold '>Blogs</h1>
      <ul>
        {data?.length > 0 &&
          data.map((blog: Blog) => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </main>
  );
};

export default ListBlogs;
