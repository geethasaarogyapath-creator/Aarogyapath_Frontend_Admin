import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar';

const Clients = () => {

  const [clients, setClients] = useState([])
  const nav = useNavigate();

  const getClients = async () => {
    try {
      const response = await fetch('https://aarogyapath.onrender.com/admin/getclients')
      const res = await response.json()
      if (response.ok) {
        setClients(Array.isArray(res) ? res : [])
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getClients()
  }, [])

  const sortedClients = [...clients].sort((a, b) => {
    return (a.isvisited === true) - (b.isvisited === true)
  })

  return (
    <>
    <Navbar />
    <div className="w-full pl-[5%] h-full bg-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Clients</h1>

      {sortedClients.length === 0 ? (
        <p className="text-gray-700">No Clients</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {sortedClients.map((client) => (
            <div
              key={client._id}
              className={`
                cursor-pointer bg-white rounded-xl shadow-lg p-5 transition-all duration-300
                ${client.isvisited === false
                  ? "z-50 bg-white scale-108 sm:scale-100 border-l-4 border-red-500"
                  : "z-0 opacity-50 border-l-4 border-green-500"}
              `}
              onClick={()=>{nav(`/client/${client._id}`)}}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{client.name}</h2>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {client.gender}
                </span>
              </div>

              <p><b>Profession:</b> {client.proffession}</p>
              <p><b>Height:</b> {client.height}</p>
              <p><b>Weight:</b> {client.weight}</p>

            </div>
          ))}
        </div>
      )}
    </div>
    </>
    
  )
}

export default Clients
