require('dotenv').config()
const axios = require('axios');
const captainModel=require('../models/captain.model')


// get coordinates of location
module.exports.getAddressesCoordinate = async (address) => {
        const apiKey = process.env.GOOGLE_MAP_KEY;
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    try {
        const response = await axios.get(url);
        
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Failed to get coordinates');
        }
    } catch (error) {
        console.log(error);
        throw new Error(`Geocoding error: ${error.message}`);
    }
}


//get location destination distance and time of travel
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAP_KEY;
    const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
   

    try {
        console.log("Fetching distance and time from URL:", url); // Log the request URL

        const response = await axios.get(url);

        console.log("API Response:", response.data); // Log the API response for debugging

        if (response.data.status === 'OK') {
            const element = response.data.rows[0]?.elements[0];

            if (!element || element.status === 'ZERO_RESULTS') {
                throw new Error('No routes found between the specified origin and destination');
            }

            return  response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error(response.data.error_message || 'Unable to fetch distance and time');
        }
    } catch (err) {
        console.error("Error in getDistanceTime:", err.response?.data || err.message);
        throw new Error(err.response?.data?.error_message || 'Unable to fetch distance and time');
    }
};



//get suggestions
module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAP_KEY;
    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    
    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}


//getting nearby location captains 
module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}