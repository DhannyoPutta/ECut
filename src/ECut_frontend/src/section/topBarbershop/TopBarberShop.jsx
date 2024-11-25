import React, { useEffect, useState } from 'react';
// import { ECut_backend } from 'declarations/ECut_backend';

const TopBarberShop = () => {
  const [data, setData] = useState([
    {
      barberShopProfileLink: "wp2.jpg",
      barberShopName: "Shop 3",
      barberShopRating: 4.8,
    },
    {
      barberShopProfileLink: "wp2.jpg",
      barberShopName: "Shop 4",
      barberShopRating: 3.9,
    }
  ]);
  // useEffect(() => {
  //   setData(data);
  // }, []);


  // useEffect(() => {
  //   setData([
  //     {
  //       barberShopProfileLink: "wp2.jpg",
  //       barberShopName: "Shop 1",
  //       barberShopRating: 3.14,
  //     },
  //     {
  //       barberShopProfileLink: "wp2.jpg",
  //       barberShopName: "Shop 2",
  //       barberShopRating: 4.1,
  //     },
  //     {
  //       barberShopProfileLink: "wp2.jpg",
  //       barberShopName: "Shop 3",
  //       barberShopRating: 4.8,
  //     },
  //     {
  //       barberShopProfileLink: "wp2.jpg",
  //       barberShopName: "Shop 4",
  //       barberShopRating: 3.9,
  //     },
  //     {
  //       barberShopProfileLink: "wp2.jpg",
  //       barberShopName: "Shop 5",
  //       barberShopRating: 4.5,
  //     },
  //     {
  //       barberShopProfileLink: "wp2.jpg",
  //       barberShopName: "Shop 6",
  //       barberShopRating: 4.2,
  //     },
  //     {
  //       barberShopProfileLink: "wp2.jpg",
  //       barberShopName: "Shop 7",
  //       barberShopRating: 3.7,
  //     },
  //     {
  //       barberShopProfileLink: "wp2.jpg",
  //       barberShopName: "Shop 8",
  //       barberShopRating: 4.3,
  //     },
  //   ]);
  // }, []);

  return (

    <section id="chefs" class="barber-shop">
    <div class="container" data-aos="fade-up">

      <div class="section-title">
        <h2>Barber Shop</h2>
        <p>Popular Barber Shop</p>
      </div>

      <div class="row">

      {data.map((datum, index) => (
        <div class="col-lg-4 col-md-6">
          <div class="member" data-aos="zoom-in" data-aos-delay="200">
            <img src={datum.barberShopProfileLink}
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
