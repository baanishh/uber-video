import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  const location=useLocation()
  const {ride}=location.state || {}
  const {socket}=useContext(SocketContext)
  const navigate=useNavigate()


  //socket event
  socket.on('ride-ended',()=>{
    navigate('/home')
  })



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

        <button className="w-full mt-5 bg-green-600 text-white rounded-lg font-semibold p-2">Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;