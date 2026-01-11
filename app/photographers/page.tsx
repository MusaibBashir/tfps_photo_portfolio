"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Photographer {
  id: number
  name: string
  specialty: string
  bio: string
  image: string
}

const photographers: Photographer[] = [
  {
    id: 1,
    name: "Alex Chen",
    specialty: "Landscape & Nature",
    bio: "Capturing raw beauty of untouched landscapes and natural moments across the globe.",
    image: "/landscape-photographer.jpg",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    specialty: "Portrait & Fashion",
    bio: "Specializing in intimate portraits that reveal the story behind every face and emotion.",
    image: "/fashion-photographer.jpg",
  },
  {
    id: 3,
    name: "James Wilson",
    specialty: "Street Photography",
    bio: "Documenting candid moments of urban life and human connection in the city.",
    image: "/street-photographer.jpg",
  },
  {
    id: 4,
    name: "Sophie Laurent",
    specialty: "Wedding & Events",
    bio: "Creating timeless memories by capturing the most important moments of your life.",
    image: "/wedding-photographer.jpg",
  },
  {
    id: 5,
    name: "Raj Patel",
    specialty: "Wildlife & Nature",
    bio: "On a mission to capture the untamed beauty of wildlife in their natural habitats.",
    image: "/wildlife-photographer.jpg",
  },
  {
    id: 6,
    name: "Luna Martinez",
    specialty: "Fine Art & Conceptual",
    bio: "Exploring the boundaries of reality through experimental and fine art photography.",
    image: "/fine-art-photographer.jpg",
  },
]

export default function PhotographersPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Photographers</h1>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      {/* Photographers Grid */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16">
        <div className="space-y-6">
          {photographers.map((photographer) => (
            <Link
              key={photographer.id}
              href={`/photographer/${photographer.id}`}
              className="group block border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden bg-white/5 hover:bg-white/10"
            >
              <div className="flex flex-col md:flex-row">
                {/* Image */}
                <div className="w-full md:w-48 h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={photographer.image || "/placeholder.svg"}
                    alt={photographer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-gray-300 transition-colors">
                    {photographer.name}
                  </h3>
                  <p className="text-sm uppercase tracking-widest text-white/60 mb-4">{photographer.specialty}</p>
                  <p className="text-sm md:text-base text-white/70 leading-relaxed">{photographer.bio}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
