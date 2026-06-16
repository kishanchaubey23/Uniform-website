'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addProduct(formData: FormData) {
  const supabase = await createClient()

  // For this local dev project logic, any authenticated user can act as admin per the demo setup
  const { data: { session } } = await supabase.auth.getSession()
  
  const rawSizes = formData.get('sizes') as string
  const rawDetails = formData.get('details') as string

  const newProduct = {
    id: formData.get('id') as string || `prod-${Date.now()}`,
    name: formData.get('name') as string,
    category: formData.get('category') as string,
    price: parseFloat(formData.get('price') as string),
    description: formData.get('description') as string,
    image: formData.get('image') as string,
    badge: formData.get('badge') as string || null,
    stock: parseInt(formData.get('stock') as string) || 0,
    sold: 0,
    returns: 0,
    exchanged: 0,
    sizes: rawSizes ? JSON.parse(rawSizes) : [],
    details: rawDetails ? JSON.parse(rawDetails) : []
  }

  const { error } = await supabase.from('products').insert([newProduct])
  
  if (error) {
    console.error('Error adding product:', error)
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/products')
  return { success: true }
}

export async function updateProductInventory(id: string, updates: any) {
  const supabase = await createClient()
  
  const { error } = await supabase.from('products').update(updates).eq('id', id)
  
  if (error) return { error: error.message }
  
  revalidatePath('/admin')
  return { success: true }
}

export async function addSchool(formData: FormData) {
  const supabase = await createClient()

  const newSchool = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    image: formData.get('image') as string
  }

  const { error } = await supabase.from('schools').insert([newSchool])
  
  if (error) {
    console.error('Error adding school:', error)
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}

export async function removeProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)
  
  if (error) {
    console.error('Error removing product:', error)
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/products')
  return { success: true }
}

export async function removeSchool(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('schools').delete().eq('id', id)
  
  if (error) {
    console.error('Error removing school:', error)
    return { error: error.message }
  }

  revalidatePath('/admin')
  return { success: true }
}
