"use client"

import { useState } from 'react'

interface Reservation {
  id: number
  clientName: string
  vehicle: string
  startDate: string
  endDate: string
  status: 'pending' | 'approved' | 'rejected'
}

interface Vehicle {
  id: number
  name: string
  status: 'available' | 'reserved' | 'maintenance'
}

export default function Dashboard() {
  const [reservations] = useState<Reservation[]>([
    {
      id: 1,
      clientName: "Jean Dupont",
      vehicle: "Mercedes-Benz Classe S",
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      status: "pending"
    },
    // Exemple de réservation
  ])

  const [vehicles] = useState<Vehicle[]>([
    {
      id: 1,
      name: "Mercedes-Benz Classe S",
      status: "available"
    },
    // Exemple de véhicule
  ])

  const handleReservationStatus = (id: number, status: 'approved' | 'rejected') => {
    // TODO: Implement status update logic
    console.log(`Reservation ${id} ${status}`)
  }

  const handleVehicleStatus = (id: number, status: 'available' | 'reserved' | 'maintenance') => {
    // TODO: Implement status update logic
    console.log(`Vehicle ${id} status changed to ${status}`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tableau de Bord</h1>
        
        {/* Réservations */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Réservations en attente</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Véhicule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reservation.vehicle}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {reservation.startDate} - {reservation.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          reservation.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          'bg-red-100 text-red-800'}`}>
                        {reservation.status === 'pending' ? 'En attente' : 
                         reservation.status === 'approved' ? 'Approuvée' : 'Refusée'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleReservationStatus(reservation.id, 'approved')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Approuver
                      </button>
                      <button
                        onClick={() => handleReservationStatus(reservation.id, 'rejected')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Refuser
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Véhicules */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Gestion des Véhicules</h2>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Ajouter un véhicule
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Véhicule</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{vehicle.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={vehicle.status}
                        onChange={(e) => handleVehicleStatus(vehicle.id, e.target.value as any)}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                      >
                        <option value="available">Disponible</option>
                        <option value="reserved">Réservé</option>
                        <option value="maintenance">En maintenance</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-purple-600 hover:text-purple-900">Modifier</button>
                      <button className="text-red-600 hover:text-red-900">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
