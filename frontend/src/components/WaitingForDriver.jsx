import React from "react";

const WaitingForDriver = (props) => {
  return (
    <div>
      {/* icon */}
      <h5
        className="p-1 absolute top-0 text-center w-[93%]"
        onClick={() => props.setWaitingForDriver(false)}
      >
        <i className=" text-3xl  text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <div className="flex justify-between items-center ">
        <img
          className="h-12"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className="text-right">
            <h2 className="text-lg font-medium">Banish A</h2>
            <h4 className="text-xl font-semibold -mb-1 -mt-1">KL 10 AT 800</h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Swift</p>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full mt-5">
          <div className="flex  items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-fill text-lg "></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Karnataka, Moodbidri, 564442
              </p>
            </div>
          </div>

          <div className="flex  items-center gap-5 p-3 border-b-2">
            <i className="ri-map-pin-user-fill text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">
                Karnataka, Moodbidri, 564442
              </p>
            </div>
          </div>

          <div className="flex  items-center gap-5 p-3 ">
            <i className="ri-currency-line text-lg"></i>
            <div>
              <h3 className="text-lg font-medium">₹193.23</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
