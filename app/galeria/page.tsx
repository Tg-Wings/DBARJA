import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GalleryGrid } from "@/components/gallery-grid"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 0

export default async function GaleriaPage() {
  const supabase = await createClient()

  const { data: images } = await supabase.from("gallery_images").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16 sm:pt-20 md:pt-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFD700] mb-3 sm:mb-4">Galería</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              Descubre nuestros deliciosos platos en imágenes
            </p>
          </div>
          <GalleryGrid images={images || []} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
