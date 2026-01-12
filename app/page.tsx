"use client"

import { useRef, useState, useEffect } from "react"
import InfiniteGallery from "../components/InfiniteGallery"
import { ArrowDown, Instagram, Menu, X } from "lucide-react"
import Link from "next/link"
import { getGalleryImages } from "@/lib/data"

console.log('ENV CHECK:', {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
})

export default function PortfolioHome() {
  const aboutRef = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [galleryImages, setGalleryImages] = useState<{ src: string; alt: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadGalleryImages()
  }, [])

  const loadGalleryImages = async () => {
    setLoading(true)
    const data = await getGalleryImages()
    setGalleryImages(data.map(img => ({ src: img.src, alt: img.alt })))
    setLoading(false)
  }

  const scrollToContent = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-lg md:text-xl font-bold tracking-tighter uppercase">TFPS X Photography</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-widest uppercase">
          <Link href="/featured" className="hover:text-gray-400 transition-colors">
            Featured
          </Link>
          <Link href="/photographers" className="hover:text-gray-400 transition-colors">
            Photographers
          </Link>
          <Link href="/about" className="hover:text-gray-400 transition-colors">
            About
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/photographers" className="text-xs font-medium tracking-widest uppercase hover:text-gray-400 transition-colors">
            Photographers
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:text-gray-400 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <a
          href="mailto:tfps.iitkgp@gmail.com"
          className="hidden md:block border border-white/30 px-4 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          Contact
        </a>
      </nav>

      {/* Hamburger Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 p-2 text-white hover:text-gray-400 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center space-y-8 text-2xl font-medium tracking-widest uppercase">
            <Link
              href="/featured"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-gray-400 transition-colors"
            >
              Featured
            </Link>
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-gray-400 transition-colors"
            >
              About
            </Link>
            <a
              href="mailto:tfps.iitkgp@gmail.com"
              onClick={() => setMenuOpen(false)}
              className="text-white hover:text-gray-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      )}

      {/* --- HERO SECTION (3D Gallery) --- */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* The 3D Component */}
        {!loading && galleryImages.length > 0 && (
          <div className="absolute inset-0 z-0">
            <InfiniteGallery
              images={galleryImages}
              speed={1.5} // Slightly faster for impact
              visibleCount={12} // More density
              fadeSettings={{
                fadeIn: { start: 0.1, end: 0.3 },
                fadeOut: { start: 0.6, end: 0.8 }, // Fade out earlier to keep focus on center
              }}
              blurSettings={{
                blurIn: { start: 0.0, end: 0.2 },
                blurOut: { start: 0.5, end: 0.8 },
                maxBlur: 4.0,
              }}
              className="w-full h-full"
            />
          </div>
        )}

        <div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
          <h1 className="font-serif text-4xl md:text-7xl tracking-tight">
            <span className="italic">I create;</span> therefore I am
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 animate-bounce cursor-pointer pointer-events-auto"
          onClick={scrollToContent}
        >
          <div className="bg-black/40 backdrop-blur-sm rounded-full p-3 border border-white/20">
            <ArrowDown className="w-8 h-8 md:w-6 md:h-6 text-white hover:text-white/80 transition-colors" />
          </div>
        </div>
      </section>

      {/* --- STANDARD CONTENT SECTION --- */}
      <section ref={aboutRef} className="relative z-20 px-6 py-24 md:px-24 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-5xl font-light leading-tight mb-8">
                Capturing the <span className="italic font-serif text-gray-400">unseen</span> rhythms of the natural
                world.
              </h2>
            </div>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed">
              <p>
                TFPS X Photography is a collective of passionate photographers united by a shared vision to capture
                compelling visual stories. Founded on the principles of artistic expression and technical
                excellence, our society brings together photographers of all skill levels to collaborate, learn, and push
                creative boundaries.
              </p>
              <p>Dear Scriptwriters, please kuch acha likdo isko replace karne ke liye</p>

              <div className="pt-8 flex gap-6">
                <a
                  href="https://www.instagram.com/tfps.iitkgp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5 h-5 cursor-pointer hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <Link
                  href="mailto:tfps.iitkgp@gmail.com"
                  className="w-5 h-5 cursor-pointer hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-gray-600 uppercase tracking-widest">
        &copy; 2026 TFPS. All Rights Reserved.
      </footer>
    </main>
  )
}
