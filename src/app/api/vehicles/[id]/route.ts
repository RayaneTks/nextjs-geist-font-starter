import { NextRequest } from 'next/server'
import { successResponse, errorResponse, corsHeaders, handleAuth } from '../../config'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const vehicle = await db.getVehicles({ id: parseInt(params.id) })
    if (!vehicle) {
      return errorResponse('Véhicule non trouvé', 404)
    }
    return successResponse(vehicle)
  } catch (error) {
    console.error('Error fetching vehicle:', error)
    return errorResponse('Erreur lors de la récupération du véhicule')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Vérifier l'authentification
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const json = await request.json()
    const { name, description, dailyPrice, category, status } = json

    const vehicle = await db.updateVehicle(parseInt(params.id), {
      name,
      description,
      dailyPrice: dailyPrice ? parseFloat(dailyPrice) : undefined,
      category,
      status,
    })

    return successResponse(vehicle)
  } catch (error) {
    console.error('Error updating vehicle:', error)
    return errorResponse('Erreur lors de la mise à jour du véhicule')
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Vérifier l'authentification
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    await db.deleteVehicle(parseInt(params.id))
    return successResponse({ message: 'Véhicule supprimé avec succès' })
  } catch (error) {
    console.error('Error deleting vehicle:', error)
    return errorResponse('Erreur lors de la suppression du véhicule')
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
