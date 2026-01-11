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
    name: "Mohit Kumar Majhi",
    specialty: "Smurf",
    bio: "Dadaji and Inter IIT Photography Captain",
    image: "/landscape-photographer.jpg",
  },
  {
    id: 2,
    name: "Rahul Ranwa",
    specialty: "Smurf",
    bio: "Papaji and Inter IIT Filmmaking Captain",
    image: "/fashion-photographer.jpg",
  },
  {
    id: 3,
    name: "Abhinav Bhardwaj",
    specialty: "Oompa Loompa",
    bio: "Kya matlab abhi maine socha nahi",
    image: "/street-photographer.jpg",
  },
  {
    id: 4,
    name: "Pawan Manignandan",
    specialty: "Oompa Loompa",
    bio: "V-Log is better then S-Log",
    image: "/wedding-photographer.jpg",
  },
  {
    id: 5,
    name: "Musaib Bin Bashir",
    specialty: "Oompa Loompa",
    bio: "Bohat time lag gaye ye banane mai",
    image: "/wildlife-photographer.jpg",
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
