import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { Database } from '@/types/database.types'

/**
 * Refreshes the Supabase auth session on every request and protects
 * the shelter management panel ("/panel") from unauthenticated access.
 *
 * This function does NOT run automatically — it must be called from
 * the actual Next.js middleware entry point at src/middleware.ts
 * (NOT nested inside utils/, or Next.js will never invoke it).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: use getUser(), never getSession(), for route protection.
  // getUser() validates the token against Supabase's auth server.
  // getSession() only reads the cookie without verifying it — it can
  // be spoofed and must never be trusted for access control.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect the shelter management panel.
  // TODO: once locale routing ([locale]/panel) is added, update this
  // check to strip the locale prefix before comparing the path.
  const isPanelRoute = request.nextUrl.pathname.includes('/panel')

  if (isPanelRoute && !user) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // IMPORTANT: always return supabaseResponse as-is (or a new response
  // built from it). Creating a fresh NextResponse here without copying
  // its cookies would silently break session refresh.
  return supabaseResponse
}