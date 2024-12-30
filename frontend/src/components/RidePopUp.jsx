import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      {/* icon */}
      <h5
        className="p-1 absolute top-0 text-center w-[93%]"
        onClick={() => props.setRidePopUpPanel(false)}
      >
        <i className=" text-3xl  text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className="text-2xl font-semibold mb-5">New Ride Available!</h3>

      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg">
        <div className="flex items-center gap-3">
            <img className="w-12 h-12 object-cover rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNPTZdVhettUOgL4gulcQCozdbr2gvz4nOcQ&s" alt="" />
            <h2 className="text-lg font-medium">{props.ride?.user.fullname.firstname+" "+props.ride?.user.fullname.lastname}</h2>
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
                {props.ride?.pickup}
              </p>
            </div>
          </div>

          <div className="flex  items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
              {props.ride?.destination}
              </p>
            </div>
          </div>

          <div className="flex  items-center gap-5 p-3 ">
            <i className="ri-currency-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between w-full mt-5">
          <button onClick={()=>props.setRidePopUpPanel(false)} className=" bg-gray-300 text-gray-700 rounded-lg font-semibold p-3 px-10">
              Ignore
          </button>
          <button
            onClick={() => {
              props.setConfirmRidePopUpPanel(true)
              props.conformRide()
            }}
            className=" bg-green-600 text-white rounded-lg font-semibold p-3 px-10"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default RidePopUp;
