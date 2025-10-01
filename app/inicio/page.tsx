import { Navbar } from "@/components/navbar"
import { HeroCarousel } from "@/components/hero-carousel"
import { Footer } from "@/components/footer"
import { AdminAccessButton } from "@/components/admin-access-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Utensils, Clock, Award, Heart } from "lucide-react"

export default function InicioPage() {
  const features = [
    {
      icon: Utensils,
      title: "Sabor Auténtico",
      description: "Recetas tradicionales con ingredientes de primera calidad",
    },
    {
      icon: Clock,
      title: "Servicio Rápido",
      description: "Tu pedido listo en el menor tiempo posible",
    },
    {
      icon: Award,
      title: "Calidad Garantizada",
      description: "Más de 10 años sirviendo a la comunidad",
    },
    {
      icon: Heart,
      title: "Hecho con Amor",
      description: "Cada plato preparado con dedicación y pasión",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      {/* Hero Carousel */}
      <div className="pt-20">
        <HeroCarousel />
      </div>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#FFD700] mb-12">¿Por Qué Elegirnos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-zinc-900 border-[#FFD700]/20 hover:border-[#FFD700] transition-colors">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFD700]/10">
                    <feature.icon className="h-8 w-8 text-[#FFD700]" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#FFD700]/10 to-[#FF4500]/10">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#FFD700]">¿Listo para disfrutar?</h2>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Descubre nuestro delicioso menú y encuentra tu plato favorito
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[#FFD700] hover:bg-[#FFA500] text-black font-bold">
              <Link href="/menu">Ver Menú</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black bg-transparent"
            >
              <Link href="/contacto">Contáctanos</Link>
            </Button>
          </div>
        </div>
      </section>

      <AdminAccessButton />

      <Footer />
    </div>
  )
}
