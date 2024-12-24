import React, { useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingforDriver';


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')

  const panelRef=useRef(null)
  const vehiclePanelRef=useRef(null)
  const confirmedRidePanelRef=useRef(null)
  const vehicleFoundRef=useRef(null)
  const waitingForDriverRef=useRef(null)  
  const panelClose = useRef(null)

  const [openPanel, setOpenPanel] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault()
    console.log(pickup, destination);
  }

  //gsap animation for search panel up
  useGSAP(function(){
    if(openPanel){
      gsap.to(panelRef.current, {height: '70%', duration: 0.5, padding:25})
      gsap.to(panelClose.current, {opacity:1})
    }else{
      gsap.to(panelRef.current, {height: '0%', duration: 0.5, padding:0})
      gsap.to(panelClose.current, {opacity:0})
    }
  },[openPanel])

  //gsap animation for vehicle panel up
  useGSAP(function(){
   if(vehiclePanel){
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(0)'
    })
   }else{
    gsap.to(vehiclePanelRef.current,{
      transform:'translateY(100%)'
    })
   }
  },[vehiclePanel])

  //gspa animation for confirmed vehicle panel up
  useGSAP(function(){
    if(confirmedRidePanel){
     gsap.to(confirmedRidePanelRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(confirmedRidePanelRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[confirmedRidePanel])

   //looking for driver panel
   useGSAP(function(){
    if(vehicleFound){
     gsap.to(vehicleFoundRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(vehicleFoundRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[vehicleFound])

   //waiting for driver panel
   useGSAP(function(){
    if(waitingForDriver){
     gsap.to(waitingForDriverRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(waitingForDriverRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[waitingForDriver])


  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />

      {/* main image pannel */}
      <div  className='h-screen w-screen'>
        {/* image for temporary */}
        <img className='w-full h-screen object-cover ' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
       
       {/* location search panel  */}
      <div className='flex flex-col justify-end absolute w-full h-screen top-0'>
        <div className='h-[30%] p-6 bg-white relative'>
          {/* icon */}
          <h5 ref={panelClose} onClick={()=>setOpenPanel(false)} className='absolute top-6 right-6 text-2xl opacity-0'>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler}>
            <div className='line h-16 w-1 bg-gray-700 absolute top-[45%] left-10 rounded-full'></div>
          <input 
          onClick={() => setOpenPanel(true)}
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" 
          placeholder='Add you pick-up location' />

          <input 
          onClick={() => setOpenPanel(true)}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'  type="text" 
          placeholder='Enter your destination' />
          </form>
        </div>
        {/* this div will get height 70% when openPanel is true then only true */}
        <div className='h-0 bg-white ' ref={panelRef}> 
            <LocationSearchPannel  setOpenPanel={setOpenPanel} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>

      {/* vehicle options div */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 py-10 px-3 bg-white translate-y-full pt-12'>
        <VehiclePanel setVehiclePanel={setVehiclePanel} setConfirmedRidePanel={setConfirmedRidePanel} />
      </div>

      {/* confirmed vehicle panel */}
      <div ref={confirmedRidePanelRef} className='fixed w-full z-10 bottom-0 py-6 px-3 bg-white translate-y-full pt-12'>
        <ConfirmRide  setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound={setVehicleFound} setVehiclePanel={setVehiclePanel}/>
      </div>

      {/* looking for driver panel */}
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 py-6 px-3 bg-white translate-y-full pt-12'>
        <LookingForDriver setVehicleFound={setVehicleFound}/>
      </div>

      {/* waiting for driver */}
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 py-6 px-3 bg-white  pt-12'>
        <WaitingForDriver setWaitingForDriver={setWaitingForDriver} />
      </div>


    </div>
  )
}

export default Home