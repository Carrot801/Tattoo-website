import React,{useState} from 'react'

const AdminLogin = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()

    //Basic validation
    if(!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // Call backend API for authentication
      const response = await fetch('https://tattoo-website-3rg5.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })
      
      if(!response.ok) {
        const data = await response.json();
        setError(data.message || 'Login failed');
        return;
      }
      // Redirect to admin dashboard
      window.location.href = '/Tattoo-website/';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
  <div className="flex justify-center items-center h-screen bg-gray-900">
    {/* Card container */}
    <div className="bg-red-700/90 noise w-[350px] sm:w-[400px] p-8 rounded-2xl shadow-lg flex flex-col items-center text-white">      
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 font-['Inknut_Antiqua']">
        Admin Login
      </h1>
      {error && <p className="mb-4 text-red-300">{error}</p>}
      {/* Inputs */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <div  className="flex flex-col gap-4 w-full">
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 rounded-md bg-red-800/60 border focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-200 text-white"
        />
        <input 
          type="password" 
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)} 
          className="p-3 rounded-md bg-red-800/60 border focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-200 text-white"
        />
        </div>
        {/* Button */}
        <button type="submit" disabled={loading} className="mt-8 bg-white text-red-700 font-bold px-6 py-2 rounded-md hover:bg-gray-200 transition">
          Login
        </button>
      </form >


    </div>
  </div>

  )
}

export default AdminLogin