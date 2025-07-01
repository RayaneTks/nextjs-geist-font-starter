import { PrismaClient } from '@prisma/client'
import { hash, compare } from 'bcryptjs'

const prisma = new PrismaClient()

export const db = {
  // User management
  async createUser(username: string, password: string, email: string) {
    const hashedPassword = await hash(password, 10)
    return prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    })
  },

  async validateUser(username: string, password: string) {
    const user = await prisma.user.findUnique({ where: { username } })
    if (!user) return null
    const isValid = await compare(password, user.password)
    return isValid ? user : null
  },

  // Vehicle management
  async createVehicle(data: {
    name: string
    description: string
    dailyPrice: number
    category: string
  }) {
    return prisma.vehicle.create({
      data: {
        ...data,
        dailyPrice: data.dailyPrice,
      },
    })
  },

  async updateVehicle(id: number, data: {
    name?: string
    description?: string
    dailyPrice?: number
    category?: string
    status?: string
  }) {
    return prisma.vehicle.update({
      where: { id },
      data,
    })
  },

  async deleteVehicle(id: number) {
    return prisma.vehicle.delete({
      where: { id },
    })
  },

  async getVehicles(params?: {
    id?: number
    status?: string
    category?: string
    available?: boolean
  }) {
    if (params?.id) {
      return prisma.vehicle.findUnique({
        where: { id: params.id },
        include: {
          images: true,
        }
      })
    }
    
    return prisma.vehicle.findMany({
      where: {
        status: params?.status,
        category: params?.category,
      },
      include: {
        images: true,
      },
    })
  },

  // Reservation management
  async createReservation(data: {
    vehicleId: number
    clientName: string
    clientEmail: string
    clientPhone: string
    startDate: Date
    endDate: Date
    message?: string
  }) {
    return prisma.reservation.create({
      data,
    })
  },

  async updateReservationStatus(id: number, status: string) {
    return prisma.reservation.update({
      where: { id },
      data: { status },
      include: {
        vehicle: true
      }
    })
  },

  async deleteReservation(id: number) {
    return prisma.reservation.delete({
      where: { id }
    })
  },

  async createUnavailablePeriod(data: {
    vehicleId: number
    startDate: Date
    endDate: Date
    reason: string
  }) {
    return prisma.unavailablePeriod.create({
      data
    })
  },

  async getReservations(params?: {
    id?: number
    status?: string
    vehicleId?: number
  }) {
    if (params?.id) {
      return prisma.reservation.findUnique({
        where: { id: params.id },
        include: {
          vehicle: true
        }
      })
    }
    return prisma.reservation.findMany({
      where: {
        status: params?.status,
        vehicleId: params?.vehicleId,
      },
      include: {
        vehicle: true,
      },
    })
  },

  // Image management
  async addVehicleImage(vehicleId: number, path: string, isPrimary: boolean = false) {
    return prisma.image.create({
      data: {
        vehicleId,
        path,
        isPrimary,
      },
    })
  },

  async getVehicleImage(id: number) {
    return prisma.image.findUnique({
      where: { id }
    })
  },

  async deleteVehicleImage(id: number) {
    return prisma.image.delete({
      where: { id },
    })
  },

  async setPrimaryImage(id: number, vehicleId: number) {
    // Reset all images to non-primary
    await prisma.image.updateMany({
      where: { vehicleId },
      data: { isPrimary: false },
    })
    
    // Set the selected image as primary
    return prisma.image.update({
      where: { id },
      data: { isPrimary: true },
    })
  },

  // Testimonials
  async addTestimonial(data: {
    clientName: string
    rating: number
    comment: string
  }) {
    return prisma.testimonial.create({
      data,
    })
  },

  async getVisibleTestimonials() {
    return prisma.testimonial.findMany({
      where: { isVisible: true },
      orderBy: { createdAt: 'desc' },
    })
  },

  async updateTestimonialVisibility(id: number, isVisible: boolean) {
    return prisma.testimonial.update({
      where: { id },
      data: { isVisible }
    })
  },

  async deleteTestimonial(id: number) {
    return prisma.testimonial.delete({
      where: { id }
    })
  },

  // FAQ
  async getFAQs() {
    return prisma.faq.findMany({
      where: { isVisible: true },
      orderBy: { orderIndex: 'asc' },
    })
  },

  async createFAQ(data: {
    question: string
    answer: string
    orderIndex?: number
  }) {
    return prisma.faq.create({
      data: {
        ...data,
        orderIndex: data.orderIndex || 0
      }
    })
  },

  async updateFAQ(id: number, data: {
    question?: string
    answer?: string
    orderIndex?: number
    isVisible?: boolean
  }) {
    return prisma.faq.update({
      where: { id },
      data
    })
  },

  async deleteFAQ(id: number) {
    return prisma.faq.delete({
      where: { id }
    })
  },
}

export default db
