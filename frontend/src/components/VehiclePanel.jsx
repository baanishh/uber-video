import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
        {/* icon */}
        <h5 className='p-1 absolute top-0 text-center w-[93%]' onClick={()=>props.setVehiclePanel(false)}><i className=" text-3xl  text-gray-200 ri-arrow-down-wide-line"></i></h5>

        <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

        {/* car */}
        <div onClick={()=>props.setConfirmedRidePanel(true)} className='flex border-2 active:border-black border-xl rounded-xl w-full p-3  items-center justify-between mb-2'>
          <img className='h-14' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
        <div className='w-1/2 ml-2'>
          <h4 className='font-medium text-base '>UberGo <span><i className="ri-user-fill"></i>4</span></h4>
          <h5 className='font-medium text-sm'>2 min away</h5>
          <p className='font-normal text-xs text-gray-500'>Affordable, compact rides</p>
        </div>
        <h2 className='text-xl font-semibold'>&#8377;193.20</h2>
      </div>

      {/* bike */}
      <div onClick={()=>props.setConfirmedRidePanel(true)} className='flex border-2 active:border-black border-xl rounded-xl w-full p-3  items-center justify-between mb-2'>
          <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
        <div className='w-1/2 ml-5'>
          <h4 className='font-medium text-base '>Moto <span><i className="ri-user-fill"></i>1</span></h4>
          <h5 className='font-medium text-sm'>3 min away</h5>
          <p className='font-normal text-xs text-gray-500'>Affordable, motorcycle rides</p>
        </div>
        <h2 className='text-xl font-semibold'>&#8377;65</h2>
      </div>

       {/* auto */}
       <div onClick={()=>props.setConfirmedRidePanel(true)} className='flex border-2 active:border-black border-xl rounded-xl w-full p-3  items-center justify-between mb-2'>
          <img className='h-14' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
        <div className='w-1/2 ml-5'>
          <h4 className='font-medium text-base '>UberAuto <span><i className="ri-user-fill"></i>3</span></h4>
          <h5 className='font-medium text-sm'>3 min away</h5>
          <p className='font-normal text-xs text-gray-500'>Affordable, Auto rides</p>
        </div>
        <h2 className='text-xl font-semibold'>&#8377;118.80</h2>
      </div>

    </div>
  )
}

export default VehiclePanel