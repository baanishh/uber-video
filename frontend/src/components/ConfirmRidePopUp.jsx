import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const navigate=useNavigate()
  const [otp, setOtp] = useState('')

  //submit handler
  const submitHandler =async (e) => {
    e.preventDefault()
    console.log('ride OTP',otp);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
      params: {
          rideId: props.ride._id,
          otp: otp
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })

  if (response.status === 200) {
      props.setConfirmRidePopUpPanel(false)
      props.setRidePopUpPanel(false)
      navigate('/captain-riding',{state:{ride:props.ride}})
  }

  }

  return (
    <div>
    {/* icon */}
    <h5
      className="p-1 absolute top-0 text-center w-[93%]"
      onClick={() => props.setConfirmRidePopUpPanel(false)}
    >
      <i className=" text-3xl  text-gray-200 ri-arrow-down-wide-line"></i>
    </h5>

    <h3 className="text-2xl font-semibold mb-5">Confirm This Ride To Start</h3>

    <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
      <div className="flex items-center gap-3">
          <img className="w-12 h-12 object-cover rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPTZdVhettUOgL4gulcQCozdbr2gvz4nOcQ&s" alt="" />
          <h2 className="text-lg font-medium capitalize">{props.ride?.user.fullname.firstname}</h2>
      </div>
      <h5 className="text-lg font-semibold">2.2 KM</h5>
    </div>

    <div className="flex flex-col justify-between items-center gap-2">
      <div className="w-full mt-5">
        <div className="flex  items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-fill text-lg "></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.pickup}
            </p>
          </div>
        </div>

        <div className="flex  items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
            {props.ride?.destination}
            </p>
          </div>
        </div>

        <div className="flex  items-center gap-5 p-3 ">
          <i className="ri-currency-line text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">₹ {props.ride?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>
      </div>

     <div className='mt-6 w-full'>

    <form onSubmit={submitHandler}>
      <input 
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      type="text" 
      placeholder='Enter Your OTP'
       className='bg-[#eee] px-6 py-4 font-mono text-base rounded-lg w-full mt-3' 
      />
    <button type='submit' className="w-full flex justify-center mt-5 bg-green-600 text-white rounded-lg font-semibold p-3 text-lg"
      >
        Confirm
      </button>

      <button onClick={()=>{
        props.setConfirmRidePopUpPanel(false),
        props.setRidePopUpPanel(false)
      }
        } className="w-full mt-1 bg-red-600 text-white rounded-lg font-semibold p-3 text-lg">
        Cancel
      </button>
    </form>

     </div>
    </div>
  </div>
  )
}

export default ConfirmRidePopUp