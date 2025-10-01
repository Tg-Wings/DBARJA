"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"
import { createGalleryImage, deleteGalleryImage } from "@/app/actions/gallery"
import type { GalleryImage } from "@/lib/types"
import Image from "next/image"
import useSWR from "swr"

interface GalleryManagerProps {
  initialImages: GalleryImage[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function GalleryManager({ initialImages }: GalleryManagerProps) {
  const { data: images = initialImages, mutate } = useSWR<GalleryImage[]>("/api/gallery-images", fetcher, {
    fallbackData: initialImages,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })

  const [isAdding, setIsAdding] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({ image_url: "", title: "", description: "" })

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/optimize-image", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      setFormData((prev) => ({ ...prev, image_url: data.url }))
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Error al subir la imagen")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createGalleryImage(formData)
    setFormData({ image_url: "", title: "", description: "" })
    setIsAdding(false)
    mutate()
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta imagen?")) {
      await deleteGalleryImage(id)
      mutate()
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Gestión de Galería</h2>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#FFD700] hover:bg-[#FFA500] text-black w-full sm:w-auto text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Imagen
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-zinc-900 border-[#FFD700]/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-[#FFD700] text-lg sm:text-xl">Nueva Imagen</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="image" className="text-white text-sm">
                  Imagen
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    required
                    className="bg-black border-[#FFD700]/20 text-white text-sm file:bg-[#FFD700] file:text-black file:border-0 file:px-3 file:py-1.5 file:rounded-md file:mr-2 file:font-medium file:text-sm hover:file:bg-[#FFA500]"
                  />
                  {uploading && (
                    <span className="text-[#FFD700] flex items-center text-xs sm:text-sm">Subiendo...</span>
                  )}
                </div>
                {formData.image_url && (
                  <div className="flex justify-center mt-4">
                    <div className="relative w-full max-w-sm sm:max-w-md aspect-video rounded-lg overflow-hidden border-2 border-[#FFD700]/30">
                      <Image
                        src={formData.image_url || "/placeholder.svg"}
                        alt="Vista previa"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white text-sm">
                  Título
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="bg-black border-[#FFD700]/20 text-white text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white text-sm">
                  Descripción
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-black border-[#FFD700]/20 text-white text-sm min-h-[80px]"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="submit"
                  className="bg-[#FFD700] hover:bg-[#FFA500] text-black font-semibold text-sm w-full sm:w-auto"
                  disabled={uploading}
                >
                  Agregar
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false)
                    setFormData({ image_url: "", title: "", description: "" })
                  }}
                  className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black text-sm w-full sm:w-auto"
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {images.map((image) => (
          <Card key={image.id} className="bg-zinc-900 border-[#FFD700]/20 overflow-hidden">
            <div className="relative aspect-square w-full">
              <Image
                src={image.image_url || "/placeholder.svg"}
                alt={image.title || "Imagen"}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-3 sm:p-4 space-y-2">
              {image.title && <h3 className="font-semibold text-white truncate text-sm">{image.title}</h3>}
              {image.description && <p className="text-xs text-gray-400 line-clamp-2">{image.description}</p>}
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleDelete(image.id)}
                className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-xs"
              >
                <Trash2 className="h-3 w-3 mr-2" />
                Eliminar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
