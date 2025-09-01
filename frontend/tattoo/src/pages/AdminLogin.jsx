import React from 'react'

const AdminLogin = () => {
  return (
  <div className="flex justify-center items-center h-screen bg-gray-900">
    {/* Card container */}
    <div className="bg-red-700/90 noise w-[400px] p-8 rounded-2xl shadow-lg flex flex-col items-center text-white">
      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 font-['Inknut_Antiqua']">
        Admin Login
      </h1>

      {/* Inputs */}
      <div className="flex flex-col gap-4 w-full">
        <input 
          type="text" 
          placeholder="Username" 
          className="p-3 rounded-md bg-red-800/60 border focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-200 text-white"
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="p-3 rounded-md bg-red-800/60 border focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-200 text-white"
        />
      </div>

      {/* Button */}
      <button className="mt-8 bg-white text-red-700 font-bold px-6 py-2 rounded-md hover:bg-gray-200 transition">
        Login
      </button>
    </div>
  </div>

  )
}

export default AdminLogin