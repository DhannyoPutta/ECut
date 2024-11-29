import React, { useEffect, useState } from 'react';
import { ECut_backend } from 'declarations/ECut_backend';
import LoadingPage from '../../component/loading/page'

const TopBarberShop = () => {
  const [data, setData] = useState();
  useEffect(() => {
    ECut_backend.get_all_barberShops().then((result) => {
        setData(result);
    })
}, [])

  if (!data) {
    return <LoadingPage />
  }

  return (

    <section id="chefs" className="barber-shop">
    <div className="container" data-aos="fade-up">

      <div className="section-title">
        <h2>Barber Shop</h2>
        <p>Popular Barber Shop</p>
      </div>

      <div className="row">

      {data.map((datum) => (
        <div className="col-lg-4 col-md-6" key={datum.barberShopId}>
          <div className="member" data-aos="zoom-in" data-aos-delay="200">
            <img src={datum.barberShopProfileLink ?? "wp2.jpg"}
            alt={datum.barberShopName}
            className="img-fluid"/>
            <div className="member-info">
              <div className="member-info-content">
                <h4>{datum.barberShopName}</h4>
                <span>Rating : {datum.barberShopRating} <i className="bi bi-star"></i></span>
              </div>
              <div className="social">                
                <a href=""><i className="bi bi-twitter"></i></a>
                <a href=""><i className="bi bi-facebook"></i></a>
                <a href=""><i className="bi bi-instagram"></i></a>
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
