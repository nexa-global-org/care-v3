import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database.types'

/**
 * Supabase client for Server Components, Server Actions, and Route
 * Handlers — anywhere server-side logic runs.
 *
 * Must be called fresh on every request (never as a module-level
 * singleton), because it needs the current request's cookies to
 * know which user is making the call.
 *
 * Usage:
 *   const supabase = await createClient()
 *   const { data } = await supabase.from('pets').select('*')
 */
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // setAll was called from a Server Component, which can't
            // write cookies directly. This is safe to ignore ONLY
            // because the middleware (see src/middleware.ts) is also
            // refreshing the session on every request.
          }
        },
      },
    }
  )
}