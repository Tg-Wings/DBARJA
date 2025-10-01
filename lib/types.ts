export interface Category {
  id: string
  name: string
  description: string | null
  order_index: number
  created_at: string
}

export interface MenuItem {
  id: string
  category_id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  is_available: boolean
  created_at: string
}

export interface GalleryImage {
  id: string
  image_url: string
  title: string | null
  description: string | null
  created_at: string
}

export interface Admin {
  id: string
  username: string
  password: string
  created_at: string
}
