import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar';

const Client = () => {

  const {id} = useParams();

  const [clientid,setClientid] = useState("")
  const [client,setClient] = useState([])
  
  const getsingleclient = async() => {
    setClientid(id);  
    const response = await fetch(`https://aarogyapath.onrender.com/admin/single/${id}`)
    const res = await response.json()
    if(response.ok){
      setClient(res)
    }
  }

  useEffect(()=>{
    getsingleclient();
  },[])

  return (
    <>
    <Navbar />
    <div className="w-full pl-[5%] h-[100%] bg-gray-200 p-6">

      {client.length === 0 ? (
        <p className="text-gray-700">No Clients</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {client.map((client) => (
            <div
              key={client._id}
              className={`
                cursor-pointer bg-white rounded-xl shadow-lg p-5 transition-all duration-300 "z-50 bg-white scale-108 sm:scale-100 border-l-4 border-red-500"
              `}
              onClick={()=>{nav(`/client/${client._id}`)}}
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{client.name}</h2>
                <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {client.gender}
                </span>
              </div>

              <p><b>email:</b> {client.email}</p>
              <p><b>Phone no:</b> {client.phone}</p>
              <p><b>age:</b> {client.age}</p>
              <p><b>Profession:</b> {client.proffession}</p>
              <p><b>Height:</b> {client.height}</p>
              <p><b>Weight:</b> {client.weight}</p>
              <p><b>Address:</b> {client.address}</p>

            </div>
          ))}
        </div>
      )}
    </div>
    </>
    
  )
}

export default Client
