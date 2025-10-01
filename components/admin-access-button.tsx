"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"

export function AdminAccessButton() {
  const [clicks, setClicks] = useState(0)
  const router = useRouter()

  const handleClick = () => {
    const newClicks = clicks + 1
    setClicks(newClicks)

    // Después de 5 clicks, redirigir al login de admin
    if (newClicks >= 5) {
      router.push("/admin/login")
      setClicks(0)
    }

    // Resetear contador después de 3 segundos de inactividad
    setTimeout(() => {
      setClicks(0)
    }, 3000)
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-4 right-4 w-12 h-12 rounded-full bg-transparent hover:bg-zinc-900/50 transition-colors flex items-center justify-center opacity-10 hover:opacity-100"
      aria-label="Acceso administrativo"
    >
      <Lock className="h-5 w-5 text-[#FFD700]" />
    </button>
  )
}
