// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(req: NextRequest) {
  // Prepare a response we can mutate cookies on
  const res = NextResponse.next();

  // Bind Supabase to request/response cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Touch session to keep auth cookies fresh
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    const signed = req.cookies.get("signedup")?.value;

    // Redirect if your client-side flag is set…
    if (signed === "yes") {
      const url = req.nextUrl.clone();
      url.pathname = "/Auth/Login";
      return NextResponse.redirect(url);
    }

    // Or, if you want to also redirect when a real session exists:
    // if (user) {
    //   const url = req.nextUrl.clone();
    //   url.pathname = "/Auth/Login";
    //   return NextResponse.redirect(url);
    // }
  }

  // Continue with the (possibly updated) response
  return res;
}

// Limit this middleware to the welcome screen
export const config = {
  matcher: ["/"],
};
