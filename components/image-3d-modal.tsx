"use client"

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface Image3DModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  title: string
}

export function Image3DModal({ isOpen, onClose, imageUrl, title }: Image3DModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-5xl p-0 bg-black border-[#FFD700]/30 overflow-hidden">
        <VisuallyHidden>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Imagen del plato {title}</DialogDescription>
        </VisuallyHidden>

        <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-[80vh] bg-gradient-to-br from-zinc-900 to-black">
          {/* Botón de cerrar */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>

          {/* Título */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-50 bg-black/70 px-3 py-2 sm:px-4 sm:py-2 rounded-lg">
            <h3 className="text-[#FFD700] font-bold text-sm sm:text-base md:text-lg">{title}</h3>
          </div>

          <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="relative w-full h-full max-w-3xl max-h-full">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 640px) 95vw, (max-width: 1024px) 90vw, 80vw"
                priority
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
