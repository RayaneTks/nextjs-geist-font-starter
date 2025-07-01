import { NextRequest } from 'next/server'
import { successResponse, errorResponse, corsHeaders, handleAuth } from '../config'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const faqs = await db.getFAQs()
    return successResponse(faqs)
  } catch (error) {
    console.error('Error fetching FAQs:', error)
    return errorResponse('Erreur lors de la récupération de la FAQ')
  }
}

export async function POST(request: NextRequest) {
  // Vérifier l'authentification
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const json = await request.json()
    const { question, answer, orderIndex } = json

    if (!question || !answer) {
      return errorResponse('Question et réponse requises')
    }

    const faq = await db.createFAQ({
      question,
      answer,
      orderIndex: orderIndex || 0
    })

    return successResponse(faq, 201)
  } catch (error) {
    console.error('Error creating FAQ:', error)
    return errorResponse('Erreur lors de la création de la FAQ')
  }
}

export async function PUT(request: NextRequest) {
  // Vérifier l'authentification
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const json = await request.json()
    const { id, question, answer, orderIndex, isVisible } = json

    if (!id) {
      return errorResponse('ID de la FAQ requis')
    }

    const faq = await db.updateFAQ(id, {
      question,
      answer,
      orderIndex,
      isVisible
    })

    return successResponse(faq)
  } catch (error) {
    console.error('Error updating FAQ:', error)
    return errorResponse('Erreur lors de la mise à jour de la FAQ')
  }
}

export async function DELETE(request: NextRequest) {
  // Vérifier l'authentification
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return errorResponse('ID de la FAQ requis')
    }

    await db.deleteFAQ(parseInt(id))
    return successResponse({ message: 'FAQ supprimée avec succès' })
  } catch (error) {
    console.error('Error deleting FAQ:', error)
    return errorResponse('Erreur lors de la suppression de la FAQ')
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
