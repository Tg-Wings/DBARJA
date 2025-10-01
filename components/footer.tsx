import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Phone, MapPin, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-[#FFD700]/20 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-4 flex flex-col items-center sm:items-start">
            <Image src="/logo.png" alt="Logo" width={100} height={100} className="object-contain" />
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              Sabor que deja huella. La mejor pollería y chifa de la ciudad.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div className="text-center sm:text-left">
            <h3 className="text-[#FFD700] font-bold mb-3 sm:mb-4 text-sm sm:text-base">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/inicio"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors text-xs sm:text-sm"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-400 hover:text-[#FFD700] transition-colors text-xs sm:text-sm">
                  Menú
                </Link>
              </li>
              <li>
                <Link
                  href="/galeria"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors text-xs sm:text-sm"
                >
                  Galería
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors text-xs sm:text-sm"
                >
                  Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="text-gray-400 hover:text-[#FFD700] transition-colors text-xs sm:text-sm"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="text-center sm:text-left">
            <h3 className="text-[#FFD700] font-bold mb-3 sm:mb-4 text-sm sm:text-base">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 justify-center sm:justify-start">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-400">Av. Principal 123, Lima, Perú</span>
              </li>
              <li className="flex items-center space-x-2 justify-center sm:justify-start">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFD700]" />
                <span className="text-xs sm:text-sm text-gray-400">+51 999 999 999</span>
              </li>
              <li className="flex items-start space-x-2 justify-center sm:justify-start">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-gray-400">Lun - Dom: 11:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div className="text-center sm:text-left">
            <h3 className="text-[#FFD700] font-bold mb-3 sm:mb-4 text-sm sm:text-base">Síguenos</h3>
            <div className="flex space-x-4 justify-center sm:justify-start">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFD700]/10 p-2 sm:p-3 rounded-full hover:bg-[#FFD700]/20 transition-colors"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFD700]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FFD700]/10 p-2 sm:p-3 rounded-full hover:bg-[#FFD700]/20 transition-colors"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 text-[#FFD700]" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FFD700]/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Pollería - Chifa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
