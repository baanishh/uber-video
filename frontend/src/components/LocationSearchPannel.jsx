import React from 'react'

const LocationSearchPannel = (props) => {
    console.log(props);
    

    // smaple location array
    const locations = [
        "24B, Near Kappor's cafe, Coding School, Bhopal",
        "44B, Near Khans's Hotel, Primary School, Assam",
        "35B, Near selva's Restaurant, Coding Institution, Kerala",
        "292B, Near Ayisha's School, LKG School, Tamil Nadu",
    ]

  return (
    <div>
        {/* sample data */}

        {
            locations.map(function(elem, index){
                return  <div onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setOpenPanel(false)
                }} key={index} className='flex gap-4 border-2 p-3  my-2 border-gray-50 active:border-black rounded-xl items-center justify-start'>
                <h2 className='bg-[#eee] w-12 h-8 flex justify-center items-center rounded-full'><i className="ri-map-pin-2-fill"></i></h2>
                <h4 className='font-medium'>{elem}</h4>
            </div>
            })
        }
        
    </div>
  )
}

export default LocationSearchPannel