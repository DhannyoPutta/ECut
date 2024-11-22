import React from 'react'
import NavigationBar from '../component/navbar/Navbar'
import Jumbotron from '../section/jumbotron/Jumbotron'
import TopBarberShop from '../section/topBarbershop/TopBarberShop'

const Home = () => {
    return (
        <div>
            <NavigationBar />
            <Jumbotron />
            <TopBarberShop />
        </div>
    )
}

export default Home