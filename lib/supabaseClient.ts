import { createClient } from '@supabase/supabase-js'

// Debug: Log environment variables
console.log('Environment check:')
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
console.log('SUPABASE_SERVICE_ROLE_KEY exists:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cocwcntiarqxnwglwujg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_w-cGsr-d1QB-CZdIR5lcBA_Le3UG17y'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL not found in environment, using fallback')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role key for admin operations
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_21GjcB1A8pvYYSR4TinUew_vOPvUmpG'
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})
