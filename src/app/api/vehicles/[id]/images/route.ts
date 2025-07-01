import { NextRequest } from 'next/server'
import { successResponse, errorResponse, corsHeaders, handleAuth } from '../../../config'
import { db } from '@/lib/db'
import { imageUtils } from '@/lib/images'
import { mkdir } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'public/uploads'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Vérifier l'authentification
  const authError = await handleAuth(request)
  if (authError) return authError

  try {
    const formData = await request.formData()
    const file = formData.get('image') as File
    const isPrimary = formData.get('isPrimary') === 'true'

    if (!file) {
      return errorResponse('Aucune image fournie')
    }

    // Vérifier si le véhicule existe
    const vehicle = await db.getVehicles({ id: parseInt(params.id) })
    if (!vehicle) {
      return errorResponse('Véhicule non trouvé', 404)
    }

    // Convertir le File en Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Valider et optimiser l'image
    try {
      imageUtils.validateImage({ 
        buffer,
        mimetype: file.type,
        size: file.size
      } as Express.Multer.File)
    } catch (error) {
      return errorResponse((error as Error).message)
    }

    // Créer le dossier d'upload si nécessaire
    const vehicleUploadDir = path.join(UPLOAD_DIR, params.id)
    await mkdir(vehicleUploadDir, { recursive: true })

    // Générer un nom de fichier unique
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`
    const filePath = path.join(vehicleUploadDir, filename)

    // Sauvegarder et optimiser l'image
    const { path: savedPath, thumbPath } = await imageUtils.saveImage({
      buffer,
      originalname: file.name,
      mimetype: file.type,
      size: file.size
    } as Express.Multer.File, parseInt(params.id))

    // Enregistrer l'image dans la base de données
    const image = await db.addVehicleImage(
      parseInt(params.id),
      savedPath.replace('public', ''),
      isPrimary
    )

    return successResponse(image, 201)
  } catch (error) {
    console.error('Error uploading image:', error)
    return errorResponse('Erreur lors de l\'upload de l\'image')
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
    const searchParams = request.nextUrl.searchParams
    const imageId = searchParams.get('imageId')

    if (!imageId) {
      return errorResponse('ID de l\'image requis')
    }

    // Récupérer l'image
    const image = await db.getVehicleImage(parseInt(imageId))
    if (!image || image.vehicleId !== parseInt(params.id)) {
      return errorResponse('Image non trouvée', 404)
    }

    // Supprimer le fichier
    await imageUtils.deleteImage(image.path)

    // Supprimer l'entrée de la base de données
    await db.deleteVehicleImage(parseInt(imageId))

    return successResponse({ message: 'Image supprimée avec succès' })
  } catch (error) {
    console.error('Error deleting image:', error)
    return errorResponse('Erreur lors de la suppression de l\'image')
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
