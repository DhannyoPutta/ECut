import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ECut_backend } from "../../../declarations/ECut_backend";
import LoadingPage from "../component/loading/page";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Star, Navigation } from "lucide-react";
const BarberShopDetailPage = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const [employees, setEmployees] = useState();
    useEffect(() => {
        ECut_backend.get_barber_shop(id).then((result) => {
            console.log(result);
            setData(result[0]);
        });
        ECut_backend.get_barbershop_employees(id).then((result) => {
            console.log(result);
        });
    }, [id]);
    if (!data) {
        return <LoadingPage />;
    }
    return (<div className="h-screen w-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <div className="w-full">
                {/* Header Section */}
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">
                            {data.barberShopName}
                        </h1>
                    </div>

                    <div className="flex justify-around w-full">
                        <div className="flex items-center space-x-4 w-1/6 bg-gray-50 p-4 rounded-lg">
                            <Star className="text-yellow-500 w-8 h-8"/>
                            <div>
                                <p className="font-semibold text-gray-700">Rating</p>
                                <p className="text-gray-600 text-2xl font-bold">
                                    {data.barberShopRating}/5
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 w-5/6 bg-gray-50 p-4 rounded-lg">
                            <Navigation className="text-green-500 w-8 h-8"/>
                            <div>
                                <p className="font-semibold text-gray-700">Coordinates</p>
                                <p className="text-gray-600">
                                    Lat: {data.barberShopLatitude}
                                    <br />
                                    Lon: {data.barberShopLongitude}
                                </p>
                            </div>
                            <MapContainer center={[data.barberShopLatitude, data.barberShopLongitude]} zoom={13} className="h-[200px] w-full rounded-xl border-2">
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
                                <Marker position={[data.barberShopLatitude, data.barberShopLongitude]}>
                                    <Popup>
                                        <div className="text-center">
                                            <h3 className="font-bold">{data.barberShopName}</h3>
                                            <p>{data.barberShopAddress}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </div>
                    </div>
                </div>

                {/* Map Section */}
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
                    <div className="p-4">

                    </div>
                </div>
            </div>
        </div>);
};
export default BarberShopDetailPage;
