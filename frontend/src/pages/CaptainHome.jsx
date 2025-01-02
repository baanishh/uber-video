import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'



const CaptainHome = () => {

  const ridePopUpPanelRef = useRef(null)
  const confirmRidePopUpPanelRef = useRef(null)

  const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const [ride, setRide] = useState(null)
  
  

  const {socket}=useContext(SocketContext)
  const {captain}=useContext(CaptainDataContext)

  //socket connection used to send captain data to backend
  useEffect(()=>{
    //sending socket id to backend
    socket.emit("join",{userId:captain?._id,userType:"captain"})

    //sending live location captain details
    const updateLocation = () => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            
              //sending captain live location coordinates
              socket.emit('update-location-captain', {
                  userId: captain?._id,
                  location: {
                      ltd: position.coords.latitude,
                      lng: position.coords.longitude
                  }
              })
          })
      }
  }
  const locationInterval = setInterval(updateLocation, 10000)
  updateLocation()
  // return () => clearInterval(locationInterval);

  },[])


  //getting new ride info
  socket.on('new-ride',(data)=>{
    console.log("new ride",data);
    setRide(data)
    setRidePopUpPanel(true)
  })
  console.log("ride state",ride);


  // ride popup panel animation
  useGSAP(function(){
    if(ridePopUpPanel){
     gsap.to(ridePopUpPanelRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(ridePopUpPanelRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[ridePopUpPanel])

   // confirm ride popup panel animation
   useGSAP(function(){
    if(confirmRidePopUpPanel){
     gsap.to(confirmRidePopUpPanelRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(confirmRidePopUpPanelRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[confirmRidePopUpPanel])

  

  //  confirm ride function || accept ride
   async function conformRide(){
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      rideId: ride._id,
      captain: captain._id
    }, {
      headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setRidePopUpPanel(false)
    setConfirmRidePopUpPanel(true)
   }


  return (
    <div className="h-screen">

    <div className='fixed p-6 top-0 flex items-center justify-between w-screen'> 
      <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <Link to={'/captain-login'} className="w-10 h-10 bg-white flex items-center justify-center rounded-full">
    <i className="ri-logout-box-r-line text-lg font-medium "></i>
    </Link>
    </div>

      <div className="h-3/5">
        {/* <img
          className="w-full h-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking/>
      </div>
      <div className="h-2/5 p-6 relative z-10 bg-white">
        <CaptainDetails/>
      </div>

      {/* popup notification */}
      <div ref={ridePopUpPanelRef} className='fixed w-full z-20 bottom-0 py-10 px-3 bg-white translate-y-full pt-12'>
        <RidePopUp 
        ride={ride}
        setRidePopUpPanel={setRidePopUpPanel}
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
        conformRide={conformRide}
        />
      </div>
    
      {/* confirm popup panel */}
      <div ref={confirmRidePopUpPanelRef} className='fixed w-full z-20 bottom-0 py-10 px-3 bg-white translate-y-full pt-12 h-screen'>
        <ConfirmRidePopUp 
        ride={ride}
        setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} 
        setRidePopUpPanel={setRidePopUpPanel}
        />
      </div>
          
      
    </div>
  )
}

export default CaptainHome