import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallback checks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Log for debugging (remove after fixing)
if (typeof window !== 'undefined') {
    console.log('Supabase Client Init:', {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey,
        url: supabaseUrl
    })
}

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials:', {
        url: supabaseUrl,
        hasKey: !!supabaseAnonKey
    })
    throw new Error('Missing Supabase environment variables. Check Netlify environment variable configuration.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client with service role key for admin operations
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})
