"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { createMenuItem, updateMenuItem, deleteMenuItem } from "@/app/actions/menu-items"
import type { Category, MenuItem } from "@/lib/types"
import Image from "next/image"
import useSWR from "swr"

interface MenuItemsManagerProps {
  initialMenuItems: MenuItem[]
  categories: Category[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function MenuItemsManager({ initialMenuItems, categories }: MenuItemsManagerProps) {
  const { data: menuItems = initialMenuItems, mutate } = useSWR<MenuItem[]>("/api/menu-items", fetcher, {
    fallbackData: initialMenuItems,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })

  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [processingBg, setProcessingBg] = useState(false)
  const [formData, setFormData] = useState({
    category_id: "",
    name: "",
    description: "",
    price: 0,
    image_url: "",
    is_available: true,
  })

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

      if (!response.ok) {
        throw new Error("Error al optimizar la imagen")
      }

      const data = await response.json()

      setProcessingBg(true)
      try {
        const bgResponse = await fetch("/api/remove-bg", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: data.url }),
        })

        if (!bgResponse.ok) {
          console.error("Error al quitar el fondo, usando imagen original")
          setFormData((prev) => ({ ...prev, image_url: data.url }))
          return
        }

        const bgData = await bgResponse.json()

        if (bgData.processedImageUrl) {
          const processedBlob = await fetch(bgData.processedImageUrl).then((r) => r.blob())
          const processedFormData = new FormData()
          processedFormData.append("file", processedBlob, `processed-${Date.now()}.png`)

          const finalUpload = await fetch("/api/upload", {
            method: "POST",
            body: processedFormData,
          })

          if (finalUpload.ok) {
            const finalData = await finalUpload.json()
            setFormData((prev) => ({ ...prev, image_url: finalData.url }))
          } else {
            setFormData((prev) => ({ ...prev, image_url: data.url }))
          }
        } else {
          setFormData((prev) => ({ ...prev, image_url: data.url }))
        }
      } catch (bgError) {
        console.error("Error al quitar el fondo:", bgError)
        setFormData((prev) => ({ ...prev, image_url: data.url }))
      } finally {
        setProcessingBg(false)
      }
    } catch (error) {
      console.error("Error uploading file:", error)
      alert("Error al subir la imagen")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      await updateMenuItem(editingId, formData)
    } else {
      await createMenuItem(formData)
    }

    setFormData({ category_id: "", name: "", description: "", price: 0, image_url: "", is_available: true })
    setIsAdding(false)
    setEditingId(null)
    mutate()
  }

  const handleEdit = (item: MenuItem) => {
    setEditingId(item.id)
    setFormData({
      category_id: item.category_id,
      name: item.name,
      description: item.description || "",
      price: item.price,
      image_url: item.image_url || "",
      is_available: item.is_available,
    })
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este plato?")) {
      await deleteMenuItem(id)
      mutate()
    }
  }

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    await updateMenuItem(id, { is_available: !currentStatus })
    mutate()
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Gestión de Platos</h2>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#FFD700] hover:bg-[#FFA500] text-black w-full sm:w-auto text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Plato
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-zinc-900 border-[#FFD700]/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-[#FFD700] text-lg sm:text-xl">
              {editingId ? "Editar Plato" : "Nuevo Plato"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white text-sm">
                  Categoría
                </Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger className="bg-black border-[#FFD700]/20 text-white text-sm">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-[#FFD700]/20">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="text-white text-sm">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white text-sm">
                  Nombre
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
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
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white text-sm">
                  Precio (S/)
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price || ""}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({ ...formData, price: value === "" ? 0 : Number.parseFloat(value) })
                  }}
                  required
                  className="bg-black border-[#FFD700]/20 text-white text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image" className="text-white text-sm">
                  Imagen del Plato
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading || processingBg}
                    className="bg-black border-[#FFD700]/20 text-white text-sm file:bg-[#FFD700] file:text-black file:border-0 file:px-3 file:py-1.5 file:rounded-md file:mr-2 file:font-medium file:text-sm hover:file:bg-[#FFA500]"
                  />
                  {uploading && (
                    <span className="text-[#FFD700] flex items-center text-xs sm:text-sm">Subiendo...</span>
                  )}
                  {processingBg && (
                    <span className="text-[#FFD700] flex items-center text-xs sm:text-sm">Quitando fondo...</span>
                  )}
                </div>
                {formData.image_url && (
                  <div className="flex justify-center mt-4">
                    <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-lg overflow-hidden border-2 border-[#FFD700]/30 bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-lg">
                      <Image
                        src={formData.image_url || "/placeholder.svg"}
                        alt="Vista previa"
                        fill
                        className="object-contain p-3 sm:p-4"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_available"
                  checked={formData.is_available}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                />
                <Label htmlFor="is_available" className="text-white text-sm">
                  Disponible
                </Label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="submit"
                  className="bg-[#FFD700] hover:bg-[#FFA500] text-black font-semibold text-sm w-full sm:w-auto"
                  disabled={uploading || processingBg}
                >
                  {editingId ? "Actualizar" : "Crear"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false)
                    setEditingId(null)
                    setFormData({
                      category_id: "",
                      name: "",
                      description: "",
                      price: 0,
                      image_url: "",
                      is_available: true,
                    })
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

      <div className="grid gap-3 sm:gap-4">
        {menuItems.map((item) => {
          const category = categories.find((c) => c.id === item.category_id)
          return (
            <Card key={item.id} className="bg-zinc-900 border-[#FFD700]/20">
              <CardContent className="p-3 sm:p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {item.image_url && (
                    <div className="relative w-full sm:w-24 md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-900 mx-auto sm:mx-0">
                      <Image
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                      <div className="w-full sm:flex-1">
                        <h3 className="text-lg sm:text-xl font-bold text-white truncate">{item.name}</h3>
                        <p className="text-xs sm:text-sm text-[#FFD700]">{category?.name}</p>
                        {item.description && (
                          <p className="text-gray-400 mt-1 text-xs sm:text-sm line-clamp-2">{item.description}</p>
                        )}
                        <p className="text-base sm:text-lg font-bold text-[#FFD700] mt-2">S/ {item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex flex-row sm:flex-col lg:flex-row gap-2 w-full sm:w-auto">
                        <Button
                          size="sm"
                          variant={item.is_available ? "default" : "outline"}
                          onClick={() => toggleAvailability(item.id, item.is_available)}
                          className={`flex-1 sm:flex-none text-xs ${
                            item.is_available
                              ? "bg-green-600 hover:bg-green-700 text-white"
                              : "border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          }`}
                        >
                          {item.is_available ? "Disponible" : "Agotado"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(item)}
                          className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black"
                        >
                          <Pencil className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
