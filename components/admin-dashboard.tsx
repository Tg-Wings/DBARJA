"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { LogOut, UtensilsCrossed, FolderOpen, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { logoutAdmin } from "@/app/actions/auth"
import { CategoriesManager } from "@/components/admin/categories-manager"
import { MenuItemsManager } from "@/components/admin/menu-items-manager"
import { GalleryManager } from "@/components/admin/gallery-manager"
import type { Category, MenuItem, GalleryImage } from "@/lib/types"

interface AdminDashboardProps {
  categories: Category[]
  menuItems: MenuItem[]
  galleryImages: GalleryImage[]
}

export function AdminDashboard({ categories, menuItems, galleryImages }: AdminDashboardProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [activeTab, setActiveTab] = useState("menu")

  const handleLogout = async () => {
    setIsLoggingOut(true)
    await logoutAdmin()
    router.push("/inicio")
  }

  return (
    <div className="min-h-screen bg-black pb-20 md:pb-0">
      <div className="border-b border-[#FFD700]/20 bg-zinc-900">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 flex items-center justify-between">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#FFD700]">Panel Admin</h1>
          <Button
            variant="outline"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="hidden md:flex border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black bg-transparent text-sm"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
          <div className="hidden md:block">
            <div className="bg-zinc-900 border border-[#FFD700]/20 rounded-lg p-1 inline-flex gap-1">
              <button
                onClick={() => setActiveTab("menu")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "menu" ? "bg-[#FFD700] text-black" : "text-gray-300 hover:text-white"
                }`}
              >
                Menú
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "categories" ? "bg-[#FFD700] text-black" : "text-gray-300 hover:text-white"
                }`}
              >
                Categorías
              </button>
              <button
                onClick={() => setActiveTab("gallery")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "gallery" ? "bg-[#FFD700] text-black" : "text-gray-300 hover:text-white"
                }`}
              >
                Galería
              </button>
            </div>
          </div>

          <TabsContent value="menu">
            <MenuItemsManager initialMenuItems={menuItems} categories={categories} />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManager initialCategories={categories} />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryManager initialImages={galleryImages} />
          </TabsContent>
        </Tabs>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-[#FFD700]/20 md:hidden z-50">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => setActiveTab("menu")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "menu" ? "text-[#FFD700]" : "text-gray-400"
            }`}
          >
            <UtensilsCrossed className="h-5 w-5" />
            <span className="text-xs font-medium">Menú</span>
          </button>

          <button
            onClick={() => setActiveTab("categories")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "categories" ? "text-[#FFD700]" : "text-gray-400"
            }`}
          >
            <FolderOpen className="h-5 w-5" />
            <span className="text-xs font-medium">Categorías</span>
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "gallery" ? "text-[#FFD700]" : "text-gray-400"
            }`}
          >
            <ImageIcon className="h-5 w-5" />
            <span className="text-xs font-medium">Galería</span>
          </button>

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex flex-col items-center justify-center gap-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs font-medium">Salir</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
