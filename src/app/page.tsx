"use client"

import { useState } from 'react'

export default function Home() {
  const [formData, setFormData] = useState({
    pickupDate: '',
    returnDate: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - in real app would send to backend
    console.log(formData)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/6894427/pexels-photo-6894427.jpeg')"
          }}
        ></div>
        <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Location de Voitures<br />de Luxe à Marseille
          </h1>
          <p className="text-xl mb-12 text-gray-200">
            Découvrez notre flotte de véhicules haut de gamme et profitez d&apos;un service premium dans toute la région PACA
          </p>
          <div className="flex items-center justify-center space-x-6">
            <a 
              href="#reservation"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Réserver maintenant
            </a>
            <a 
              href="#vehicles"
              className="border-2 border-white text-white px-8 py-3.5 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-900 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Voir les véhicules
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pourquoi Choisir DD RENTAL CAR ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous vous offrons une expérience de location premium avec des services personnalisés pour répondre à tous vos besoins
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Service Premium</h3>
              <p className="text-gray-600">Une expérience de location haut de gamme avec un service sur mesure et une attention aux détails</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Livraison PACA</h3>
              <p className="text-gray-600">Service de livraison et récupération de votre véhicule dans toute la région PACA</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Disponibilité 24/7</h3>
              <p className="text-gray-600">Service client disponible à tout moment via WhatsApp pour une assistance immédiate</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sécurité Garantie</h3>
              <p className="text-gray-600">Véhicules régulièrement entretenus et assurance complète pour votre tranquillité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Catalog Section */}
      <section id="vehicles" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Flotte de Véhicules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample vehicles - would be dynamic in real app */}
            {[
              {
                id: 1,
                name: 'Mercedes-Benz Classe S',
                image: 'https://images.pexels.com/photos/892522/pexels-photo-892522.jpeg',
                description: 'Berline de luxe, confort exceptionnel, idéale pour vos déplacements professionnels'
              },
              {
                id: 2,
                name: 'BMW X7',
                image: 'https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg',
                description: 'SUV haut de gamme, spacieux et élégant, parfait pour les voyages en famille'
              },
              {
                id: 3,
                name: 'Porsche 911',
                image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg',
                description: 'Voiture de sport emblématique, performances exceptionnelles'
              },
              {
                id: 4,
                name: 'Range Rover Sport',
                image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg',
                description: 'SUV de luxe, alliance parfaite entre confort et capacités tout-terrain'
              },
              {
                id: 5,
                name: 'Audi RS e-tron GT',
                image: 'https://images.pexels.com/photos/17898774/pexels-photo-17898774.jpeg',
                description: 'Berline électrique sportive, performance et écologie'
              },
              {
                id: 6,
                name: 'Mercedes-AMG GT',
                image: 'https://images.pexels.com/photos/8134647/pexels-photo-8134647.jpeg',
                description: 'Coupé sport, design époustouflant et performances de haut niveau'
              }
            ].map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-lg shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
                  <p className="text-gray-600 mb-4">{vehicle.description}</p>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-700 transition-colors font-medium">
                    Réserver
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="reservation" className="py-24 bg-gradient-to-br from-purple-900 to-purple-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Réserver un Véhicule</h2>
            <p className="text-purple-100 text-lg">
              Remplissez le formulaire ci-dessous et nous vous contacterons dans les plus brefs délais
            </p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-2xl p-8 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  value={formData.pickupDate}
                  onChange={(e) => setFormData({...formData, pickupDate: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                  value={formData.returnDate}
                  onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
                  required
                />
              </div>
            </div>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Téléphone
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all resize-none"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transform transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              Envoyer la demande
            </button>
          </form>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Contactez-nous</h2>
          <p className="text-xl mb-8">Pour toute question ou demande spécifique, contactez-nous sur WhatsApp</p>
          <a
            href="https://wa.me/33663187902"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-green-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-600"
          >
            <span>WhatsApp 06 63 18 79 02</span>
          </a>
        </div>
      </section>
    </div>
  )
}
