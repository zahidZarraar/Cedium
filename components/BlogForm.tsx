"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form";
import { uploadFile } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// Zod Validation
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 4 characters."
  }),
  // description: z.string().min(10, {
  //   message: "Description must be of atleast 5 words."
  // })
  // blogImage: z.any().refine((files) => files?.length == 1, "File is required.")
});

export function BlogForm() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [description, setDescription] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      // description: ""
    }
  });

  const router = useRouter();

  const [file, setFile] = useState("");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const name = values.title?.slice(0, 5);

    await uploadFile(file, name)
      .then(async (res) => {
        const imageHash = res;

        await fetch(`${process.env.NEXT_PUBLIC_APPURL}/api/blogs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: values.title,
            description: description,
            blogImage: imageHash
          })
        })
          .then(async (res) => {
            const response = await res.json();

            if (!res.ok) {
              toast.error("Failed to create blog");
              throw new Error(response.message);
            }
            toast.success("Blog Created Succesfully !");
            await new Promise((r) => setTimeout(r, 2000));
            router.push("/");
            console.log("res : ", response);
            return response;
          })
          .catch((err) => {
            toast.error(err.message);
            throw new Error(err);
          });
      })
      .catch((err) => {
        console.log("err : ", err);
      });
  }

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  //Custom Tool Bar
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "color", "image"],
      [{ "code-block": true }],
      ["clean"]
    ]
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "indent",
    "image",
    "code-block",
    "color"
  ];

  return (
    <Form {...form}>
      <Toaster richColors />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pb-6 pt-16">
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Basic Title"
                  {...field}
                  className="!border-none mb-4 !outline-0  leading-none caret-black placeholder:text-3xl max-sm:text-2xl text-3xl  font-bold placeholder:font-bold"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="sm:col-span-2">
          {/* <label
            htmlFor="content"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Blog Content
          </label> */}
          <ReactQuill
            placeholder="Write Your Thoughts here..."
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={modules}
            formats={formats}
          />
        </div>
        {/* <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write Your Blog Here..."
                  {...field}
                  className="!border-non h-[400px] 
                  block border-none focus-visible:ring-transparent outline-ring-0 text-xl max-sm:text-[1rem] 
                  leading-none caret-black placeholder:text-xl
                  "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <div className="flex pt-10 flex-col space-y-3">
          <Label className="text-gray-600">Select Banner Image</Label>
          <input
            type="file"
            id="file"
            name="blogImage"
            onChange={handleChange}
          />
        </div>

        <Button
          type="submit"
          className="!mt-10 float-right bg-green-700 rounded-full !py-1 text-white px-10"
          disabled={loading && true}
        >
          {loading && <Loader2 className="animate-spin h-4 mr-2 w-4" />}
          Submit
        </Button>
      </form>
    </Form>
  );
}
