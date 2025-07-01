import { NextRequest } from 'next/server'
import { successResponse, errorResponse, corsHeaders } from '../../config'
import { db } from '@/lib/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'
const TOKEN_EXPIRY = '24h'

export async function POST(request: NextRequest) {
  try {
    const json = await request.json()
    const { username, password } = json

    if (!username || !password) {
      return errorResponse('Nom d\'utilisateur et mot de passe requis')
    }

    const user = await db.validateUser(username, password)
    if (!user) {
      return errorResponse('Identifiants invalides', 401)
    }

    // Générer le token JWT
    const token = jwt.sign(
      { 
        id: user.id,
        username: user.username,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    )

    // Retourner le token avec les informations de l'utilisateur
    return successResponse({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Error during login:', error)
    return errorResponse('Erreur lors de la connexion')
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}
