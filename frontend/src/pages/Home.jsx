import React, { useContext, useEffect, useRef, useState } from 'react'
import {useGSAP} from '@gsap/react'
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPannel from '../components/LocationSearchPannel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { getSuggestions, getFareEstimate } from '../services/api';
import axios from 'axios';
import {SocketContext} from '../context/SocketContext'
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const navigate=useNavigate()

  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const [activeInput, setActiveInput] = useState(null); // 'pickup' or 'destination'
  const [fareData, setFareData] = useState({});

  const panelRef=useRef(null)
  const vehiclePanelRef=useRef(null)
  const confirmedRidePanelRef=useRef(null)
  const vehicleFoundRef=useRef(null)
  const waitingForDriverRef=useRef(null)  
  const panelClose = useRef(null)
  const buttonRef=useRef(null)

  const [openPanel, setOpenPanel] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmedRidePanel, setConfirmedRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide]=useState(null)

  const {socket }=useContext(SocketContext)// socket context
  const {user}=useContext(UserDataContext) //user context

  //socket connection used to send user data to backend
  useEffect(()=>{
    socket.emit("join",{userId:user?._id, userType:"user"})
  },[user])

 //getting confirmation from driver through socket
 socket.on('ride-confirmed',ride=>{
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
 })
 console.log("ride confirm",ride);
 
 //start ride
socket.on("ride-started",ride=>{
  setWaitingForDriver(false)
  navigate('/riding',{state:{ride}})
})


  const submitHandler = (e) => {
    e.preventDefault()
    console.log(pickup, destination);
  }

  //handle onchange value
  const handleInputChange = async (value, type) => {
    if (type === 'pickup') {
      setPickup(value);
    } else {
      setDestination(value);
    }
    setActiveInput(type);

    if (value.length > 2) {
      try {
        const results = await getSuggestions(value);
        setSuggestions(results);
      } catch (error) {
        console.error('Error:', error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  //function onclick suggestions
  const handleSuggestionClick =async (suggestion) => {
    if (activeInput === 'pickup') {
      setPickup(suggestion);
    } else {
      setDestination(suggestion);
    }
    setSuggestions([]);
    if (pickup && destination) {
      await calculateFare();
      setVehiclePanel(true);
      setOpenPanel(false);
      // setPickup('')
      // setDestination('')
    }
  };

  //calculating fare function
  const calculateFare = async () => {
    try {
      const fare = await getFareEstimate(pickup, destination);
      setFareData(fare);
      console.log("fare",fare);
    } catch (error) {
      console.error('Error calculating fare:', error);
    }
  };

  //gsap animation for search panel up
  useGSAP(function(){
    if(openPanel){
      gsap.to(panelRef.current, {height: '70%', duration: 0.5, padding:25})
      gsap.to(panelClose.current, {opacity:1})
      gsap.to(buttonRef.current,{opacity:1})//button
    }else{
      gsap.to(panelRef.current, {height: '0%', duration: 0.5, padding:0})
      gsap.to(panelClose.current, {opacity:0})
      gsap.to(buttonRef.current,{opacity:0})//button
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


   //handle click button funtion
  const handleFindTrip = async (e) => {
    e.preventDefault();
    if (pickup && destination) {
    await calculateFare();
      setOpenPanel(false);
      setVehiclePanel(true);
    }
  };
  
  //create ride function
 const createRide = async () => {
  try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
          pickup,
          destination,
          vehicleType
      }, 
      {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Error creating ride:', error);
      throw error;
  }
};


  

  return (
    <div className='relative h-screen overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />

      {/* main image pannel */}
      <div  className='h-screen w-screen'>
        {/* image for temporary */}
        {/* <img className='w-full h-screen object-cover ' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" /> */}
        <LiveTracking/>
      </div>
       
       {/* location search panel  */}
      <div className='flex flex-col justify-end absolute w-full h-screen top-0  z-10 '>
        <div className='h-[30%] p-6 bg-white relative z-10'>
          {/* icon */}
          <h5 ref={panelClose} onClick={()=>setOpenPanel(false)} className='absolute top-6 right-6 text-2xl opacity-0'>
          <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>
          <form onSubmit={submitHandler} className='relative'>
            <div className='line h-16 w-1 bg-gray-700 absolute top-[20%] left-5 rounded-full'></div>
          <input 
          onClick={() => {
            setOpenPanel(true);
            setActiveInput('pickup');
          }}
          value={pickup}
          onChange={(e) => handleInputChange(e.target.value, 'pickup')}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" 
          placeholder='Add your pick-up location' />

          <input 
          onClick={() => {
            setOpenPanel(true);
            setActiveInput('destination');
          }}
          value={destination}
          onChange={(e) => handleInputChange(e.target.value, 'destination')}
          className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3'  type="text" 
          placeholder='Enter your destination' />

          {/* button - find trip */}
          <button ref={buttonRef} onClick={handleFindTrip} className="bg-black text-white w-full py-3 rounded-lg mt-3 font-medium">
            Find Trip
          </button>

          </form>
        </div>
        {/* this div will get height 70% when openPanel is true then only true */}
        <div className='h-0 bg-white ' ref={panelRef}> 
            <LocationSearchPannel 
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              setOpenPanel={setOpenPanel} 
              setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>

      {/* vehicle options div */}
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 py-10 px-3 bg-white translate-y-full pt-12'>
        <VehiclePanel 
        setVehicleType={setVehicleType}
          fareData={fareData}
          setVehiclePanel={setVehiclePanel} 
          setConfirmedRidePanel={setConfirmedRidePanel} 
        />
      </div>

      {/* confirmed vehicle panel */}
      <div ref={confirmedRidePanelRef} className='fixed w-full z-10 bottom-0 py-6 px-3 bg-white translate-y-full pt-12'>
        <ConfirmRide
        createRide={createRide}
        pickup={pickup}
        destination={destination}
        fareData={fareData}
        vehicleType={vehicleType}
        setConfirmedRidePanel={setConfirmedRidePanel}
         setVehicleFound={setVehicleFound}
          setVehiclePanel={setVehiclePanel}/>
      </div>

      {/* looking for driver panel */}
      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 py-6 px-3 bg-white translate-y-full pt-12'>
        <LookingForDriver 
         createRide={createRide}
         pickup={pickup}
         destination={destination}
         fareData={fareData}
         vehicleType={vehicleType}
        setVehicleFound={setVehicleFound}/>
      </div>

      {/* waiting for driver */}
      <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 py-6 px-3 bg-white  pt-12'>
        <WaitingForDriver 
        ride={ride}
        setVehicleFound={setVehicleFound}
        setWaitingForDriver={setWaitingForDriver}
        waitingForDriver={waitingForDriver} />
      </div>


    </div>
  )
}

export default Home