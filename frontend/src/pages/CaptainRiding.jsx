import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'
import {SocketContext} from '../context/SocketContext'
import PaymentDoneModal from '../components/PaymentDoneModal'

const CaptainRiding = (props) => {
  
  const paymentPopupModalRef = useRef(null)
  const [paymentPanel, setPaymentPanel] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState(null)

  console.log(paymentPanel);
  
const [finishRidePanel, setFinishRidePanel] = useState(false)
const finishRidePanelRef = useRef(null)

const { socket } = useContext(SocketContext);

// taking data passed through ( useNavigate ) from captainHome
const location=useLocation()
const rideData=location.state?.ride


  // payment details
  socket.on('payment-done', (data) => {
    console.log("Razor pay", data);
    setPaymentDetails(data)
    setPaymentPanel(true);
  });
  console.log("payee",paymentDetails);
  

// finish ride panel animation
  useGSAP(function(){
    if(finishRidePanel){
     gsap.to(finishRidePanelRef.current,{
       transform:'translateY(0)'
     })
    }else{
     gsap.to(finishRidePanelRef.current,{
       transform:'translateY(100%)'
     })
    }
   },[finishRidePanel])

// payment done modal panel animation
useGSAP(function(){
  if(paymentPanel){
    gsap.to(paymentPopupModalRef.current, {
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'auto'
    })
  } else {
    gsap.to(paymentPopupModalRef.current, {
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none'
    })
  }
},[paymentPanel])

  return (
    <div className="h-screen relative">

    <div className='fixed p-6 top-0 flex items-center justify-between w-screen'> 
      <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <Link to={'/captain-login'} className="w-10 h-10 bg-white flex items-center justify-center rounded-full">
    <i className="ri-logout-box-r-line text-lg font-medium "></i>
    </Link>
    </div>

      <div className="h-4/5">
        {/* <img
          className="w-full h-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}

        <LiveTracking/>
      </div>
      <div className="h-1/5 p-6 bg-yellow-400 flex items-center relative justify-between z-10"
      onClick={()=>setFinishRidePanel(true)}
      >
      {/* icon */}
      <h5
        className="p-1 absolute top-0 text-center w-[90%]"
        onClick={() => {}}
      >
        <i className=" text-3xl  text-gray-800 ri-arrow-up-wide-line"></i>
      </h5>
        <h4 className='text-xl font-semibold'>4 KM away</h4>
        <button  className=" bg-green-600 text-white rounded-lg font-semibold p-3 px-10">Complete the Ride</button>
      </div>

      <div ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 py-10 px-3 bg-white translate-y-full pt-12'>
       <FinishRide 
       rideData={rideData}
       setFinishRidePanel={setFinishRidePanel}/>
      </div>

      {/* payment modal */}
      <div ref={paymentPopupModalRef} >
        <PaymentDoneModal 
        setPaymentPanel={setPaymentPanel}
        paymentDetails={paymentDetails}
        />
      </div>

     
    </div>
  )
}

export default CaptainRiding