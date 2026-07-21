import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database.types'

/**
 * Supabase client for Client Components (files with 'use client').
 * Runs in the browser — safe to use the public anon key here,
 * since Row Level Security is what actually protects the data,
 * not the secrecy of this key.
 *
 * Usage:
 *   'use client'
 *   const supabase = createClient()
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}