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
import { Input } from "./ui/input";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod Validation
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 4 characters."
  }),
  description: z.string().min(10, {
    message: "Description must be of atleast 5 words."
  })
});

export function BlogForm() {
  const [loading, setLoading] = useState<Boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  console.log("form : ", form);

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`http://localhost:3000/api/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(async (res) => {
        if (!res.ok) {
          toast.error("Failed to create blog");
          throw new Error("Failed to create blog");
        }
        toast.success("Blog Created Succesfully !");
        await new Promise((r) => setTimeout(r, 5000));
        router.push("/");
        return res.json();
      })
      .catch((err) => {
        toast.error("Something Went Wrong !");
        throw new Error(err);
      });

    console.log(values);
  }

  return (
    <Form {...form}>
      <Toaster richColors />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 pt-16">
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
                  className="!border-none !outline-0  leading-none caret-black placeholder:text-3xl max-sm:text-2xl text-3xl  font-bold placeholder:font-bold"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
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
        />
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
