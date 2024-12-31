// import React, { useContext, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { CaptainDataContext } from '../context/CaptainContext'

// const CaptainLogin = () => {

//       const [email, setEmail] = useState("")
//       const [password, setPassword] = useState("")
//       const {captain, setCaptain}=useContext(CaptainDataContext)
//       const navigate=useNavigate()
  
//     const submitHandler =async (e) => {  
//       e.preventDefault()
//       const captain={
//         email: email,
//         password: password
//       }
//       //api call
//       const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`,captain)
//       if(response.status===200){
//         const data=response.data
//         setCaptain(data)
//         localStorage.setItem('token', data.token)
//         navigate('/captain-home')
//       }

//       setEmail("")
//       setPassword("")
//     }
//   return (
//     <div className='p-7 flex flex-col justify-between h-screen'>
//       <div>
//       <img className='w-20 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" />
//       <form onSubmit={submitHandler}>
//         <h3 className='text-lg font-medium mb-2'>What's your email</h3>
//         <input 
//         type="email" 
//         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         required 
//         placeholder='email@example.com' 

//         />
//         <h3 className='text-lg font-medium mb-2'>Enter password</h3>
//         <input 
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
//         placeholder='password' 
//         required
//         />
//         <button className='bg-[#111] text-white text-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Login</button>
//       </form>
//       <p className='text-center'>Join a fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link> </p>
//       </div>
//       <div>
//       <Link to={'/login'} className='bg-[#d5622d] flex justify-center items-center text-white text-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Sign in as user</Link>
//       </div>
//     </div>
//   )
// }

// export default CaptainLogin


import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate inputs before submitting
  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const captain = {
      email: email,
      password: password,
    };

    try {
      // API call
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
      if (response.status === 200) {
        const data = response.data;
        setCaptain(data);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      // Display API error
      setErrors({ apiError: error.response?.data?.message || 'Login failed. Please try again.' });
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="logo"
        />
        <form onSubmit={submitHandler}>
          {/* Email Input */}
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            className={`bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          {/* Password Input */}
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="password"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}

          {/* API Error Message */}
          {errors.apiError && <p className="text-red-500 text-sm mt-3">{errors.apiError}</p>}

          {/* Login Button */}
          <button
            className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center">
          Join a fleet?{' '}
          <Link to="/captain-signup" className="text-blue-600">
            Register as a Captain
          </Link>
        </p>
      </div>

      {/* Sign in as User Button */}
      <div>
        <Link
          to={'/login'}
          className="bg-[#d5622d] flex justify-center items-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as user
        </Link>
      </div>
    </div>
  );
};

export default CaptainLogin;

