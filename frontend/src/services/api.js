import axios from 'axios';

export const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

//get locations suggestions
export const getSuggestions = async (input) => {
    try {
        const response = await axios.get(`${BASE_URL}/maps/get-suggestions?input=${input}`,{
            headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
};

//get fare estimate
export const getFareEstimate = async (pickup, destination) => {
    try {
        const response = await axios.get(`${BASE_URL}/rides/get-fare?pickup=${pickup}&destination=${destination}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching fare:', error);
        throw error;
    }
};



