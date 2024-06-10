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

// Zod Validation
const formSchema = z.object({
  //   username: z.string().min(4, {
  //     message: "Username must be at least 4 characters."
  //   }),
  //     password: z.string().min(4, {
  //         message: "Password must be at least 8 characters."
  //     }),
  //     email:
});

export function BlogForm() {
  //   const form = useForm<z.infer<typeof formSchema>>({
  //     resolver: zodResolver(formSchema),
  //     defaultValues: {
  //       username: ""
  //     }
  //   }); TODO : zod validation

  const form = useForm();
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await fetch(`http://localhost:3000/api/blogs`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    })
      .then(async (res) => {
        if (!res.ok) {
          toast.error('Failed to create blog')
          throw new Error("Failed to create blog");
        }
        toast.success("Blog Created Succesfully !");
        await new Promise((r) => setTimeout(r, 5000));
        router.push("/");
        return res.json();
      })
      .catch((err) => {
        toast.error('Something Went Wrong !');
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
                  className="!border-none !outline-0 placeholder:text-2xl placeholder:text-bold"
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
                <Input
                  type="text"
                  placeholder="Write Your Blog Here..."
                  {...field}
                  className="!border-none !outline-0 "
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="!mt-10 float-right bg-green-700 rounded-full !py-1 text-white px-10"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
