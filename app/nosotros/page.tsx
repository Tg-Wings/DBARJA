import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Award, Users } from "lucide-react"
import Image from "next/image"

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16 sm:pt-20 md:pt-24">
        {/* Hero Section */}
        <div className="relative h-[250px] sm:h-[350px] md:h-[400px] overflow-hidden">
          <Image
            src="/restaurante-polleria-interior-moderno.jpg"
            alt="D'Barja Interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3 sm:space-y-4 px-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFD700]">Sobre Nosotros</h1>
              <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl">
                Más de 10 años sirviendo sabor y tradición
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 md:py-16 space-y-12 sm:space-y-16">
          {/* Historia */}
          <section className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFD700]">Nuestra Historia</h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              D&apos;Barja nació de la pasión por la gastronomía peruana y china. Desde nuestros inicios, nos hemos
              dedicado a ofrecer los mejores pollos a la brasa y platos de chifa, combinando recetas tradicionales con
              ingredientes de primera calidad. Cada plato que servimos lleva el sello de nuestra dedicación y amor por
              la cocina.
            </p>
          </section>

          {/* Misión y Visión */}
          <section className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="bg-zinc-900 border-[#FFD700]/20">
              <CardContent className="p-5 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#FFD700]/10">
                  <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#FFD700]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Nuestra Misión</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Brindar a nuestros clientes una experiencia gastronómica excepcional, ofreciendo platos de alta
                  calidad que fusionan la tradición peruana y china, con un servicio cálido y profesional que supere sus
                  expectativas.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-[#FFD700]/20">
              <CardContent className="p-5 sm:p-6 md:p-8 space-y-3 sm:space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#FFD700]/10">
                  <Eye className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#FFD700]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Nuestra Visión</h3>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  Ser reconocidos como la pollería-chifa líder en la región, destacando por nuestra calidad, innovación
                  y compromiso con la satisfacción del cliente, expandiendo nuestra presencia mientras mantenemos la
                  esencia de nuestros sabores tradicionales.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Valores */}
          <section className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#FFD700]">Nuestros Valores</h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="bg-zinc-900 border-[#FFD700]/20 text-center">
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700]/10">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Calidad</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Ingredientes frescos y de primera</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-[#FFD700]/20 text-center">
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700]/10">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Servicio</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Atención cálida y profesional</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-[#FFD700]/20 text-center">
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700]/10">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Compromiso</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Dedicación en cada plato</p>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-[#FFD700]/20 text-center">
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-2 sm:space-y-3">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700]/10">
                    <Eye className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white">Tradición</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">Recetas auténticas y probadas</p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
