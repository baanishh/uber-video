import React from 'react'


const ConfirmRide = (props) => {
  return (
    <div>
       {/* icon */}
       <h5 className='p-1 absolute top-0 text-center w-[93%]' onClick={()=>props.setConfirmedRidePanel(false)}><i className=" text-3xl  text-gray-200 ri-arrow-down-wide-line"></i></h5>
       
       <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

      <div className='flex flex-col justify-between items-center gap-2'>
        <img className='h-20' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />

        <div className='w-full mt-5'>
            <div className='flex  items-center gap-5 p-3 border-b-2'>
             <i className="ri-map-pin-fill text-lg "></i>
             <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{props.pickup}</p>
             </div>
            </div>

            <div className='flex  items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill text-lg"></i>
             <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                <p className='text-sm -mt-1 text-gray-600'>{props.destination}</p>
             </div>
            </div>

            <div className='flex  items-center gap-5 p-3 '>
            <i className="ri-currency-line text-lg"></i>
             <div>
                <h3 className='text-lg font-medium'>₹{props.fareData[props.vehicleType]}</h3>
                <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
             </div>
            </div>
        </div>
        <button onClick={()=>{
          props.setVehicleFound(true)
          props.setConfirmedRidePanel(false)
          props.setVehiclePanel(false)
          props.createRide()
        }} className='w-full mt-5 bg-green-600 text-white rounded-lg font-semibold p-2'>Confirm</button>
      </div>

    </div>
  )
}

export default ConfirmRide