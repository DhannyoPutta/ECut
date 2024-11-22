import React, { useEffect, useState } from 'react';

const TopBarberShop = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData([
      {
        barberShopProfileLink: "wp2.jpg",
        barberShopName: "Shop 1",
        barberShopRating: 3.14,
      },
      {
        barberShopProfileLink: "wp2.jpg",
        barberShopName: "Shop 2",
        barberShopRating: 4.1,
      },
      {
        barberShopProfileLink: "wp2.jpg",
        barberShopName: "Shop 3",
        barberShopRating: 4.8,
      },
      {
        barberShopProfileLink: "wp2.jpg",
        barberShopName: "Shop 4",
        barberShopRating: 3.9,
      },
      {
        barberShopProfileLink: "wp2.jpg",
        barberShopName: "Shop 5",
        barberShopRating: 4.5,
      },
      {
        barberShopProfileLink: "wp2.jpg",
        barberShopName: "Shop 6",
        barberShopRating: 4.2,
      },
      {
        barberShopProfileLink: "wp2.jpg",
        barberShopName: "Shop 7",
        barberShopRating: 3.7,
      },
      {
        barberShopProfileLink: "wp2.jpg",
        barberShopName: "Shop 8",
        barberShopRating: 4.3,
      },
    ]);
  }, []);

  return (
    <div className="w-screen flex flex-col items-center h-screen bg-white text-tertiary">
      <h1 className="text-5xl font-bold text-center py-4">Most Famous Barbershops</h1>
      <div className="w-2/3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        {data.map((datum, index) => (
          <div key={index} className="bg-white text-tertiary p-4 rounded-lg shadow-lg">
            <img
              src={datum.barberShopProfileLink}
              alt={datum.barberShopName}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{datum.barberShopName}</h2>
            <p className="font-medium">Rating: {datum.barberShopRating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBarberShop;
