import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

/**
 * Next.js middleware entry point. Next.js finds this file by
 * convention — it MUST live at src/middleware.ts (sibling to the
 * app/ folder), not nested inside any subfolder like utils/.
 *
 * All the real logic lives in utils/supabase/middleware.ts; this
 * file only wires it up and defines which routes it runs on.
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Run on all routes except static assets and images, to avoid
     * wasting a Supabase call on every CSS/JS/image request.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)',
  ],
}