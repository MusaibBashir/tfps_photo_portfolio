"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const seriesData = [
  {
    id: 1,
    title: "Urban Chronicles",
    description:
      "A visual journey through the pulse of metropolitan life. Exploring the intersection of architecture, people, and light in sprawling cities.",
    imageCount: 12,
    src: "/1.webp",
  },
  {
    id: 2,
    title: "Wilderness Untamed",
    description:
      "Documenting the raw beauty of untouched landscapes. Where humans meet nature in its most pristine form.",
    imageCount: 18,
    src: "/3.webp",
  },
  {
    id: 3,
    title: "Faces & Stories",
    description:
      "Intimate portraits revealing the complexity and beauty of human expression. Every face holds a thousand stories.",
    imageCount: 15,
    src: "/6.webp",
  },
  {
    id: 4,
    title: "Geometric Obsession",
    description:
      "Capturing patterns, symmetry, and structure in the built environment. The poetry of lines and shapes.",
    imageCount: 14,
    src: "/7.webp",
  },
  {
    id: 5,
    title: "Nocturnal Glow",
    description: "Exploring the interplay of artificial light and darkness. A different world emerges after sunset.",
    imageCount: 16,
    src: "/2.webp",
  },
  {
    id: 6,
    title: "Natural Abstracts",
    description:
      "Finding abstract beauty in nature's details. Macro perspectives revealing hidden dimensions of the familiar.",
    imageCount: 20,
    src: "/5.webp",
  },
]

export default function SeriesPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Series</h1>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      {/* Series Grid */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seriesData.map((series) => (
            <div
              key={series.id}
              className="group cursor-pointer overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-video overflow-hidden bg-white/5">
                <img
                  src={series.src || "/placeholder.svg"}
                  alt={series.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-gray-300 transition-colors">
                    {series.title}
                  </h3>
                  <p className="text-xs text-white/50 uppercase tracking-widest">{series.imageCount} Images</p>
                </div>

                <p className="text-white/70 leading-relaxed text-sm">{series.description}</p>

                {/* View Series Button */}
                <button className="mt-6 text-xs uppercase tracking-widest font-medium border border-white/30 px-6 py-2 hover:bg-white hover:text-black transition-all duration-300 group-hover:border-white">
                  View Series
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
