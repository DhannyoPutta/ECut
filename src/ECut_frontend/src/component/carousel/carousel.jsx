import React, { useState, useEffect, useRef } from 'react';

const Carousel = ({ items, autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, []);

  const startAutoPlay = () => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
  };

  const stopAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-full max-w-[1200px] bg-white rounded-lg shadow-lg overflow-hidden">
      <div
        className="carousel-inner w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="carousel-item w-full h-full flex-shrink-0 flex justify-center items-center"
          >
            {item}
          </div>
        ))}
      </div>
      <div className="carousel-indicators absolute bottom-0 mb-4 h-4 w-[83%] flex justify-center items-end">
        {items.map((_, index) => (
          <div
            key={index}
            className={`h-2 bg-gray-300 mx-1 transition-all duration-500 rounded-lg ${
              index === currentIndex
                ? 'w-14 opacity-60'
                : 'w-3 hover:w-6 opacity-30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;