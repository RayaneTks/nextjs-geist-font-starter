import { NextRequest } from 'next/server'
import { successResponse, errorResponse, corsHeaders, handleAuth } from '../../config'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Vérifier l'authentification
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const reservation = await db.getReservations({ id: parseInt(params.id) })
    if (!reservation) {
      return errorResponse('Réservation non trouvée', 404)
    }
    return successResponse(reservation)
  } catch (error) {
    console.error('Error fetching reservation:', error)
    return errorResponse('Erreur lors de la récupération de la réservation')
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
    const { status } = json

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return errorResponse('Statut invalide')
    }

    const reservation = await db.updateReservationStatus(parseInt(params.id), status)

    // Si la réservation est approuvée, marquer le véhicule comme indisponible pour cette période
    if (status === 'approved') {
      await db.createUnavailablePeriod({
        vehicleId: reservation.vehicleId,
        startDate: reservation.startDate,
        endDate: reservation.endDate,
        reason: 'reservation'
      })
    }

    // Envoyer un email au client (à implémenter)
    // await sendReservationStatusEmail(reservation.clientEmail, status)

    return successResponse(reservation)
  } catch (error) {
    console.error('Error updating reservation:', error)
    return errorResponse('Erreur lors de la mise à jour de la réservation')
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
    const reservation = await db.deleteReservation(parseInt(params.id))
    return successResponse({ message: 'Réservation supprimée avec succès' })
  } catch (error) {
    console.error('Error deleting reservation:', error)
    return errorResponse('Erreur lors de la suppression de la réservation')
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
