// import React, { useContext, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { UserDataContext } from '../context/userContext'
// import axios from 'axios'

// const UserLogin = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [userDetails, setUserDetails] = useState({})

//   //context data
//   const {user, setUser}=useContext(UserDataContext)
//   const navigate=useNavigate()

//   const submitHandler =async (e) => {  
//     e.preventDefault()
//     const userData={
//       email: email,
//       password: password
//     }

//     //api call
//     const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
//     if(response.status===200){
//       const data=response.data
//       setUser(data)
//       localStorage.setItem('token',data.token)
//       navigate('/home')
//     }

//     setEmail("")
//     setPassword("")
//   }

//   return (
//     <div className='p-7 flex flex-col justify-between h-screen'>
//       <div>
//       <img className='w-16 mb-10' src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png" alt="logo" />
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
//       <p className='text-center'>New here? <Link to="/signup" className='text-blue-600'>Create new account</Link> </p>
//       </div>
//       <div>
//       <Link to={'/captain-login'} className='bg-[#10b461] flex justify-center items-center text-white text-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base' type="submit">Sign in as Captain</Link>
//       </div>
//     </div>
//   )
// }

// export default UserLogin

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Context data
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  // Validate inputs
  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format.';
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const userData = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);

      // API call
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        localStorage.setItem('token', data.token);
        navigate('/home');
      }
    } catch (error) {
      setErrors({
        apiError: error.response?.data?.message || 'Login failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://1000logos.net/wp-content/uploads/2021/04/Uber-logo.png"
          alt="logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@example.com"
            aria-label="Email"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
            aria-label="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}

          {errors.apiError && (
            <p className="text-red-500 text-sm mb-4">{errors.apiError}</p>
          )}

          <button
            className="bg-[#111] text-white text-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="text-center">
          New here?{' '}
          <Link to="/signup" className="text-blue-600">
            Create new account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to={'/captain-login'}
          className="bg-[#10b461] flex justify-center items-center text-white text-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
