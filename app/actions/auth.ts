"use server"

import { cookies } from "next/headers"
import { createClient } from "@/lib/supabase/server"

export async function loginAdmin(username: string, password: string) {
  try {
    const supabase = await createClient()

    // Verificar credenciales en la tabla admins
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("username", username)
      .eq("password", password)
      .single()

    if (error || !admin) {
      return { success: false, error: "Credenciales incorrectas" }
    }

    // Establecer cookie de autenticación
    const cookieStore = await cookies()
    cookieStore.set("admin_authenticated", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 horas
    })

    return { success: true }
  } catch (error) {
    return { success: false, error: "Error al iniciar sesión" }
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_authenticated")
  return { success: true }
}
