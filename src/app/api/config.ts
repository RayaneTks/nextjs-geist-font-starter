import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this-in-production'

export function errorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status })
}

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status })
}

export async function isAuthenticated(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1]
  
  if (!token) {
    return false
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return !!decoded
  } catch (error) {
    return false
  }
}

export async function handleAuth(request: NextRequest) {
  const isAuth = await isAuthenticated(request)
  if (!isAuth) {
    return errorResponse('Non autorisé', 401)
  }
  return null
}

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function handleOptions() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}
