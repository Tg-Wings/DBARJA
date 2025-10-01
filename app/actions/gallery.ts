"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createGalleryImage(data: { image_url: string; title: string; description: string }) {
  const supabase = await createClient()

  const { error } = await supabase.from("gallery_images").insert(data)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/galeria")
  return { success: true }
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("gallery_images").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/galeria")
  return { success: true }
}
