import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MenuDisplay } from "@/components/menu-display"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0

export default async function MenuPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("categories").select("*").order("order_index", { ascending: true })

  const { data: menuItems } = await supabase.from("menu_items").select("*").order("created_at", { ascending: true })

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16 sm:pt-20 md:pt-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFD700] mb-3 sm:mb-4">Nuestro Menú</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">Descubre nuestros deliciosos platos</p>
          </div>
          <MenuDisplay categories={categories || []} menuItems={menuItems || []} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
