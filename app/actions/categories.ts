"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createCategory(data: { name: string; description: string; order_index: number }) {
  const supabase = await createClient()

  const { error } = await supabase.from("categories").insert(data)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/menu")
  return { success: true }
}

export async function updateCategory(id: string, data: { name: string; description: string; order_index: number }) {
  const supabase = await createClient()

  const { error } = await supabase.from("categories").update(data).eq("id", id)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/menu")
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) throw error

  revalidatePath("/admin")
  revalidatePath("/menu")
  return { success: true }
}
