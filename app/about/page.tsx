"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">About</h1>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-3xl mx-auto px-6 md:px-8 py-20">
        <div className="space-y-12">
          {/* About Club Section */}
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-6">About TFPS X Photography</h2>
            <p className="text-white/70 leading-relaxed mb-6">
              TFPS X Photography is a collective of passionate photographers united by a shared vision to capture the
              world's most compelling visual stories. Founded on the principles of artistic expression and technical
              excellence, our club brings together photographers of all skill levels to collaborate, learn, and push
              creative boundaries.
            </p>
            <p className="text-white/70 leading-relaxed">
              Through exhibitions, workshops, and collaborative projects, we celebrate the art of photography while
              fostering a community dedicated to visual storytelling and innovation.
            </p>
          </div>

          {/* Mission Section */}
          <div>
            <h3 className="text-2xl font-light mb-4">Our Mission</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              To cultivate a vibrant community of photographers where creativity flourishes, technical skills are
              refined, and diverse perspectives are celebrated. We believe in the power of photography to connect
              people, document moments, and inspire change.
            </p>
          </div>

          {/* Values Section */}
          <div>
            <h3 className="text-2xl font-light mb-6">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold text-white uppercase tracking-widest text-sm">Creativity</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  We encourage experimental approaches and unconventional perspectives in visual storytelling.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white uppercase tracking-widest text-sm">Collaboration</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  Success comes from sharing knowledge, supporting peers, and building meaningful connections.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white uppercase tracking-widest text-sm">Excellence</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  We strive for technical mastery and artistic integrity in every project we undertake.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-white uppercase tracking-widest text-sm">Community</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  We foster an inclusive environment where photographers of all levels feel welcomed and inspired.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-white/10 pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-light mb-2">50+</div>
                <p className="text-sm uppercase tracking-widest text-white/60">Active Members</p>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">15+</div>
                <p className="text-sm uppercase tracking-widest text-white/60">Annual Exhibitions</p>
              </div>
              <div>
                <div className="text-4xl font-light mb-2">10+</div>
                <p className="text-sm uppercase tracking-widest text-white/60">Years of Community</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="border-t border-white/10 pt-12 text-center space-y-6">
            <p className="text-white/70 leading-relaxed">
              Interested in joining our community or collaborating with TFPS? We'd love to hear from you.
            </p>
            <button className="inline-block border border-white px-8 py-3 uppercase tracking-widest text-sm font-medium hover:bg-white hover:text-black transition-all duration-300">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
