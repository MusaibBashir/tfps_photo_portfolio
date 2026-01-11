"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PhotoLightbox from "@/components/PhotoLightbox"
import { photographersData } from "@/app/config/photographers-data"

interface PhotographerPageProps {
  params: { id: string }
}

export default function PhotographerPage({ params }: PhotographerPageProps) {
  const id = params.id
  const photographer = photographersData.find((p) => p.id === Number.parseInt(id))

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  if (!photographer) {
    return (
      <main className="bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Photographer not found</h1>
          <Link href="/photographers" className="text-white/60 hover:text-white transition-colors">
            Back to Photographers
          </Link>
        </div>
      </main>
    )
  }

  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const navigateToPhoto = (index: number) => {
    setCurrentPhotoIndex(index)
  }

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{photographer.name}</h1>
          <Link
            href="/photographers"
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      {/* Hero Section with Photo and Bio */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16 border-b border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="aspect-square overflow-hidden">
            <img
              src={photographer.image || "/placeholder.svg"}
              alt={photographer.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bio Section */}
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-white/60 mb-2">{photographer.specialty}</p>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed">{photographer.bio}</p>
            </div>

            <blockquote className="border-l-2 border-white/30 pl-6 py-4">
              <p className="text-base md:text-lg italic text-white/70">"{photographer.quote}"</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Masonry Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <h2 className="text-xl uppercase tracking-widest mb-12 text-white/80">Portfolio</h2>

        {photographer.works.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No photos available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {photographer.works.map((work, index) => (
              <div
                key={work.id}
                onClick={() => openLightbox(index)}
                className="break-inside-avoid group relative overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
              >
                <div className="overflow-hidden">
                  <img
                    src={work.src || "/placeholder.svg"}
                    alt={work.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-base font-bold tracking-tight">{work.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <PhotoLightbox
          photos={photographer.works}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onNavigate={navigateToPhoto}
        />
      )}
    </main>
  )
}
