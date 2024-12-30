import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {


  const navigate = useNavigate()

  //end ride function while click finish button
  async function endRide() {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
          rideId: props.rideData._id
      }, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })

      if (response.status === 200) {
          navigate('/captain-home')
      }

  }




  return (
    <div>
    {/* icon */}
    <h5
      className="p-1 absolute top-0 text-center w-[93%]"
      onClick={() => props.setFinishRidePanel(false)}
    >
      <i className=" text-3xl  text-gray-200 ri-arrow-down-wide-line"></i>
    </h5>

    <h3 className="text-2xl font-semibold mb-5">Finish This Ride</h3>

    <div className="flex items-center justify-between mt-4 p-4 border-2 border-yellow-400 rounded-lg">
      <div className="flex items-center gap-3">
          <img className="w-12 h-12 object-cover rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPTZdVhettUOgL4gulcQCozdbr2gvz4nOcQ&s" alt="" />
          <h2 className="text-lg font-medium">{props.rideData?.user.fullname.firstname}</h2>
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
            {props.rideData?.pickup}
            </p>
          </div>
        </div>

        <div className="flex  items-center gap-5 p-3 border-b-2">
          <i className="ri-map-pin-user-fill text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-sm -mt-1 text-gray-600">
            {props.rideData?.destination}
            </p>
          </div>
        </div>

        <div className="flex  items-center gap-5 p-3 ">
          <i className="ri-currency-line text-lg"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.rideData?.fare}</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
          </div>
        </div>
      </div>

     <div className='mt-10 w-full'>
         <button onClick={endRide}
        className="w-full flex justify-center mt-5 bg-green-600 text-white text-lg rounded-lg font-semibold p-3"
          >
        Finish Ride
      </button>
     </div>
    </div>
  </div>
  )
}

export default FinishRide