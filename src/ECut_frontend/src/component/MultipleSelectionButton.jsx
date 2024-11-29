import React, { useState } from 'react';

const MultipleSelectionButton = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="mb-5 flex justify-betwween gap-4">
        {options.map((option) => (
            <button
                key={option}
                className={`w-[50%] h-[70px] rounded-[10px] border-[1px] border-[#edb01c] flex flex-col justify-center items-center transition-all ${
                option === selectedOption
                    ? 'border-b-[7px] text-[#edb01c] hover:bg-gray-100'
                    : 'border-gray-400 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => onSelect(option)}
            >
                <img src={option==='Barber Shop'? "./city-icon.png" : "./employee-icon.png"} alt="hehe" className='mb-[5px] w-[25px] h-[25px]'/>
                <p className='text-[14px] font-bold'>{option}</p>
            </button>
        ))}
    </div>
  );
};

export default MultipleSelectionButton;