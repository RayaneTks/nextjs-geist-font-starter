import { NextRequest } from 'next/server'
import { successResponse, errorResponse, corsHeaders, handleAuth } from '../config'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  // Vérifier l'authentification pour l'accès admin
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const vehicleId = searchParams.get('vehicleId')

    const reservations = await db.getReservations({
      status: status || undefined,
      vehicleId: vehicleId ? parseInt(vehicleId) : undefined
    })

    return successResponse(reservations)
  } catch (error) {
    console.error('Error fetching reservations:', error)
    return errorResponse('Erreur lors de la récupération des réservations')
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { vehicleId, clientName, clientEmail, clientPhone, startDate, endDate, message } = json

    // Validation de base
    if (!vehicleId || !clientName || !clientEmail || !clientPhone || !startDate || !endDate) {
      return errorResponse('Tous les champs requis doivent être remplis')
    }

    // Validation des dates
    const start = new Date(startDate)
    const end = new Date(endDate)
    const now = new Date()

    if (start < now) {
      return errorResponse('La date de début doit être future')
    }

    if (end <= start) {
      return errorResponse('La date de fin doit être postérieure à la date de début')
    }

    // Vérifier la disponibilité du véhicule
    const vehicle = await db.getVehicles({ id: parseInt(vehicleId) })
    if (!vehicle) {
      return errorResponse('Véhicule non trouvé')
    }

    if (vehicle.status !== 'available') {
      return errorResponse('Ce véhicule n\'est pas disponible actuellement')
    }

    // Créer la réservation
    const reservation = await db.createReservation({
      vehicleId: parseInt(vehicleId),
      clientName,
      clientEmail,
      clientPhone,
      startDate: start,
      endDate: end,
      message
    })

    return successResponse(reservation, 201)
  } catch (error) {
    console.error('Error creating reservation:', error)
    return errorResponse('Erreur lors de la création de la réservation')
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
