import React, { useEffect, useState } from 'react';
import { ECut_backend } from 'declarations/ECut_backend';
import LoadingPage from '../../component/loading/page'

const TopBarberShop = () => {
  const [data, setData] = useState();
  useEffect(() => {
    ECut_backend.get_all_barberShops().then((result) => {
        console.log(result);
        setData(result);
    })
}, [])

  if (!data) {
    return <LoadingPage />
  }

  return (

    <section id="chefs" class="barber-shop">
    <div class="container" data-aos="fade-up">

      <div class="section-title">
        <h2>Barber Shop</h2>
        <p>Popular Barber Shop</p>
      </div>

      <div class="row">

      {data.map((datum) => (
        <div class="col-lg-4 col-md-6" key={datum.barberShopId}>
          <div class="member" data-aos="zoom-in" data-aos-delay="200">
            <img src={datum.barberShopProfileLink ?? "wp2.jpg"}
            alt={datum.barberShopName}
            class="img-fluid"/>
            <div class="member-info">
              <div class="member-info-content">
                <h4>{datum.barberShopName}</h4>
                <span>Rating : {datum.barberShopRating} <i class="bi bi-star"></i></span>
              </div>
              <div class="social">                
                <a href=""><i class="bi bi-twitter"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>      
      ))}
      </div>

    </div>
  </section>

  );
};

export default TopBarberShop;
