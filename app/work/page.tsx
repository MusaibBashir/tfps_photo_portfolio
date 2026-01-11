"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const workImages = [
  { id: 1, title: "Urban Landscape", category: "Architecture", src: "/1.webp", aspect: "landscape" },
  { id: 2, title: "Ethereal Moment", category: "Portrait", src: "/2.webp", aspect: "portrait" },
  { id: 3, title: "Nature's Canvas", category: "Landscape", src: "/3.webp", aspect: "landscape" },
  { id: 4, title: "Street Life", category: "Street", src: "/4.webp", aspect: "square" },
  { id: 5, title: "Golden Hour", category: "Landscape", src: "/5.webp", aspect: "landscape" },
  { id: 6, title: "Human Stories", category: "Portrait", src: "/6.webp", aspect: "portrait" },
  { id: 7, title: "Geometric Harmony", category: "Architecture", src: "/7.webp", aspect: "square" },
  { id: 8, title: "Intimate Moments", category: "Portrait", src: "/8.webp", aspect: "portrait" },
]

const categories = ["All", "Architecture", "Portrait", "Landscape", "Street"]

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredWorks =
    selectedCategory === "All" ? workImages : workImages.filter((w) => w.category === selectedCategory)

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Work</h1>
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
              className={`text-sm uppercase tracking-widest px-4 py-2 border transition-all ${
                selectedCategory === cat
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
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
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
      </section>
    </main>
  )
}
