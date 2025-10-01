import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Mail, Facebook, Instagram } from "lucide-react"

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-16 sm:pt-20 md:pt-24">
        <div className="container mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#FFD700] mb-3 sm:mb-4">Contáctanos</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">Estamos aquí para servirte</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {/* Información de Contacto */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="bg-zinc-900 border-[#FFD700]/20">
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-4 sm:space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Información de Contacto</h2>

                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                        <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Dirección</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">Av. Principal 123, Lima, Perú</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Teléfono</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">+51 999 999 999</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Email</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">contacto@dbarja.com</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD700]/10 flex items-center justify-center">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1 text-sm sm:text-base">Horario de Atención</h3>
                        <p className="text-gray-400 text-xs sm:text-sm">Lunes a Domingo</p>
                        <p className="text-gray-400 text-xs sm:text-sm">11:00 AM - 11:00 PM</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Redes Sociales */}
              <Card className="bg-zinc-900 border-[#FFD700]/20">
                <CardContent className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Síguenos en Redes Sociales</h2>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 transition-colors p-3 sm:p-4 rounded-lg flex-1"
                    >
                      <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                      <span className="text-white font-medium text-sm sm:text-base">Facebook</span>
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 transition-colors p-3 sm:p-4 rounded-lg flex-1"
                    >
                      <Instagram className="h-5 w-5 sm:h-6 sm:w-6 text-[#FFD700]" />
                      <span className="text-white font-medium text-sm sm:text-base">Instagram</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mapa */}
            <Card className="bg-zinc-900 border-[#FFD700]/20">
              <CardContent className="p-4 sm:p-5 md:p-6 space-y-3 sm:space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#FFD700]">Encuéntranos</h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3076890830936!2d-77.04283668461!3d-12.046373991456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8b5d35662c7%3A0x14206cb9cc452e4a!2sLima%2C%20Peru!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Estamos ubicados en una zona céntrica y de fácil acceso. Te esperamos!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
