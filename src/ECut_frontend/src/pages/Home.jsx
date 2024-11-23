import React, { useState, useEffect } from 'react';
import NavigationBar from '../component/navbar/Navbar';
import Jumbotron from '../section/jumbotron/Jumbotron';
import TopBarberShop from '../section/topBarbershop/TopBarberShop';

const Home = () => {
    const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);  // To show loading state

    useEffect(() => {
        if (navigator.geolocation) {
            // Options to increase accuracy (timeout, maximum age, and enable high accuracy)
            const geoOptions = {
                enableHighAccuracy: true,
                timeout: 10000,  // 10 seconds timeout
                maximumAge: 0  // Do not use cached position
            };

            function success(position) {
                console.log(position);
                setCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
                setIsLoading(false);  // Stop loading once the location is retrieved
            }

            function error(err) {
                console.error(err);
                setIsLoading(false);
                if (err.code === 1) {
                    setError('Location permission denied. Please enable location access.');
                } else if (err.code === 2) {
                    setError('Location unavailable. Please check your GPS or network.');
                } else {
                    setError('Failed to get location.');
                }
            }

            navigator.geolocation.getCurrentPosition(success, error, geoOptions);
        } else {
            setIsLoading(false);
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    const formatCoordinate = (coordinate) => {
        return coordinate ? coordinate.toFixed(5) : '';
    };

    return (
        <div>
            <NavigationBar />
            <Jumbotron />
            <TopBarberShop />
            <div className="coordinates-section">
                <h3>Your Current Location:</h3>
                {isLoading ? (
                    <p>Fetching location...</p>
                ) : coordinates.latitude && coordinates.longitude ? (
                    <p>
                        {formatCoordinate(coordinates.latitude)}, 
                        {formatCoordinate(coordinates.longitude)}
                    </p>
                ) : (
                    <p>{error}</p>
                )}
            </div>
        </div>
    );
};

export default Home;
