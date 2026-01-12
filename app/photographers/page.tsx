"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, ArrowUpDown } from "lucide-react"
import { getPhotographers, Photographer } from "@/lib/data"

export default function PhotographersPage() {
  const [photographers, setPhotographers] = useState<Photographer[]>([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">("default")

  useEffect(() => {
    loadPhotographers()
  }, [])

  const loadPhotographers = async () => {
    setLoading(true)
    const data = await getPhotographers()
    setPhotographers(data)
    setLoading(false)
  }

  const sortedPhotographers = [...photographers].sort((a, b) => {
    if (sortOrder === "default") return 0
    if (sortOrder === "asc") return a.name.localeCompare(b.name)
    return b.name.localeCompare(a.name)
  })

  const toggleSort = () => {
    if (sortOrder === "default") setSortOrder("asc")
    else if (sortOrder === "asc") setSortOrder("desc")
    else setSortOrder("default")
  }

  return (
    <main className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Photographers</h1>
          <div className="flex items-center gap-6">
            <button
              onClick={toggleSort}
              className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-white text-white/60 transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
              Sort: {sortOrder === "default" ? "Default" : sortOrder === "asc" ? "A-Z" : "Z-A"}
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
        </div>
      </div>

      {/* Photographers Grid */}
      <section className="max-w-4xl mx-auto px-6 md:px-8 py-16">
        {loading ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">Loading photographers...</p>
          </div>
        ) : photographers.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-white/60 text-lg">No photographers found. Add some in the admin panel!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedPhotographers.map((photographer) => (
              <Link
                key={photographer.id}
                href={`/photographer/${photographer.id}`}
                className="group block border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden bg-white/5 hover:bg-white/10"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="w-full md:w-48 h-48 overflow-hidden flex-shrink-0">
                    <img
                      src={photographer.profile_image_url || "/placeholder.svg"}
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
        )}
      </section>
    </main>
  )
}
