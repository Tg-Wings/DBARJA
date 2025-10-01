import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json({ error: "URL de imagen requerida" }, { status: 400 })
    }

    console.log("[v0] Procesando imagen con remove.bg:", imageUrl)

    const imageResponse = await fetch(imageUrl)
    if (!imageResponse.ok) {
      console.error("[v0] Error al descargar imagen:", imageResponse.status)
      return NextResponse.json({ error: "No se pudo descargar la imagen" }, { status: 400 })
    }

    const imageBlob = await imageResponse.blob()

    const formData = new FormData()
    formData.append("image_file", imageBlob)
    formData.append("size", "preview") // Tamaño preview para ahorrar créditos

    console.log("[v0] Enviando a remove.bg API...")

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": "Z7GGEhsBbpJDR3cF4yJUDB6y",
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("[v0] Error de remove.bg:", error)
      return NextResponse.json({ error: "Error al procesar la imagen" }, { status: response.status })
    }

    console.log("[v0] Imagen procesada exitosamente")

    // Convertir la respuesta a blob y luego a base64
    const blob = await response.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64 = buffer.toString("base64")
    const dataUrl = `data:image/png;base64,${base64}`

    return NextResponse.json({ processedImageUrl: dataUrl })
  } catch (error) {
    console.error("[v0] Error en remove-bg:", error)
    return NextResponse.json({ error: "Error al procesar la imagen" }, { status: 500 })
  }
}
