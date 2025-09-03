"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui components
import { Form,FormField,FormItem,FormLabel,FormControl,FormMessage,FormDescription,} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle,} from "@/components/ui/card";
import { toast } from "sonner";
import { Key, Mail, RotateCcwKey } from "lucide-react";



// --- Schema ---
const signupSchema = z.object({
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email address" }),

    username: z
      .string()
      .nonempty({ message: "Username is required" })
      .min(2, { message: "Username must be longer than 2 characters" })
      .max(15, { message: "Username must be at most 15 characters" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),

    confirmPassword: z.string(),
  })
  .refine((val) => val.confirmPassword === val.password, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
//Confirm password Validation
  });

// --- Types ---
type SignupValues = z.infer<typeof signupSchema>;


// --- Component ---
const SignupForm = () => {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

    function onSubmit(data: z.infer<typeof form>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Card className="bg-auth-card text-white flex flex-col border border-slate-200/20 items-center w-sm md:w-[520px] md:h-[500px] h-[460px]">
      <CardHeader className="w-full text-center gap-2">
        <CardTitle className="font-[500] text-2xl font-poppins">
          Signup for your account
        </CardTitle>
        <CardDescription>Enter your information below to sign up</CardDescription>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col items-center justify-center p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full px-6 md:px-3 space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-ubuntu ml-3 flex items-center">Email<Mail size={14}/></FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-ubuntu ml-3 flex items-center">Password<Key size={14}/></FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-ubuntu ml-3 flex items-center">Confirm Password<RotateCcwKey size={14} /></FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Create account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
