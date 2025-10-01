"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import type { GalleryImage } from "@/lib/types"

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-base sm:text-lg">No hay imágenes en la galería aún</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group border border-[#FFD700]/20 hover:border-[#FFD700] transition-colors"
            onClick={() => setSelectedImage(image)}
          >
            <Image
              src={image.image_url || "/placeholder.svg?height=400&width=400&query=restaurant ambiance"}
              alt={image.title || "Imagen de galería"}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
              <p className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2 sm:px-4 text-center text-xs sm:text-sm">
                {image.title || "Ver imagen"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-4xl md:max-w-5xl w-full bg-black border-[#FFD700]/20 p-0">
          <VisuallyHidden>
            <DialogTitle>{selectedImage?.title || "Imagen de galería"}</DialogTitle>
            <DialogDescription>{selectedImage?.description || "Imagen de la galería de D'Barja"}</DialogDescription>
          </VisuallyHidden>

          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-2 top-2 sm:right-4 sm:top-4 z-50 rounded-full bg-black/50 p-1.5 sm:p-2 hover:bg-black/70 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </button>
          {selectedImage && (
            <div className="relative w-full">
              <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh]">
                <Image
                  src={selectedImage.image_url || "/placeholder.svg"}
                  alt={selectedImage.title || "Imagen"}
                  fill
                  className="object-contain"
                  sizes="95vw"
                />
              </div>
              {(selectedImage.title || selectedImage.description) && (
                <div className="bg-black/70 p-3 sm:p-4 md:p-6">
                  {selectedImage.title && (
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFD700]">{selectedImage.title}</h3>
                  )}
                  {selectedImage.description && (
                    <p className="text-gray-300 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
