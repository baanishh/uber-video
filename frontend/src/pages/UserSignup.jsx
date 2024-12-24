import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios' 
import { UserDataContext } from '../context/userContext'

const UserSignup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  //context data
  const {user,setUser}=useContext(UserDataContext)
  const navigate=useNavigate()

  const submitHandler=async(e)=>{
    e.preventDefault()
    const newUser={
      fullname:{
        firstname:firstName,
        lastname:lastName
      },
      email:email,
      password:password
    }

    //api call
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
    if(response.status===201){
      const data=response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
      navigate('/home')
    }

    setEmail("")
    setFirstName("")
    setLastName('')
    setPassword('')
  }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
    <div>
    <img className='w-16 mb-10' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png" alt="logo" />
    <form onSubmit={submitHandler}>

      <h3 className='text-base font-medium mb-2'>What's your name</h3>
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

      <h3 className='text-base font-medium mb-2'>What's your email</h3>
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
      <button className='bg-[#111] text-white text-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Create account</button>
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

export default UserSignup