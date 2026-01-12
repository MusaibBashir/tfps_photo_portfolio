"use client"

import { useEffect, useState } from "react"

export default function DiagnosticPage() {
    const [clientEnv, setClientEnv] = useState<any>(null)

    useEffect(() => {
        // Check what's actually available in the browser
        setClientEnv({
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            cloudinary: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
            allKeys: Object.keys(process.env).filter(k => k.startsWith('NEXT_PUBLIC_'))
        })
    }, [])

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace', background: '#000', color: '#0f0', minHeight: '100vh' }}>
            <h1>Environment Variables Diagnostic</h1>

            <h2>Client-Side (What the Browser Sees)</h2>
            <pre>{JSON.stringify(clientEnv, null, 2)}</pre>

            <h2>Status</h2>
            {!clientEnv?.url ? (
                <div style={{ color: '#f00', padding: '20px', border: '2px solid #f00', marginTop: '20px' }}>
                    <h3>❌ PROBLEM: Environment variables NOT available in browser</h3>
                    <p>Next.js is not bundling them into the client-side code.</p>
                    <p>Check next.config.mjs and Netlify build logs.</p>
                </div>
            ) : (
                <div style={{ color: '#0f0', padding: '20px', border: '2px solid #0f0', marginTop: '20px' }}>
                    <h3>✅ Environment variables are working!</h3>
                </div>
            )}

            <h2>Expected Values</h2>
            <ul>
                <li>url: "https://cocwcntiarqxnwglwujg.supabase.co"</li>
                <li>anonKey: "sb_publishable_w-cGsr-d1QB-CZdIR5lcBA_Le3UG17y"</li>
                <li>cloudinary: "de29hvv4d"</li>
                <li>password: [your password]</li>
            </ul>
        </div>
    )
}
