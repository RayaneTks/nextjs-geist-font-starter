import { NextRequest } from 'next/server'
import { successResponse, errorResponse, corsHeaders, handleAuth } from '../config'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const testimonials = await db.getVisibleTestimonials()
    return successResponse(testimonials)
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return errorResponse('Erreur lors de la récupération des témoignages')
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { clientName, rating, comment } = json

    // Validation de base
    if (!clientName || !rating || !comment) {
      return errorResponse('Tous les champs sont requis')
    }

    // Validation du rating
    const ratingNum = parseInt(rating)
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return errorResponse('La note doit être comprise entre 1 et 5')
    }

    const testimonial = await db.addTestimonial({
      clientName,
      rating: ratingNum,
      comment
    })

    return successResponse(testimonial, 201)
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return errorResponse('Erreur lors de la création du témoignage')
  }
}

export async function PUT(request: NextRequest) {
  // Vérifier l'authentification pour la modification admin
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const json = await request.json()
    const { id, isVisible } = json

    if (typeof id !== 'number' || typeof isVisible !== 'boolean') {
      return errorResponse('Paramètres invalides')
    }

    const testimonial = await db.updateTestimonialVisibility(id, isVisible)
    return successResponse(testimonial)
  } catch (error) {
    console.error('Error updating testimonial:', error)
    return errorResponse('Erreur lors de la mise à jour du témoignage')
  }
}

export async function DELETE(request: NextRequest) {
  // Vérifier l'authentification pour la suppression admin
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return errorResponse('ID du témoignage requis')
    }

    await db.deleteTestimonial(parseInt(id))
    return successResponse({ message: 'Témoignage supprimé avec succès' })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    return errorResponse('Erreur lors de la suppression du témoignage')
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
