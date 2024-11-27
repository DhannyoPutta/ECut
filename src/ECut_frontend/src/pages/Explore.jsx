import React, { useEffect, useState } from 'react'
import { ECut_backend } from '../../../declarations/ECut_backend'
import NavigationBar from '../component/navbar/Navbar'
import LoadingPage from '../component/loading/page'

const ExplorePage = () => {

    const [data, setData] = useState()

    useEffect(() => {

        ECut_backend.get_all_barberShops().then((result) => {
            console.log(result)
            setData(result)
        })

    }, [])

    if (!data) {
        return <LoadingPage />
    }

    return (
        <div>
            <NavigationBar />
            <div className='mt-24 p-6 grid grid-cols-5 gap-6'>
                {
                    data.map((barbershop) => {
                        return (
                            <a className='bg-gray-200 p-6 rounded-2xl shadow-2xl border-1 border-gray-900 cursor-pointer' href={`/barbershop/${barbershop.barberShopId}`}>
                                <img src="https://t3.ftcdn.net/jpg/03/21/80/88/240_F_321808809_Z6pldl1H54aIxGNMalFXJ7F3EBsaNUan.jpg" alt="" srcset="" className='w-full h-64' />
                                <div className='text-xl'>
                                    {barbershop.barberShopName}
                                </div>
                                <div className='font-bold'>
                                    Rating : {barbershop.barberShopRating}
                                </div>
                            </a>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExplorePage