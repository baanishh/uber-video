import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'



const CaptainSignup = () => {
  
    const navigate=useNavigate()
  
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //vehicle info
    const [vehicleType, setVehicleType] = useState('')
    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
      
    const {captain, setCaptain}=useContext(CaptainDataContext) 

    //handle function
    const submitHandler=async(e)=>{
      e.preventDefault()
       const captainData={
        fullname:{
          firstname:firstName,
          lastname:lastName
        },
        email:email,
        password:password,
        vehicle:{
          vehicleType:vehicleType,
          color:vehicleColor,
          plate:vehiclePlate,
          capacity:vehicleCapacity
        }
      }

      //api call
      const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
      if(response.status===201){
        const data=await response.data
        setCaptain(data.captain)
        console.log(captain);
        navigate('/captain-home')
      }

      setEmail("")
      setFirstName("")
      setLastName('')
      setPassword('')
      setVehicleType('')
      setVehicleColor('')
      setVehiclePlate('')
      setVehicleCapacity('')
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
      
      {/* vehicle details */}
    <h3 className='text-base font-medium mb-2'>Vehicle Details</h3>
    <div className='flex gap-4 mb-6'>
      <select 
        className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base'
        required
        value={vehicleType}
        onChange={(e) => setVehicleType(e.target.value)}
      >
        <option value="">Select Vehicle Type</option>
        <option value="auto">Auto</option>
        <option value="motorcycle">Moto</option>
        <option value="car">Car</option>
      </select>
      <input 
        type="text"
        className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
        required
        placeholder='Vehicle Plate Number'
        value={vehiclePlate}
        onChange={(e) => setVehiclePlate(e.target.value)}
      />
    </div>

    <div className='flex gap-4 mb-6'>
      <input 
        type="text"
        className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
        required
        placeholder='Vehicle Color'
        value={vehicleColor}
        onChange={(e) => setVehicleColor(e.target.value)}
      />
      <input 
        type="number"
        className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm'
        required
        placeholder='Vehicle Capacity'
        value={vehicleCapacity}
        onChange={(e) => setVehicleCapacity(e.target.value)}
      />
    </div>
     
           <button className='bg-[#111] text-white text-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Create Captain Account</button>
    </form>
    <p className='text-center'>Already have an account? <Link to="/captain-login" className='text-blue-600'>Login here</Link> </p>
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