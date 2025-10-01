"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function LoadingPage() {
  const [progress, setProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simular carga progresiva
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setShowWelcome(true), 500)
          return 100
        }
        return prev + 2
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (showWelcome) {
      // Después de mostrar bienvenida, redirigir al inicio
      const timer = setTimeout(() => {
        router.push("/inicio")
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showWelcome, router])

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center space-y-8 animate-fade-in">
          <Image src="/logo.png" alt="D'Barja Logo" width={300} height={300} className="mx-auto" priority />
          <h1 className="text-4xl md:text-6xl font-bold text-[#FFD700] animate-pulse">Bienvenidos a D&apos;Barja</h1>
          <p className="text-xl md:text-2xl text-white">Sabor que deja huella</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8">
        <Image src="/logo.png" alt="D'Barja Logo" width={250} height={250} className="mx-auto animate-pulse" priority />
        <div className="w-64 md:w-96 mx-auto space-y-4">
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF4500] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[#FFD700] text-lg font-semibold">{progress}%</p>
        </div>
      </div>
    </div>
  )
}
