import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'public/uploads'
const MAX_WIDTH = 1920
const MAX_HEIGHT = 1080
const THUMB_WIDTH = 300
const THUMB_HEIGHT = 200
const QUALITY = 80

export const imageUtils = {
  async saveImage(file: Express.Multer.File, vehicleId: number): Promise<{ path: string; thumbPath: string }> {
    // Create upload directory if it doesn't exist
    const vehicleDir = path.join(UPLOAD_DIR, vehicleId.toString())
    await fs.mkdir(vehicleDir, { recursive: true })

    // Generate unique filename
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}`
    const fullPath = path.join(vehicleDir, `${filename}.jpg`)
    const thumbPath = path.join(vehicleDir, `${filename}-thumb.jpg`)

    // Process and save main image
    await sharp(file.buffer)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: QUALITY })
      .toFile(fullPath)

    // Create thumbnail
    await sharp(file.buffer)
      .resize(THUMB_WIDTH, THUMB_HEIGHT, {
        fit: 'cover'
      })
      .jpeg({ quality: QUALITY })
      .toFile(thumbPath)

    // Return relative paths for database storage
    return {
      path: fullPath.replace('public/', '/'),
      thumbPath: thumbPath.replace('public/', '/')
    }
  },

  async deleteImage(imagePath: string): Promise<void> {
    const fullPath = path.join('public', imagePath)
    const thumbPath = fullPath.replace('.jpg', '-thumb.jpg')

    try {
      await fs.unlink(fullPath)
      await fs.unlink(thumbPath)

      // Check if directory is empty and remove it
      const dir = path.dirname(fullPath)
      const files = await fs.readdir(dir)
      if (files.length === 0) {
        await fs.rmdir(dir)
      }
    } catch (error) {
      console.error('Error deleting image:', error)
      throw error
    }
  },

  validateImage(file: Express.Multer.File): boolean {
    const MAX_SIZE = parseInt(process.env.MAX_FILE_SIZE || '5242880', 10) // 5MB default
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      throw new Error('Type de fichier non autorisé. Utilisez JPG, PNG ou WebP.')
    }

    if (file.size > MAX_SIZE) {
      throw new Error(`La taille du fichier dépasse la limite de ${MAX_SIZE / 1024 / 1024}MB.`)
    }

    return true
  },

  async optimizeImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .resize(MAX_WIDTH, MAX_HEIGHT, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: QUALITY })
      .toBuffer()
  }
}

export default imageUtils
