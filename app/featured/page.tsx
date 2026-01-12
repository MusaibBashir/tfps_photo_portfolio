"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PhotoLightbox from "@/components/PhotoLightbox"
import { getFeaturedPhotos, FeaturedPhoto } from "@/lib/data"

const categories = ["All", "Architecture", "Portrait", "Landscape", "Street", "Wildlife"]

export default function WorkPage() {
  const [workImages, setWorkImages] = useState<FeaturedPhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  useEffect(() => {
    loadFeaturedPhotos()
  }, [])

  const loadFeaturedPhotos = async () => {
    setLoading(true)
    const data = await getFeaturedPhotos()
    setWorkImages(data)
    setLoading(false)
  }

  const filteredWorks =
    selectedCategory === "All" ? workImages : workImages.filter((w) => w.category === selectedCategory)

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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Featured</h1>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-12 border-b border-white/10">
        <div className="flex gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm uppercase tracking-widest px-4 py-2 border transition-all ${selectedCategory === cat
                ? "border-white bg-white text-black"
                : "border-white/30 text-white/60 hover:border-white/60 hover:text-white"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">Loading featured photos...</p>
          </div>
        ) : filteredWorks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No featured photos found. Add some in the admin panel!</p>
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredWorks.map((work, index) => (
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
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-bold tracking-tight">{work.title}</h3>
                  <p className="text-xs text-white/70 uppercase tracking-widest">{work.category}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <PhotoLightbox
          photos={filteredWorks.map(work => ({
            ...work,
            category: work.photographer_name
          }))}
          currentIndex={currentPhotoIndex}
          onClose={closeLightbox}
          onNavigate={navigateToPhoto}
        />
      )}
    </main>
  )
}
