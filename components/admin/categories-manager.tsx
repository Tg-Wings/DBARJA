"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { createCategory, updateCategory, deleteCategory } from "@/app/actions/categories"
import type { Category } from "@/lib/types"
import useSWR from "swr"

interface CategoriesManagerProps {
  initialCategories: Category[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function CategoriesManager({ initialCategories }: CategoriesManagerProps) {
  const { data: categories = initialCategories, mutate } = useSWR<Category[]>("/api/categories", fetcher, {
    fallbackData: initialCategories,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  })

  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", description: "", order_index: 0 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (editingId) {
      await updateCategory(editingId, formData)
    } else {
      await createCategory(formData)
    }

    setFormData({ name: "", description: "", order_index: 0 })
    setIsAdding(false)
    setEditingId(null)
    mutate()
  }

  const handleEdit = (category: Category) => {
    setEditingId(category.id)
    setFormData({
      name: category.name,
      description: category.description || "",
      order_index: category.order_index,
    })
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta categoría?")) {
      await deleteCategory(id)
      mutate()
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Gestión de Categorías</h2>
        <Button
          onClick={() => setIsAdding(!isAdding)}
          className="bg-[#FFD700] hover:bg-[#FFA500] text-black w-full sm:w-auto text-sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Categoría
        </Button>
      </div>

      {isAdding && (
        <Card className="bg-zinc-900 border-[#FFD700]/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-[#FFD700] text-lg sm:text-xl">
              {editingId ? "Editar Categoría" : "Nueva Categoría"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
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
                <Label htmlFor="order_index" className="text-white text-sm">
                  Orden
                </Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: Number.parseInt(e.target.value) })}
                  required
                  className="bg-black border-[#FFD700]/20 text-white text-sm"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  type="submit"
                  className="bg-[#FFD700] hover:bg-[#FFA500] text-black font-semibold text-sm w-full sm:w-auto"
                >
                  {editingId ? "Actualizar" : "Crear"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false)
                    setEditingId(null)
                    setFormData({ name: "", description: "", order_index: 0 })
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
        {categories.map((category) => (
          <Card key={category.id} className="bg-zinc-900 border-[#FFD700]/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1 w-full">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{category.name}</h3>
                  {category.description && (
                    <p className="text-gray-400 mt-1 text-xs sm:text-sm">{category.description}</p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Orden: {category.order_index}</p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(category)}
                    className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black flex-1 sm:flex-none"
                  >
                    <Pencil className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-0" />
                    <span className="sm:hidden ml-2">Editar</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(category.id)}
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 sm:mr-0" />
                    <span className="sm:hidden ml-2">Eliminar</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
