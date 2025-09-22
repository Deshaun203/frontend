"use client";

import React, { useState } from "react";
import HeaderComponent from "@/components/ui/header";
import { motion } from "framer-motion";
import { Key, Loader, Mail, RotateCcwKey, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";


// zod + react-hook-form
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/supabaseClient";

// --- Validation schema ---
const SignupSchema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupValues = z.infer<typeof SignupSchema>;

const SignupPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors, },
    watch,
  } = useForm<SignupValues>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  // show/hide toggles
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const formId = "signupForm";

    // --- Form submit handler ---

 const onSubmit = async (values: SignupValues) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const emailRedirectTo = `${baseUrl}/Auth/Login`;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: { emailRedirectTo },
    });

    if (error) {
      // Confirmed duplicate or other signup error
      const isAlreadyRegistered =
        (error).status === 400 ||
        (error).status === 422 ||
        /registered|exists/i.test(error.message);

      if (isAlreadyRegistered) {
        setError?.("email", { message: "An account with this email already exists." });
        toast.error("An account with this email already exists. Try Login or Reset Password.");
        return;
      }

      toast.error(error.message || "Sign up failed. Please try again.");
      return;
    }

    // Success path (brand new OR unconfirmed user re-signup → email re-sent)
    toast.success(`Confirmation email has been sent to ${values.email}.`);
    setTimeout(() => router.push("/Auth/Login"), 7000);
  } catch (e: unknown) {
    if (e instanceof Error) {
      toast.error(e.message);
    } else {
      toast.error("Something went wrong.");
    }
  }
};


  // button disabled if invalid or submitting or any field empty
  const allFilled =
    !!watch("email") && !!watch("password") && !!watch("confirmPassword");

    const ring = (err?: unknown) =>
  err ? "border-red-500 focus-visible:ring-red-500" : "border-gray-700 focus-visible:ring-blue-500";


  return (
    <div className="flex flex-col items-center w-full h-screen overflow-hidden bg-[#0d1425f6]">
      {/* Header Logo */}
      <div>
        <HeaderComponent />
      </div>

      {/* Signup Card Container */}
      <motion.div
        key="cardSignup"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full flex justify-center items-center"
      >
        {/* Card Component */}
        <div
          className="h-[400px] w-[370px] md:h-[500px] md:w-[450px] rounded-xl border border-white/30 
                     bg-gradient-to-bl from-[#fceff0d5] to-[#e7faf6d3] 
                     backdrop-blur-lg backdrop-saturate-200 backdrop-contrast-100
                     shadow-lg flex flex-col justify-center p-5"
        >
          {/* Form Header */}
          <h1 className="text-xl font-outfit md:text-2xl text-slate-900 text-center">
            Create Your Account
          </h1>
          <h3 className="text-xs font-outfit text-center md:text-sm text-gray-500">
            Fill out the form to gain access.
          </h3>

          {/* Form Body */}
          <div className="w-full h-full flex items-center px-2 mt-2 justify-center">
            <form
              id={formId}
              autoComplete="on"
              onSubmit={handleSubmit(onSubmit)}
              className="w-full h-full flex flex-col justify-center"
            >
              {/* Email */}
              <label
                htmlFor="email"
                className="mb-2 ml-2 text-xs md:text-sm flex gap-1 items-center font-medium font-ubuntu text-gray-900"
              >
                Email <Mail size={13} aria-hidden="true" />
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                name="email"
                spellCheck={false}
                inputMode="email"
                autoCapitalize="none"
                autoComplete="email"
                placeholder="example@gmail.com"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                 className={`w-full mb-4 p-3 font-inter rounded-md border bg-slate-200 h-9 md:h-10 focus:outline-none ${ring(errors.email)}`}
              />
              {/* a11y-only error text to avoid layout shift */}
              <p id="email-error" className="sr-only">
                {errors.email?.message}
              </p>

              {/* Password */}
              <label
                htmlFor="password"
                className="mb-2 ml-2 text-xs md:text-sm flex gap-1 items-center font-medium font-ubuntu text-gray-900"
              >
                Password <Key size={13} aria-hidden="true" />
              </label>
              <div className="relative mb-4">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  {...register("password")}
                  name="password"
                  autoComplete="new-password"
                  autoCapitalize="none"
                  placeholder="**********"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                   className={`w-full p-3 pr-10 font-inter rounded-md border bg-slate-200 h-9 md:h-10 focus:outline-none ${ring(errors.password)}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p id="password-error" className="sr-only">
                {errors.password?.message}
              </p>

              {/* Confirm Password */}
              <label
                htmlFor="confirmPassword"
                className="mb-2 ml-2 text-xs md:text-sm flex gap-1 items-center font-medium font-ubuntu text-gray-900"
              >
                Confirm Password <RotateCcwKey size={13} aria-hidden="true" />
              </label>
              <div className="relative mb-4">
                <input
                  id="confirmPassword"
                  type={showPw2 ? "text" : "password"}
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  autoComplete="new-password"
                  autoCapitalize="none"
                  placeholder="**********"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby="confirm-error"
                  className={`w-full p-3 pr-10 font-inter rounded-md border bg-slate-200 h-9 md:h-10 focus:outline-none ${ring(errors.confirmPassword)}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw2((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center"
                  aria-label={showPw2 ? "Hide confirm password" : "Show confirm password"}
                >
                  {showPw2 ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p id="confirm-error" className="sr-only">
                {errors.confirmPassword?.message}
              </p>
            </form>
          </div>

          {/* Sign-in Button row (kept outside the form) */}
          <div className="w-full h-12 flex gap-3 justify-center border-t pt-3 border-t-slate-800/20 px-4 font-outfit items-center">
            <Button
              form={formId}
              type="submit"
              disabled={!isValid || !allFilled || isSubmitting}
              className="h-10 w-full rounded-full px-6 cursor-pointer transition-all duration-150 active:scale-95 disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader size={18} className="animate-spin" aria-hidden="true" />
              ) : (
                "Continue"
              )}
            </Button>
          </div>

          <p className="text-gray-600 text-center mt-4 font-outfit mb-2">
            Already have an account?{" "}
            <Link
              href="/Auth/Login"
              className="underline text-violet-500 hover:text-violet-400 cursor-pointer transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-7 text-slate-300 font-poppins text-xs">
        © 2025 Daemon S. All rights reserved. Unauthorized use prohibited.
      </div>
    </div>
  );
};

function setError(field: string, error: { message: string }) {
    toast.error(error.message);
}

export default SignupPage;


