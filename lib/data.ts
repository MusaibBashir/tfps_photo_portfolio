import { supabase } from './supabaseClient'

export interface Photographer {
    id: number
    name: string
    specialty: string
    bio: string
    quote: string
    profile_image_url: string
    created_at?: string
}

export interface Work {
    id: number
    photographer_id: number
    title: string
    src: string
    aspect: "landscape" | "portrait" | "square"
    created_at?: string
}

export interface PhotographerWithWorks extends Photographer {
    works: Work[]
}

export interface FeaturedPhoto {
    id: number
    title: string
    category: string
    photographer_name: string
    src: string
    aspect: string
    display_order: number
    created_at?: string
}

export interface GalleryImage {
    id: number
    src: string
    alt: string
    display_order: number
}

// Fetch all photographers
export async function getPhotographers(): Promise<Photographer[]> {
    const { data, error } = await supabase
        .from('photographers')
        .select('*')
        .order('id', { ascending: true })

    if (error) {
        console.error('Error fetching photographers:', error)
        return []
    }

    return data || []
}

// Fetch single photographer with their works
export async function getPhotographerById(id: number): Promise<PhotographerWithWorks | null> {
    const { data: photographer, error: photographerError } = await supabase
        .from('photographers')
        .select('*')
        .eq('id', id)
        .single()

    if (photographerError) {
        console.error('Error fetching photographer:', photographerError)
        return null
    }

    const { data: works, error: worksError } = await supabase
        .from('works')
        .select('*')
        .eq('photographer_id', id)
        .order('created_at', { ascending: false })

    if (worksError) {
        console.error('Error fetching works:', worksError)
        return { ...photographer, works: [] }
    }

    return {
        ...photographer,
        works: works || []
    }
}

// Fetch featured photos
export async function getFeaturedPhotos(): Promise<FeaturedPhoto[]> {
    const { data, error } = await supabase
        .from('featured_photos')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching featured photos:', error)
        return []
    }

    return data || []
}

// Fetch gallery images for homepage
export async function getGalleryImages(): Promise<GalleryImage[]> {
    const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true })

    if (error) {
        console.error('Error fetching gallery images:', error)
        return []
    }

    return data || []
}
