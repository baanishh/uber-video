import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
};

const LiveTracking = () => {
    const [position, setPosition] = useState([51.505, -0.09]);

    useEffect(() => {
        // Get initial position
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => console.error(err)
        );

        // Update position every second
        const intervalId = setInterval(() => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                    console.log('Location updated:', pos.coords.latitude, pos.coords.longitude);
                },
                (err) => console.error(err)
            );
        }, 1000);

        // Cleanup interval and watch
        // return () => {
        //     clearInterval(intervalId);
        // };
    }, []);

    return (
        <div className="w-full h-screen">
            <MapContainer
                center={position}
                zoom={15}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
            >
                <MapView center={position} />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} />
            </MapContainer>
        </div>
    );
};

export default LiveTracking;
