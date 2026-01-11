"use client"

import { useEffect, useCallback } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface Photo {
    id: number
    title?: string
    category?: string
    src: string
    aspect: string
}

interface PhotoLightboxProps {
    photos: Photo[]
    currentIndex: number
    onClose: () => void
    onNavigate: (index: number) => void
}

export default function PhotoLightbox({ photos, currentIndex, onClose, onNavigate }: PhotoLightboxProps) {
    const currentPhoto = photos[currentIndex]

    const handlePrevious = useCallback(() => {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
        onNavigate(newIndex)
    }, [currentIndex, photos.length, onNavigate])

    const handleNext = useCallback(() => {
        const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
        onNavigate(newIndex)
    }, [currentIndex, photos.length, onNavigate])

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    onClose()
                    break
                case "ArrowLeft":
                    handlePrevious()
                    break
                case "ArrowRight":
                    handleNext()
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handlePrevious, handleNext, onClose])

    // Prevent body scroll when lightbox is open
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [])

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
            {/* Header with close button and counter */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-6">
                <div className="text-white/80 text-sm tracking-widest">
                    {currentIndex + 1} / {photos.length}
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    aria-label="Close lightbox"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Main image container */}
            <div className="absolute inset-0 flex items-center justify-center p-4 md:p-16">
                <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
                    <img
                        src={currentPhoto.src || "/placeholder.svg"}
                        alt={currentPhoto.title}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                    />
                </div>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
                aria-label="Previous photo"
            >
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
                aria-label="Next photo"
            >
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Bottom info */}
            {(currentPhoto.title || currentPhoto.category) && (
                <div className="absolute bottom-0 left-0 right-0 z-10 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="max-w-7xl mx-auto">
                        {currentPhoto.title && (
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2">
                                {currentPhoto.title}
                            </h2>
                        )}
                        {currentPhoto.category && (
                            <p className="text-sm text-white/70 uppercase tracking-widest">{currentPhoto.category}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Click outside to close */}
            <div
                className="absolute inset-0 -z-10"
                onClick={onClose}
                aria-label="Close lightbox"
            />
        </div>
    )
}
