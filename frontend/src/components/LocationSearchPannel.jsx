import React from 'react'

const LocationSearchPannel = ({ suggestions, onSuggestionClick }) => {
  return (
    <div>
      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <div 
            onClick={() => onSuggestionClick(suggestion)}
            key={index} 
            className='flex gap-4 border-2 p-3 my-2 border-gray-50 active:border-black rounded-xl items-center justify-start cursor-pointer'
          >
            <h2 className='bg-[#eee] w-12 h-8 flex justify-center items-center rounded-full'>
              <i className="ri-map-pin-2-fill"></i>
            </h2>
            <h4 className='font-medium'>{suggestion}</h4>
          </div>
        ))
      ) : (
        <div className='p-3 text-center text-gray-500'>
          Type to see suggestions...
        </div>
      )}
    </div>
  )
}

export default LocationSearchPannel