import { createClient } from '@supabase/supabase-js'

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Check your configuration.')
}

// Public client - works in browser and server
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client - ONLY for server-side (API routes, server components)
// Don't initialize in browser since SUPABASE_SERVICE_ROLE_KEY is not a NEXT_PUBLIC_ variable
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Only create admin client if service key is available (server-side only)
export const supabaseAdmin = supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : supabase // Fallback to public client in browser (won't be used anyway)
