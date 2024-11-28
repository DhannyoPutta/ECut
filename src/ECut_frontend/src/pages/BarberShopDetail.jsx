import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ECut_backend } from "../../../declarations/ECut_backend"
import LoadingPage from "../component/loading/page"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const BarberShopDetailPage = () => {
    const { id } = useParams()
    const [data, setData] = useState()

    useEffect(() => {
        ECut_backend.get_barber_shop(id).then((result) => {
            console.log(result)   
            setData(result)
        })
    }, [id])

    if (!data) {
        return <LoadingPage/>
    }

    return (
        <div>
            <MapContainer
                center={[data.barberShopLatitude, data.barberShopLongitude]} 
                zoom={13} 
                style={{ height: '400px', width: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[data.barberShopLatitude, data.barberShopLongitude]}>
                    <Popup>
                        {data.barberShopName}<br />
                        {data.barberShopAddress}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default BarberShopDetailPage