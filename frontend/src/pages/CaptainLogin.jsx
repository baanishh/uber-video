import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainLogin = () => {
   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
   const [captainData, setCaptainData] = useState({})
  
    const submitHandler = (e) => {  
      e.preventDefault()
      setCaptainData({
        email: email,
        password: password
      })
      setEmail("")
      setPassword("")
    }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
      <img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />
      <form onSubmit={submitHandler}>
        <h3 className='text-lg font-medium mb-2'>What's your email</h3>
        <input 
        type="email" 
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required 
        placeholder='email@example.com' 

        />
        <h3 className='text-lg font-medium mb-2'>Enter password</h3>
        <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
        placeholder='password' 
        required
        />
        <button className='bg-[#111] text-white text-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Login</button>
      </form>
      <p className='text-center'>Join a fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link> </p>
      </div>
      <div>
      <Link to={'/login'} className='bg-[#d5622d] flex justify-center items-center text-white text-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Sign in as user</Link>
      </div>
    </div>
  )
}

export default CaptainLogin