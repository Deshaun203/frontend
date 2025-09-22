"use client";

import React, { useState } from "react";
import HeaderComponent from "@/components/ui/header";
import { motion } from "framer-motion";
import { Key, Loader, Mail, Eye, EyeOff } from "lucide-react";
import { Checkbox, type CheckboxProps } from "antd";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase/supabaseClient";

// --- Validation schema ---
const LoginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type LoginValues = z.infer<typeof LoginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
    watch,
    setError, // <-- use RHF's setError for field-level errors
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" },
  });

  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true); // UI only by default; see note below.
  const formId = "LoginForm";

  const onChange: CheckboxProps["onChange"] = (e) => {
    setRemember(e.target.checked);
  };

  // --- Login submit handler ---
  const onSubmit = async (values: LoginValues) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        // Common cases: wrong creds, email not confirmed, rate limit, etc.
        if (/confirm(ed)?/i.test(error.message)) {
          // Optionally re-send confirmation if the account isn't confirmed yet
          await supabase.auth.resend({
            type: "signup",
            email: values.email,
            options: { emailRedirectTo: `${baseUrl}/Auth/Login` },
          });
          toast.info(
            `Your email isn't confirmed. We sent a new confirmation link to ${values.email}.`
          );
          return;
        }

        if (/invalid login credentials|email/i.test(error.message)) {
          setError("email", { message: "Invalid email or password." });
          setError("password", { message: "Invalid email or password." });
          toast.error("Invalid email or password.");
          return;
        }

        toast.error(error.message || "Login failed. Please try again.");
        return;
      }

      // Success
      toast.success("Welcome back!");
      router.replace("/Dashboard");
    } catch (e: unknown) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  // Optional: Forgot password flow (keeps your layout intact)
  const onForgotPassword = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const email = watch("email");
    if (!email) {
      toast.error("Enter your email first, then click Forgot Password.");
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${baseUrl}/Auth/Reset`,
    });
    if (error) {
      toast.error(error.message || "Could not send reset email.");
      return;
    }
    toast.success(`Password reset email sent to ${email}.`);
  };

  // Button disabled if invalid or submitting or any field empty
  const allFilled = !!watch("email") && !!watch("password");

  const ring = (err?: unknown) =>
    err
      ? "border-red-500 focus-visible:ring-red-500"
      : "border-gray-700 focus-visible:ring-blue-500";

  return (
    <div className="flex flex-col items-center w-full inset-0 min-h-[100svh] h-screen overflow-hidden bg-[#0d1425f6]">
      {/* Header Logo */}
      <div>
        <HeaderComponent />
      </div>

      {/* Login Card Container */}
      <motion.div
        key="cardLogin"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full flex justify-center items-center"
      >
        {/* Card Component */}
        <div className="h-[390px] w-[370px] md:h-[400px] md:w-[430px] rounded-xl border border-white/30 
                        bg-gradient-to-bl from-[#fceff0d5] to-[#e7faf6d3] 
                        backdrop-blur-lg backdrop-saturate-200 backdrop-contrast-100
                        shadow-lg flex flex-col justify-center p-5">
          {/* Form Header */}
          <h1 className="text-xl font-outfit md:text-2xl text-slate-900 text-center">
            Login to your account
          </h1>
          <h3 className="text-xs font-outfit text-center md:text-sm text-gray-500">
            Welcome to Daemon S.
          </h3>

          {/* Form Body */}
          <div className="w-full h-full items-center justify-center flex px-2 mt-1">
            <form
              id={formId}
              autoComplete="on"
              onSubmit={handleSubmit(onSubmit)}
              className="w-full h-full pt-9 flex flex-col"
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
                className={`w-full mb-4 p-3 font-inter rounded-md border bg-slate-200 h-9 md:h-10 focus:outline-none ${ring(
                  errors.email
                )}`}
              />
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
                  autoComplete="current-password"
                  autoCapitalize="none"
                  placeholder="**********"
                  aria-invalid={!!errors.password}
                  aria-describedby="password-error"
                  className={`w-full p-3 pr-10 font-inter rounded-md border bg-slate-200 h-9 md:h-10 focus:outline-none ${ring(
                    errors.password
                  )}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute inset-y-0 right-3 my-auto h-fit flex items-center"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <p id="password-error" className="sr-only">
                {errors.password?.message}
              </p>

              <div className="w-full flex justify-between px-2 items-center mb-2">
                <div>
                  <Checkbox
                    style={{ fontFamily: "var(--font-outfit)" }}
                    onChange={onChange}
                    checked={remember}
                  >
                    Remember Me
                  </Checkbox>
                </div>
                <a
                  href="#"
                  onClick={onForgotPassword}
                  className="font-outfit font-light text-sm underline hover:text-gray-700 transition-colors duration-200"
                >
                  Forgot Password?
                </a>
              </div>
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
            Don&apos;t have an account?{" "}
            <Link
              href="/Auth/Signup"
              className="underline text-violet-500 hover:text-violet-400 cursor-pointer transition-colors"
            >
              Register
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

export default LoginPage;
