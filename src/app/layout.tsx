import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DD RENTAL CAR - Location de voitures de luxe à Marseille',
  description: 'Location de voitures haut de gamme à Marseille et livraison dans toute la région PACA. Service premium, réservation en ligne.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-white`}>
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              <div className="flex items-center">
                <img src="/logo.svg" alt="DD RENTAL CAR" className="h-14 w-auto" />
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#vehicles" className="text-gray-900 hover:text-purple-600 font-medium">Véhicules</a>
                <a href="#services" className="text-gray-900 hover:text-purple-600 font-medium">Services</a>
                <a href="#contact" className="text-gray-900 hover:text-purple-600 font-medium">Contact</a>
                <a href="https://wa.me/33663187902" 
                   className="bg-purple-600 text-white px-6 py-2.5 rounded-md hover:bg-purple-700 transition-colors font-medium"
                   target="_blank"
                   rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </nav>
          </header>
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">DD RENTAL CAR</h3>
                  <p className="text-gray-400">Location de voitures de luxe à Marseille</p>
                  <p className="text-gray-400">Livraison dans toute la région PACA</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <p className="text-gray-400">WhatsApp: 06 63 18 79 02</p>
                  <p className="text-gray-400">Marseille, France</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Services</h3>
                  <ul className="text-gray-400">
                    <li>Location courte durée</li>
                    <li>Location longue durée</li>
                    <li>Livraison à domicile</li>
                    <li>Service premium</li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} DD RENTAL CAR. Tous droits réservés.</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
