import React, { useContext } from 'react'
import {CaptainDataContext }from '../context/CaptainContext'

const CaptainDetails = () => {

  const {captain}=useContext(CaptainDataContext)
  console.log("captain details" ,captain);
  

  return (
    <div>
         <div className='flex items-center justify-between'>
          <div className='flex items-center justify-start gap-4'>
            <img className='w-10 h-10 rounded-full object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPTZdVhettUOgL4gulcQCozdbr2gvz4nOcQ&s" alt="" />
            <h4 className='text-lg font-medium'>{captain?.fullname.firstname}</h4>
          </div>
          <div>
            <h4 className='text-xl font-semibold'>&#8377;295.29</h4>
            <p className='text-sm text-gray-600'>Earned</p>
          </div>
        </div>

        <div className='p-3 mt-8 bg-gray-100 rounded-xl flex items-start justify-between gap-4'>
          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className='text-lg font-normal'>10.2</h5>
          <p className='text-sm text-gray-600 '>Hours Online</p>
          </div>

          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className='text-lg font-normal'>10.2</h5>
          <p className='text-sm text-gray-600 '>Hours Online</p>
          </div>

          <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className='text-lg font-normal'>10.2</h5>
          <p className='text-sm text-gray-600 '>Hours Online</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails