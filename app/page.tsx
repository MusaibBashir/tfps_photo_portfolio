"use client"

import { useRef } from "react"
import InfiniteGallery from "../components/InfiniteGallery"
import { ArrowDown, Instagram } from "lucide-react"
import Link from "next/link"
import { galleryImages } from "./config/gallery-images"

// 1. Curate high-quality images for the 3D effect
// Using dark/moody images works best with the "cloth" shader effect
const heroImages = galleryImages

export default function PortfolioHome() {
  const aboutRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <main className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter uppercase">TFPS X Photography</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium tracking-widest uppercase">
          <Link href="/work" className="hover:text-gray-400 transition-colors">
            Work
          </Link>
          <Link href="/photographers" className="hover:text-gray-400 transition-colors">
            Photographers
          </Link>
          <Link href="/about" className="hover:text-gray-400 transition-colors">
            About
          </Link>
        </div>
        <button className="border border-white/30 px-4 py-2 text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Contact
        </button>
      </nav>

      {/* --- HERO SECTION (3D Gallery) --- */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* The 3D Component */}
        <div className="absolute inset-0 z-0">
          <InfiniteGallery
            images={heroImages}
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

        <div className="h-screen inset-0 pointer-events-none fixed flex items-center justify-center text-center px-3 mix-blend-exclusion text-white">
          <h1 className="font-serif text-4xl md:text-7xl tracking-tight">
            <span className="italic">I create;</span> therefore I am
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer pointer-events-auto"
          onClick={scrollToContent}
        >
          <ArrowDown className="w-6 h-6 text-white/50 hover:text-white transition-colors" />
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
                My work explores the relationship between light, texture, and time. Using a combination of digital
                manipulation and raw analog techniques, I strive to create images that feel like memories rather than
                documentation.
              </p>
              <p>Based in Tokyo, available worldwide for editorial and commercial commissions.</p>

              <div className="pt-8 flex gap-6">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-5 h-5 cursor-pointer hover:text-white transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
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
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 21.5 2.1a10.9 10.9 0 0 1-4.53 1.3A4.48 4.48 0 0 0 16 3.13a4.48 4.48 0 0 0 1.66 4.07A9.42 9.42 0 0 1 8.8 13.5a4.48 4.48 0 0 0 1.3 3.18A4.48 4.48 0 0 0 11 21.38a4.48 4.48 0 0 0 4.07 1.66A9.42 9.42 0 0 1 21.8 13.5a4.48 4.48 0 0 0 3.18-1.3A4.48 4.48 0 0 0 22.4 8.75a4.48 4.48 0 0 0-1.3-4.07A10.9 10.9 0 0 1 23 3z" />
                  </svg>
                </Link>
                <Link
                  href="mailto:info@tfpsxphotography.com"
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

          {/* Simple Recent Works Grid */}
          <div className="mt-32">
            <div className="flex justify-between items-end mb-12">
              <h3 className="text-xl uppercase tracking-widest">Selected Works</h3>
              <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">
                View Archive
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Using the first 3 images for the static grid */}
              {heroImages.slice(0, 3).map((img, i) => (
                <div key={i} className="aspect-[3/4] overflow-hidden group relative cursor-pointer">
                  <img
                    src={img.src || "/placeholder.svg"}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 border-t border-white/10 text-center text-xs text-gray-600 uppercase tracking-widest">
        &copy; 2026 TFPS X Photography. All Rights Reserved.
      </footer>
    </main>
  )
}
