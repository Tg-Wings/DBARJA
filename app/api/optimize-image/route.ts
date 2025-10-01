import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import sharp from "sharp"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Optimizar la imagen: redimensionar si es muy grande y comprimir
    const optimizedBuffer = await sharp(buffer)
      .resize(1200, 1200, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85, progressive: true })
      .toBuffer()

    // Subir a Vercel Blob
    const blob = await put(file.name, optimizedBuffer, {
      access: "public",
      addRandomSuffix: true,
      contentType: "image/jpeg",
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("[v0] Error optimizando imagen:", error)
    return NextResponse.json({ error: "Error al optimizar la imagen" }, { status: 500 })
  }
}
