
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { captain, setCaptain } = useContext(CaptainDataContext);

  // Password Regex for Strong Password
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?]).{8,}$/;

  // Validation
  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    // First Name Validation
    if (firstName.trim().length < 3) {
      newErrors.firstName = 'First name must be at least 3 characters.';
      isValid = false;
    }

    // Last Name Validation
    if (lastName.trim().length < 3) {
      newErrors.lastName = 'Last name must be at least 3 characters.';
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    // Password Validation
    if (!passwordRegex.test(password)) {
      newErrors.password =
        'Password must be at least 8 characters, with one uppercase letter, one number, and one special character.';
      isValid = false;
    }

    // Vehicle Type Validation
    if (!vehicleType) {
      newErrors.vehicleType = 'Vehicle type is required.';
      isValid = false;
    }

    // Vehicle Plate Validation
    if (!vehiclePlate.trim()) {
      newErrors.vehiclePlate = 'Vehicle plate number is required.';
      isValid = false;
    }

    // Vehicle Color Validation
    if (!vehicleColor.trim()) {
      newErrors.vehicleColor = 'Vehicle color is required.';
      isValid = false;
    }

    // Vehicle Capacity Validation
    if (!vehicleCapacity || isNaN(vehicleCapacity) || Number(vehicleCapacity) <= 0) {
      newErrors.vehicleCapacity = 'Capacity must be a positive number.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        vehicleType: vehicleType,
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
      },
    };

    try {
      setIsLoading(true);

      // API call
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = await response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token);
        navigate('/captain-home');
      }
    } catch (error) {
      setErrors({
        apiError: error.response?.data?.message || 'Registration failed. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-5 sm:p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 sm:w-20 mb-2"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="logo"
        />
        <form onSubmit={submitHandler} className="space-y-5">
          {/* First Name and Last Name in the same row */}
          <div className="flex gap-2">
            <div className="w-full">
              <input
                type="text"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="w-full">
              <input
                type="text"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Vehicle Type and Vehicle Plate in the same row */}
          <h4>Vehicle Details</h4>
          <div className="flex gap-2">
            <div className="w-full sm:w-1/2">
              <select
                className="bg-[#eeeeee] rounded px-2 py-2 border w-full text-base"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="">Select Vehicle Type</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Moto</option>
                <option value="car">Car</option>
              </select>
              {errors.vehicleType && <p className="text-red-500 text-xs mt-1">{errors.vehicleType}</p>}
            </div>
            <div className="w-full sm:w-1/2">
              <input
                type="text"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                placeholder="Vehicle Plate Number"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
              {errors.vehiclePlate && <p className="text-red-500 text-xs mt-1">{errors.vehiclePlate}</p>}
            </div>
          </div>

          {/* Vehicle Color and Vehicle Capacity in the same row */}
          <div className="flex gap-2">
            <div className="w-full sm:w-1/2">
              <input
                type="text"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              {errors.vehicleColor && <p className="text-red-500 text-xs mt-1">{errors.vehicleColor}</p>}
            </div>
            <div className="w-full sm:w-1/2">
              <input
                type="number"
                className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
              {errors.vehicleCapacity && <p className="text-red-500 text-xs mt-1">{errors.vehicleCapacity}</p>}
            </div>
          </div>

          {errors.apiError && <p className="text-red-500 text-sm">{errors.apiError}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white rounded w-full py-2 hover:bg-gray-800 transition duration-200"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already have an account?{' '}
          <Link to="/captain-login" className="font-semibold text-black">
            Login here
          </Link>
        </p>
      </div>
      <p className="text-xs text-[#555] mt-10 text-center">
        By signing up you agree to our{' '}
        <a href="#" className="font-semibold text-black">
          Terms of Use
        </a>{' '}
        and{' '}
        <a href="#" className="font-semibold text-black">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default CaptainSignup;



