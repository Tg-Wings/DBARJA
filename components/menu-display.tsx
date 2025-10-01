"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Image3DModal } from "@/components/image-3d-modal"
import type { Category, MenuItem } from "@/lib/types"

interface MenuDisplayProps {
  categories: Category[]
  menuItems: MenuItem[]
}

function getCategoryBackground(categoryName: string): string {
  const name = categoryName.toLowerCase()
  if (name.includes("pollo") || name.includes("brasa") || name.includes("mostrito")) {
    return "/backgrounds/pollo-brasa-bg.png"
  }
  if (name.includes("chifa")) {
    return "/backgrounds/chifa-bg.png"
  }
  return "/backgrounds/pollo-brasa-bg.png"
}

export function MenuDisplay({ categories, menuItems }: MenuDisplayProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [is3DModalOpen, setIs3DModalOpen] = useState(false)

  const filteredItems = selectedCategory ? menuItems.filter((item) => item.category_id === selectedCategory) : menuItems

  const handleImageClick = (item: MenuItem) => {
    setSelectedItem(item)
    setIs3DModalOpen(true)
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Category Filter - Mejorado responsive */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className={`text-xs sm:text-sm ${
            selectedCategory === null
              ? "bg-[#FFD700] hover:bg-[#FFA500] text-black"
              : "border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black bg-transparent"
          }`}
        >
          Todos
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={`text-xs sm:text-sm ${
              selectedCategory === category.id
                ? "bg-[#FFD700] hover:bg-[#FFA500] text-black"
                : "border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black bg-transparent"
            }`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-0">
        {filteredItems.map((item) => {
          const category = categories.find((c) => c.id === item.category_id)
          const backgroundImage = category ? getCategoryBackground(category.name) : "/backgrounds/pollo-brasa-bg.png"

          return (
            <Card
              key={item.id}
              className="bg-zinc-900 border-[#FFD700]/20 hover:border-[#FFD700] transition-all overflow-hidden group"
            >
              <div
                className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
                onClick={() => item.image_url && handleImageClick(item)}
              >
                <Image
                  src={backgroundImage || "/placeholder.svg"}
                  alt="background"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
                {item.image_url && (
                  <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-4">
                    <div className="relative w-full h-full">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                    </div>
                  </div>
                )}
                {!item.is_available && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-10">
                    <Badge variant="destructive" className="text-sm sm:text-base lg:text-lg px-3 py-1 sm:px-4 sm:py-2">
                      Agotado
                    </Badge>
                  </div>
                )}
              </div>
              <CardContent className="p-3 sm:p-4 md:p-6 space-y-2 sm:space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white leading-tight">{item.name}</h3>
                  <Badge variant="outline" className="border-[#FFD700] text-[#FFD700] flex-shrink-0 text-xs">
                    {category?.name}
                  </Badge>
                </div>
                {item.description && (
                  <p className="text-gray-400 text-xs sm:text-sm line-clamp-2">{item.description}</p>
                )}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFD700]">
                    S/ {item.price.toFixed(2)}
                  </span>
                  {item.is_available && (
                    <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs">Disponible</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 px-4">
          <p className="text-gray-400 text-base sm:text-lg">No hay platos disponibles en esta categoría</p>
        </div>
      )}

      {selectedItem && (
        <Image3DModal
          isOpen={is3DModalOpen}
          onClose={() => setIs3DModalOpen(false)}
          imageUrl={selectedItem.image_url || ""}
          title={selectedItem.name}
        />
      )}
    </div>
  )
}
