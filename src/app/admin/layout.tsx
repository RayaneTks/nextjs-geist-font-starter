"use client"

import { Inter } from 'next/font/google'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = () => {
    // Remove the admin token cookie
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT'
    // Redirect to login page
    router.push('/admin/login')
  }

  return (
    <div className={`${inter.className} min-h-screen bg-gray-100`}>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-purple-600">DD RENTAL CAR - Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/admin/vehicles" className="text-gray-700 hover:text-purple-600 transition-colors">Véhicules</a>
              <a href="/admin/reservations" className="text-gray-700 hover:text-purple-600 transition-colors">Réservations</a>
              <button 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 transition-colors font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
