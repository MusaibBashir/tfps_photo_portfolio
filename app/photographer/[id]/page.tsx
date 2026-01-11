"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useParams } from "next/navigation"

interface Photographer {
  id: number
  name: string
  specialty: string
  bio: string
  quote: string
  image: string
  works: Array<{
    id: number
    src: string
    title: string
  }>
}

const photographersData: Photographer[] = [
  {
    id: 1,
    name: "Mohit Kumar Majhi",
    specialty: "Smurf",
    bio: "Dadaji and Inter IIT Photography Captain",
    quote: "The landscape is a canvas where light and shadow tell eternal stories.",
    image: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768140969/mohitdp_cdo6bk.jpg",
    works: [
      { id: 1, src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135375/DSC09647_1_ocd5fb.jpg", title: "Mountain Vista" },
      { id: 2, src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135371/IMG20230423075313_dpjo9x.jpg", title: "Nature's Canvas" },
      { id: 3, src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135371/DSC01680_xa8ah5.jpg", title: "Golden Hour" },
      { id: 4, src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135365/IMG20231119062911-01_d87ajb.jpg", title: "Geometric Harmony" },
      { id: 5, src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135364/IMG_20250710_180738227_BURST000_COVER_2_qopsin.jpg", title: "Ethereal Moment" },
      { id: 6, src: "https://res.cloudinary.com/de29hvv4d/image/upload/v1768135364/IMG_20241229_221210827_bgpf4j.jpg", title: "Street Life" },
    ],
  },
  {
    id: 2,
    name: "Rahul Ranwa",
    specialty: "Smurf",
    bio: "Papaji and Inter IIT Filmmaking Captain",
    quote: "Every face tells a story; I am simply the storyteller.",
    image: "/fashion-photographer.jpg",
    works: [
      { id: 1, src: "/2.webp", title: "Ethereal Moment" },
      { id: 2, src: "/6.webp", title: "Human Stories" },
      { id: 3, src: "/1.webp", title: "Urban Portrait" },
      { id: 4, src: "/3.webp", title: "Intimate Gaze" },
      { id: 5, src: "/5.webp", title: "Connection" },
      { id: 6, src: "/8.webp", title: "Intimate Moments" },
    ],
  },
  {
    id: 3,
    name: "Abhinav Bhardwaj",
    specialty: "Oompa Loompa",
    bio: "Kya matlab abhi maine socha nahi",
    quote: "The street is a canvas painted by humanity every single day.",
    image: "/street-photographer.jpg",
    works: [
      { id: 1, src: "/4.webp", title: "Street Life" },
      { id: 2, src: "/1.webp", title: "Urban Moments" },
      { id: 3, src: "/2.webp", title: "City Pulse" },
      { id: 4, src: "/7.webp", title: "Shadows & Light" },
      { id: 5, src: "/5.webp", title: "Passage" },
      { id: 6, src: "/3.webp", title: "Metropolitan" },
    ],
  },
  {
    id: 4,
    name: "Pawan Manignandan",
    specialty: "Oompa Loompa",
    bio: "V-Log is better then S-Log",
    quote: "Love stories deserve to be told with beauty and authenticity.",
    image: "/wedding-photographer.jpg",
    works: [
      { id: 1, src: "/8.webp", title: "Intimate Moments" },
      { id: 2, src: "/2.webp", title: "Vows" },
      { id: 3, src: "/6.webp", title: "First Dance" },
      { id: 4, src: "/1.webp", title: "Celebration" },
      { id: 5, src: "/3.webp", title: "Emotion" },
      { id: 6, src: "/5.webp", title: "Forever" },
    ],
  },
  {
    id: 5,
    name: "Musaib Bin Bashir",
    specialty: "Oompa Loompa",
    bio: "Bohat time lag gaye ye banane mai",
    quote: "Wildlife photography is a conversation between patience and wonder.",
    image: "/wildlife-photographer.jpg",
    works: [
      { id: 1, src: "/3.webp", title: "Wildlife Wonder" },
      { id: 2, src: "/5.webp", title: "Natural Kingdom" },
      { id: 3, src: "/1.webp", title: "Animal Behavior" },
      { id: 4, src: "/7.webp", title: "Predator & Prey" },
      { id: 5, src: "/4.webp", title: "Habitat" },
      { id: 6, src: "/2.webp", title: "Untamed" },
    ],
  },
  
]

export default function PhotographerPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id
  const photographer = photographersData.find((p) => p.id === Number.parseInt(id))

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

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {photographer.works.map((work) => (
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
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-base font-bold tracking-tight">{work.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
