"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createMenuItem(data: {
  category_id: string
  name: string
  description: string
  price: number
  image_url: string
  is_available: boolean
}) {
  const supabase = await createClient()

  const { error } = await supabase.from("menu_items").insert(data)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/menu")
  return { success: true }
}

export async function updateMenuItem(
  id: string,
  data: Partial<{
    category_id: string
    name: string
    description: string
    price: number
    image_url: string
    is_available: boolean
  }>,
) {
  const supabase = await createClient()

  const { error } = await supabase.from("menu_items").update(data).eq("id", id)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/menu")
  return { success: true }
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("menu_items").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/menu")
  return { success: true }
}
