import { NextRequest } from 'next/server'
import { successResponse, errorResponse, corsHeaders } from '../config'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get('status')
    const category = searchParams.get('category')

    const vehicles = await db.getVehicles({
      status: status || undefined,
      category: category || undefined,
    })

    return successResponse(vehicles)
  } catch (error) {
    console.error('Error fetching vehicles:', error)
    return errorResponse('Erreur lors de la récupération des véhicules')
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { name, description, dailyPrice, category } = json

    if (!name || !description || !dailyPrice || !category) {
      return errorResponse('Tous les champs sont requis')
    }

    const vehicle = await db.createVehicle({
      name,
      description,
      dailyPrice: parseFloat(dailyPrice),
      category,
    })

    return successResponse(vehicle, 201)
  } catch (error) {
    console.error('Error creating vehicle:', error)
    return errorResponse('Erreur lors de la création du véhicule')
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
