import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
import axios from "axios";


const Riding = () => {
  const location=useLocation()
  const {ride}=location.state || {}
  const {socket}=useContext(SocketContext)
  const navigate=useNavigate()
  const [button, setButton] = useState(true)


  //socket event
  socket.on('ride-ended',()=>{
    navigate('/home')
  })

console.log("payment ride details",ride);


//payment function
const handlePayment = async () => {
  const amount = ride?.fare || 500; // Replace with the actual ride fare
  const captainId = ride?.captain.socketId; // Replace with the captain's ID
  const rideDetails= ride // all ride details 
     
   
  try {
    // Step 1: Create an order using the backend API
    const { data: orderResponse } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/payment/create-order`,
      { amount,
        currency: "INR",
        captainId },
      {
        headers: {
         'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    const { order } = orderResponse;

    // Step 2: Razorpay Checkout Options
    const options = {
      key: `rzp_test_2NU9gisQA1Wtgg`, // Replace with your Razorpay Key ID
      amount: order.amount,
      currency: order.currency,
      name: "Your App Name",
      description: "Ride Payment",
      order_id: order.id,
      handler: async function (response) {
        // Step 3: Verify payment on the backend
        try {
            const { data: verificationResult } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/payment/verify-payment`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              captainId,
              amount,
              rideDetails,
            },
            {
              headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            }
            );

          if (verificationResult.success) {
            setButton(false)
          } else {
            alert("Payment verification failed. Please try again.");
          }
        } catch (error) {
          console.error("Error during payment verification:", error);
          alert("Payment verification failed. Please try again.");
        }
      },
      prefill: {
        name: ride?.user.fullname.firstname, // Prefill with user data
        email: ride?.user.email,
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.error("Error in payment:", error);
    alert("Something went wrong. Please try again.");
  }
};



  return (
    <div className="h-screen">

    <Link to={'/home'} className="fixed w-10 h-10 bg-white flex items-center justify-center rounded-full top-2 right-2">
    <i className="ri-home-5-line text-lg font-medium "></i>
    </Link>

      <div className="h-1/2">
        {/* <img
          className="w-full h-full object-cover "
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        /> */}
        <LiveTracking/>
      </div>
      <div className="h-1/2 p-4 relative z-20 bg-white">
        <div className="flex justify-between items-center ">
          <img
            className="h-12"
            src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
            alt=""
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">{ride?.captain.fullname.firstname}</h2>
            <h4 className="text-xl font-semibold -mb-1 -mt-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Swift</p>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-2">
          <div className="w-full mt-5">

            <div className="flex  items-center gap-5 p-3 border-b-2">
              <i className="ri-map-pin-user-fill text-lg"></i>
              <div>
                <h3 className="text-lg font-medium">562/11-A</h3>
                <p className="text-sm -mt-1 text-gray-600">
                {ride?.destination}
                </p>
              </div>
            </div>

            <div className="flex  items-center gap-5 p-3 ">
              <i className="ri-currency-line text-lg"></i>
              <div>
                <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
              </div>
            </div>
          </div>
        </div>

       {button ? (
           <button onClick={handlePayment} className="w-full mt-5 bg-green-600 text-white rounded-lg font-semibold p-2">Make a Payment</button>
       ):(
        <p className="w-full text-sm text-gray-400 text-center mt-2 animate-pulse">
          Please wait while Captain {ride?.captain.fullname.firstname} confirms your payment status...
        </p>)}
      </div>
    </div>
  );
};

export default Riding;
