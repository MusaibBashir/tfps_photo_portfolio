import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseClient'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { photographer_id, title, src, aspect } = body

        if (!photographer_id || !title || !src || !aspect) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 })
        }

        const { data, error } = await supabaseAdmin
            .from('works')
            .insert([{ photographer_id, title, src, aspect }])
            .select()

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ data }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
