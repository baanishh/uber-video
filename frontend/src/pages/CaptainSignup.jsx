import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/userContext'

const CaptainSignup = () => {
  
  const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
      
  
    const submitHandler=(e)=>{
      e.preventDefault()
      setUserData({
        fullName:{
          firstName:firstName,
          lastName:lastName
        },
        email:email,
        password:password
      })
      setEmail("")
      setFirstName("")
      setLastName('')
      setPassword('')
    }
  
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
    <div>
     <img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />
    <form onSubmit={submitHandler}>

      <h3 className='text-base font-medium mb-2'>What's our Captain's name</h3>
      <div className='flex gap-4 mb-6'>
        <input 
          type="text" 
          className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
          required 
          placeholder='First Name' 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            type="text" 
            className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
            required 
            placeholder='Last Name' 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
      </div>

      <h3 className='text-base font-medium mb-2'>What's our Captain's email</h3>
      <input 
      type="email" 
      className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
      required 
      placeholder='email@example.com' 
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      />

      <h3 className='text-base font-medium mb-2'>Enter password</h3>
      <input 
      type="password"
      className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm' 
      placeholder='password' 
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />
      <button className='bg-[#111] text-white text-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Sign Up</button>
    </form>
    <p className='text-center'>Already have an account? <Link to="/login" className='text-blue-600'>Login here</Link> </p>
    </div>
    <div>
    <p className='text-[10px] leading-tight'>
      By proceeding, I agree to Uber's <a href="#" className='underline'>Terms of Use</a> and acknowledge that I have read the <a href="#" className='underline'>Privacy Policy</a>.
    </p>
    </div>
  </div>
  )
}

export default CaptainSignup