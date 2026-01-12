export default function DiagnosticPage() {
    // Server-side check
    const serverEnv = {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
        cloudinary: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        hasPassword: !!process.env.NEXT_PUBLIC_ADMIN_PASSWORD,
    }

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace', background: '#000', color: '#0f0', minHeight: '100vh' }}>
            <h1>Environment Variables Diagnostic</h1>
            <h2>Server-Side (Build Time)</h2>
            <pre>{JSON.stringify(serverEnv, null, 2)}</pre>

            <h2>Client-Side (Runtime)</h2>
            <pre>{JSON.stringify({
                url: typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : 'N/A',
                hasAnonKey: typeof window !== 'undefined' ? !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : 'N/A',
            }, null, 2)}</pre>

            <h2>Instructions</h2>
            <p>If all values show as undefined or false:</p>
            <ol>
                <li>Environment variables are NOT set in Netlify</li>
                <li>Or they have typos in the names</li>
                <li>Or they're not scoped for "Builds"</li>
            </ol>
            <p>Expected values:</p>
            <ul>
                <li>url: should show "https://cocwcntiarqxnwglwujg.supabase.co"</li>
                <li>hasAnonKey: should be true</li>
                <li>hasServiceKey: should be true</li>
                <li>cloudinary: should show "de29hvv4d"</li>
                <li>hasPassword: should be true</li>
            </ul>
        </div>
    )
}
