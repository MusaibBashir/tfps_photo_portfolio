import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { title, category, photographer_name, src, aspect, display_order = 0 } = body

        if (!title || !src) {
            return NextResponse.json({ error: 'Title and src are required' }, { status: 400 })
        }

        const { data, error } = await supabaseAdmin
            .from('featured_photos')
            .insert([{ title, category, photographer_name, src, aspect, display_order }])
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ data }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
