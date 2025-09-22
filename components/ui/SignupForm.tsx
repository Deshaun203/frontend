"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// shadcn/ui components
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Key, Mail, RotateCcwKey} from "lucide-react";

// --- Schema ---
const signupSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
}).refine((val) => val.confirmPassword === val.password, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// --- Types ---
type SignupValues = z.infer<typeof signupSchema>;

// --- Component ---
const SignupForm = () => {
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const values = form.watch();
  const allEmpty =
    !values.email &&
    !values.password &&
    !values.confirmPassword;

  // success toast
  function onSubmit(data: SignupValues) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  // error toast (instead of inline messages)
  function onInvalid(errors: typeof form.formState.errors) {
    // Collect all error messages (flat)
    const msgs = Object.values(errors)
      .map((e) => e?.message)
      .filter(Boolean) as string[];

    // Fallback if nested (unlikely here, but safe)
    if (msgs.length === 0) {
      try {
        const flat = form.formState.errors;
        for (const k in flat) {
          const v = flat[k as keyof typeof flat] as import("react-hook-form").FieldError | undefined;
          if (v?.message) msgs.push(v.message);
        }
      } catch {}
    }

    // Show a single toast with a list (cleaner UX)
    toast.error("Please fix the following:", {
        duration: 30000,
      description: (
        <ul className="list-disc pl-5">
          {msgs.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <Card className="bg-auth-card text-white flex flex-col border border-slate-200/20 items-center w-sm md:w-[520px] md:h-[510px] h-[450px]">
      <CardHeader className="w-full text-center gap-2">
        <CardTitle className="font-[500] text-2xl font-poppins">
          Register your account
        </CardTitle>
        <CardDescription>Enter your information below to sign up</CardDescription>
      </CardHeader>

      <CardContent className="w-full h-full flex flex-col items-center justify-center p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onInvalid)}
            className="w-full h-full px-6 md:px-3 space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-ubuntu ml-3 flex items-center">
                    Email <Mail size={14} />
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      {...field}
                    />
                  </FormControl>
                  {/* hide inline errors (we're using toast) */}
                  <FormMessage className="sr-only" />
                </FormItem>
              )}
            />

            <div className="flex flex-col md:flex-row w-full items-center gap-4 justify-center">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-ubuntu ml-3 flex items-center">
                      Password <Key size={14} />
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage className="sr-only" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="font-ubuntu ml-3 flex items-center">
                      Confirm Password <RotateCcwKey size={14} />
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage className="sr-only" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={allEmpty || form.formState.isSubmitting}
            >
              Create account
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SignupForm;
