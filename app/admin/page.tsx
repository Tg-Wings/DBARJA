import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { AdminDashboard } from "@/components/admin-dashboard"
import { createClient } from "@/lib/supabase/server"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("admin_authenticated")?.value === "true"

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  const supabase = await createClient()

  // Obtener datos para el dashboard
  const { data: categories } = await supabase.from("categories").select("*").order("order_index", { ascending: true })

  const { data: menuItems } = await supabase.from("menu_items").select("*").order("created_at", { ascending: false })

  const { data: galleryImages } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <AdminDashboard categories={categories || []} menuItems={menuItems || []} galleryImages={galleryImages || []} />
  )
}
