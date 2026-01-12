"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Photographer } from "@/lib/data"
import Link from "next/link"
import { ArrowLeft, Upload, Plus, Trash2, Lock, X } from "lucide-react"

declare global {
    interface Window {
        cloudinary: any
    }
}

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")

    const [photographers, setPhotographers] = useState<Photographer[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<"photographers" | "works" | "featured" | "gallery">("photographers")

    // Form states for adding new items
    const [newPhotographer, setNewPhotographer] = useState({
        name: "",
        specialty: "",
        bio: "",
        quote: "",
        profile_image_url: ""
    })

    const [newWork, setNewWork] = useState({
        photographer_id: "",
        title: "",
        src: "",
        aspect: "landscape" as "landscape" | "portrait" | "square"
    })

    const [uploadedUrls, setUploadedUrls] = useState<string[]>([])

    const [newFeatured, setNewFeatured] = useState({
        title: "",
        category: "",
        photographer_name: "",
        src: "",
        aspect: "landscape" as "landscape" | "portrait" | "square"
    })

    const [newGallery, setNewGallery] = useState({
        src: "",
        alt: ""
    })

    useEffect(() => {
        const authenticated = sessionStorage.getItem('admin_authenticated')
        if (authenticated === 'true') {
            setIsAuthenticated(true)
            loadPhotographers()
            loadCloudinaryWidget()
        }
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

        if (password === correctPassword) {
            setIsAuthenticated(true)
            sessionStorage.setItem('admin_authenticated', 'true')
            setAuthError("")
            loadPhotographers()
            loadCloudinaryWidget()
        } else {
            setAuthError("Incorrect password")
            setPassword("")
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        sessionStorage.removeItem('admin_authenticated')
        setPassword("")
    }

    const loadCloudinaryWidget = () => {
        if (!document.getElementById("cloudinary-upload-widget")) {
            const script = document.createElement("script")
            script.id = "cloudinary-upload-widget"
            script.src = "https://upload-widget.cloudinary.com/global/all.js"
            script.async = true
            document.body.appendChild(script)
        }
    }

    const loadPhotographers = async () => {
        setLoading(true)
        const { data, error } = await supabase.from("photographers").select("*").order("id")
        if (!error && data) {
            setPhotographers(data)
        }
        setLoading(false)
    }

    const openCloudinaryWidget = (onUpload: (urls: string[]) => void, multiple = false) => {
        if (!window.cloudinary) {
            alert("Cloudinary widget not loaded yet. Please try again.")
            return
        }

        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "de29hvv4d",
                uploadPreset: "ml_default",
                sources: ["local", "url", "camera"],
                multiple: multiple,
                maxFiles: multiple ? 10 : 1,
                resourceType: "image"
            },
            (error: any, result: any) => {
                if (!error && result && result.event === "success") {
                    onUpload([result.info.secure_url])
                }
            }
        )

        widget.open()
    }

    const openCloudinaryMediaLibrary = (onSelect: (url: string) => void) => {
        if (!window.cloudinary) {
            alert("Cloudinary not loaded yet. Please try again.")
            return
        }

        window.cloudinary.openMediaLibrary(
            {
                cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "de29hvv4d",
                api_key: "your_api_key", // Optional: for authenticated access
                multiple: false,
                max_files: 1
            },
            {
                insertHandler: (data: any) => {
                    if (data.assets && data.assets.length > 0) {
                        onSelect(data.assets[0].secure_url)
                    }
                }
            }
        )
    }

    const addPhotographer = async () => {
        if (!newPhotographer.name) {
            alert("Please enter a name")
            return
        }

        try {
            const response = await fetch('/api/photographers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newPhotographer)
            })

            const result = await response.json()

            if (!response.ok) {
                alert("Error adding photographer: " + result.error)
            } else {
                alert("Photographer added successfully!")
                setNewPhotographer({
                    name: "",
                    specialty: "",
                    bio: "",
                    quote: "",
                    profile_image_url: ""
                })
                loadPhotographers()
            }
        } catch (error) {
            alert("Error adding photographer: " + error)
        }
    }

    const deletePhotographer = async (id: number) => {
        if (!confirm("Are you sure you want to delete this photographer? This will also delete all their works.")) {
            return
        }

        try {
            const response = await fetch(`/api/photographers?id=${id}`, {
                method: 'DELETE'
            })

            const result = await response.json()

            if (!response.ok) {
                alert("Error deleting photographer: " + result.error)
            } else {
                alert("Photographer deleted successfully!")
                loadPhotographers()
            }
        } catch (error) {
            alert("Error deleting photographer: " + error)
        }
    }

    const addWorks = async () => {
        if (!newWork.photographer_id || uploadedUrls.length === 0 || !newWork.title) {
            alert("Please select a photographer, upload photos, and enter a title")
            return
        }

        try {
            // Add all uploaded photos with the same title and aspect
            for (const url of uploadedUrls) {
                const response = await fetch('/api/works', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        photographer_id: parseInt(newWork.photographer_id),
                        title: newWork.title,
                        src: url,
                        aspect: newWork.aspect
                    })
                })

                if (!response.ok) {
                    const result = await response.json()
                    alert("Error adding work: " + result.error)
                    return
                }
            }

            alert(`${uploadedUrls.length} work(s) added successfully!`)
            setNewWork({
                photographer_id: "",
                title: "",
                src: "",
                aspect: "landscape"
            })
            setUploadedUrls([])
        } catch (error) {
            alert("Error adding works: " + error)
        }
    }

    const addToFeatured = async () => {
        if (!newFeatured.title || !newFeatured.src) {
            alert("Please fill in title and upload/select a photo")
            return
        }

        try {
            const response = await fetch('/api/featured', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newFeatured,
                    display_order: 0
                })
            })

            const result = await response.json()

            if (!response.ok) {
                alert("Error adding to featured: " + result.error)
            } else {
                alert("Added to featured successfully!")
                setNewFeatured({
                    title: "",
                    category: "",
                    photographer_name: "",
                    src: "",
                    aspect: "landscape"
                })
            }
        } catch (error) {
            alert("Error adding to featured: " + error)
        }
    }

    const addToGallery = async () => {
        if (!newGallery.src) {
            alert("Please upload a photo")
            return
        }

        try {
            const response = await fetch('/api/gallery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...newGallery,
                    display_order: 0
                })
            })

            const result = await response.json()

            if (!response.ok) {
                alert("Error adding to gallery: " + result.error)
            } else {
                alert("Added to gallery successfully!")
                setNewGallery({
                    src: "",
                    alt: ""
                })
            }
        } catch (error) {
            alert("Error adding to gallery: " + error)
        }
    }

    // Login screen
    if (!isAuthenticated) {
        return (
            <main className="bg-black min-h-screen text-white flex items-center justify-center">
                <div className="max-w-md w-full mx-4">
                    <div className="border border-white/10 p-8 bg-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-center mb-6">
                            <Lock className="w-12 h-12 text-white/60" />
                        </div>
                        <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
                        <p className="text-white/60 text-center mb-6 text-sm">Enter password to continue</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    className="w-full bg-black border border-white/20 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none"
                                    autoFocus
                                />
                                {authError && (
                                    <p className="text-red-400 text-sm mt-2">{authError}</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-white text-black px-6 py-3 font-bold hover:bg-gray-200 transition-colors"
                            >
                                Login
                            </button>
                        </form>

                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 text-sm text-white/60 hover:text-white transition-colors mt-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Site
                        </Link>
                    </div>
                </div>
            </main>
        )
    }

    return (
        <main className="bg-black min-h-screen text-white">
            {/* Header */}
            <div className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-6 flex items-center justify-between">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-400 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Site
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
                <div className="flex gap-4 border-b border-white/10 mb-8 overflow-x-auto">
                    {["photographers", "works", "featured", "gallery"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-4 py-2 text-sm uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === tab
                                    ? "border-b-2 border-white text-white"
                                    : "text-white/60 hover:text-white"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Photographers Tab */}
                {activeTab === "photographers" && (
                    <div className="space-y-8">
                        <div className="border border-white/10 p-6 bg-white/5">
                            <h2 className="text-xl font-bold mb-4">Add New Photographer</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Name *"
                                    value={newPhotographer.name}
                                    onChange={(e) => setNewPhotographer({ ...newPhotographer, name: e.target.value })}
                                    className="bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                                />
                                <input
                                    type="text"
                                    placeholder="Specialty (optional)"
                                    value={newPhotographer.specialty}
                                    onChange={(e) => setNewPhotographer({ ...newPhotographer, specialty: e.target.value })}
                                    className="bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                                />
                                <textarea
                                    placeholder="Bio (optional)"
                                    value={newPhotographer.bio}
                                    onChange={(e) => setNewPhotographer({ ...newPhotographer, bio: e.target.value })}
                                    className="bg-black border border-white/20 px-4 py-2 text-white md:col-span-2 placeholder:text-white/40"
                                    rows={3}
                                />
                                <textarea
                                    placeholder="Quote (optional)"
                                    value={newPhotographer.quote}
                                    onChange={(e) => setNewPhotographer({ ...newPhotographer, quote: e.target.value })}
                                    className="bg-black border border-white/20 px-4 py-2 text-white md:col-span-2 placeholder:text-white/40"
                                    rows={2}
                                />
                                <div className="md:col-span-2 flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Profile Image URL (optional)"
                                        value={newPhotographer.profile_image_url}
                                        onChange={(e) => setNewPhotographer({ ...newPhotographer, profile_image_url: e.target.value })}
                                        className="bg-black border border-white/20 px-4 py-2 text-white flex-1 placeholder:text-white/40"
                                    />
                                    <button
                                        onClick={() =>
                                            openCloudinaryWidget((urls) =>
                                                setNewPhotographer({ ...newPhotographer, profile_image_url: urls[0] })
                                            )
                                        }
                                        className="border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all flex items-center gap-2"
                                    >
                                        <Upload className="w-4 h-4" />
                                        Upload
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={addPhotographer}
                                className="mt-4 bg-white text-black px-6 py-2 font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Photographer
                            </button>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-4">Existing Photographers</h2>
                            {loading ? (
                                <p className="text-white/60">Loading...</p>
                            ) : (
                                <div className="space-y-4">
                                    {photographers.map((photographer) => (
                                        <div key={photographer.id} className="border border-white/10 p-4 bg-white/5 flex justify-between items-center">
                                            <div>
                                                <h3 className="font-bold">{photographer.name}</h3>
                                                <p className="text-sm text-white/60">{photographer.specialty}</p>
                                            </div>
                                            <button
                                                onClick={() => deletePhotographer(photographer.id)}
                                                className="border border-red-500/50 text-red-400 px-4 py-2 text-sm hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Works Tab */}
                {activeTab === "works" && (
                    <div className="border border-white/10 p-6 bg-white/5">
                        <h2 className="text-xl font-bold mb-4">Add Works</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Select Photographer *</label>
                                <select
                                    value={newWork.photographer_id}
                                    onChange={(e) => setNewWork({ ...newWork, photographer_id: e.target.value })}
                                    className="w-full bg-black border border-white/20 px-4 py-2 text-white"
                                >
                                    <option value="">Choose a photographer</option>
                                    {photographers.map((p) => (
                                        <option key={p.id} value={p.id}>{p.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Title *</label>
                                <input
                                    type="text"
                                    placeholder="Work title"
                                    value={newWork.title}
                                    onChange={(e) => setNewWork({ ...newWork, title: e.target.value })}
                                    className="w-full bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                                />
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Aspect Ratio *</label>
                                <select
                                    value={newWork.aspect}
                                    onChange={(e) => setNewWork({ ...newWork, aspect: e.target.value as any })}
                                    className="w-full bg-black border border-white/20 px-4 py-2 text-white"
                                >
                                    <option value="landscape">Landscape</option>
                                    <option value="portrait">Portrait</option>
                                    <option value="square">Square</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm text-white/60 mb-2">Upload Photos *</label>
                                <button
                                    onClick={() =>
                                        openCloudinaryWidget((urls) => {
                                            setUploadedUrls([...uploadedUrls, ...urls])
                                        }, true)
                                    }
                                    className="border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all flex items-center gap-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload Photos (Multiple)
                                </button>
                                {uploadedUrls.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <p className="text-sm text-white/60">{uploadedUrls.length} photo(s) uploaded:</p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {uploadedUrls.map((url, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img src={url} alt={`Upload ${idx + 1}`} className="w-full h-24 object-cover border border-white/10" />
                                                    <button
                                                        onClick={() => setUploadedUrls(uploadedUrls.filter((_, i) => i !== idx))}
                                                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={addWorks}
                                className="bg-white text-black px-6 py-2 font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add {uploadedUrls.length > 0 ? `${uploadedUrls.length} Work(s)` : 'Works'}
                            </button>
                        </div>
                    </div>
                )}

                {/* Featured Photos Tab */}
                {activeTab === "featured" && (
                    <div className="border border-white/10 p-6 bg-white/5">
                        <h2 className="text-xl font-bold mb-4">Add Featured Photo</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title *"
                                value={newFeatured.title}
                                onChange={(e) => setNewFeatured({ ...newFeatured, title: e.target.value })}
                                className="w-full bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Category (optional)"
                                value={newFeatured.category}
                                onChange={(e) => setNewFeatured({ ...newFeatured, category: e.target.value })}
                                className="w-full bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                            />
                            <input
                                type="text"
                                placeholder="Photographer Name (optional)"
                                value={newFeatured.photographer_name}
                                onChange={(e) => setNewFeatured({ ...newFeatured, photographer_name: e.target.value })}
                                className="w-full bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                            />
                            <select
                                value={newFeatured.aspect}
                                onChange={(e) => setNewFeatured({ ...newFeatured, aspect: e.target.value as any })}
                                className="w-full bg-black border border-white/20 px-4 py-2 text-white"
                            >
                                <option value="landscape">Landscape</option>
                                <option value="portrait">Portrait</option>
                                <option value="square">Square</option>
                            </select>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Image URL *"
                                    value={newFeatured.src}
                                    onChange={(e) => setNewFeatured({ ...newFeatured, src: e.target.value })}
                                    className="flex-1 bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                                />
                                <button
                                    onClick={() =>
                                        openCloudinaryWidget((urls) =>
                                            setNewFeatured({ ...newFeatured, src: urls[0] })
                                        )
                                    }
                                    className="border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all flex items-center gap-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload New
                                </button>
                            </div>
                            {newFeatured.src && (
                                <img src={newFeatured.src} alt="Preview" className="w-full max-w-md h-48 object-cover border border-white/10" />
                            )}
                            <button
                                onClick={addToFeatured}
                                className="bg-white text-black px-6 py-2 font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add to Featured
                            </button>
                        </div>
                    </div>
                )}

                {/* Gallery Images Tab */}
                {activeTab === "gallery" && (
                    <div className="border border-white/10 p-6 bg-white/5">
                        <h2 className="text-xl font-bold mb-4">Add Gallery Image</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Alt text (optional)"
                                value={newGallery.alt}
                                onChange={(e) => setNewGallery({ ...newGallery, alt: e.target.value })}
                                className="w-full bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                            />
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Image URL *"
                                    value={newGallery.src}
                                    onChange={(e) => setNewGallery({ ...newGallery, src: e.target.value })}
                                    className="flex-1 bg-black border border-white/20 px-4 py-2 text-white placeholder:text-white/40"
                                />
                                <button
                                    onClick={() =>
                                        openCloudinaryWidget((urls) =>
                                            setNewGallery({ ...newGallery, src: urls[0] })
                                        )
                                    }
                                    className="border border-white/30 px-4 py-2 hover:bg-white hover:text-black transition-all flex items-center gap-2"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload
                                </button>
                            </div>
                            {newGallery.src && (
                                <img src={newGallery.src} alt="Preview" className="w-full max-w-md h-48 object-cover border border-white/10" />
                            )}
                            <button
                                onClick={addToGallery}
                                className="bg-white text-black px-6 py-2 font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add to Gallery
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
