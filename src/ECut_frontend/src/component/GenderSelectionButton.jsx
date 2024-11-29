import React from "react";

const GenderSelectionButton = ({ value, onChange }) => {
  const handleSelection = (gender) => {
    onChange({ target: { name: "gender", value: gender } });
  };

  return (
    <div className="relative w-[100%] max-w-[500px] m-auto flex items-center justify-center rounded-lg border-[2px] border-gray-300">
      {/* Slider effect */}
      <div
        className={`absolute top-0 left-0 w-[50%] h-full rounded-lg transition-all duration-500
            ${value === "Male" ? "bg-blue-400" : "bg-pink-400"}
            ${value === "Male" ? "translate-x-0" : "translate-x-[100%]"}
        `}
      ></div>

      {/* Male Option */}
      <div
        onClick={() => handleSelection("Male")}
        className={`relative w-[50%] h-[60px] flex items-center justify-center cursor-pointer transition-all duration-300
            ${value === "Male" ? "text-white" : "text-gray-700"}
        `}
      >
        <img
          src="./male-icon.png"
          alt="Male"
          className="w-[25px] h-[25px]"
        />
        <div className="ml-[5px] text-[16px] font-bold">Male</div>
      </div>

      {/* Female Option */}
      <div
        onClick={() => handleSelection("Female")}
        className={`relative w-[50%] h-[60px] flex items-center justify-center cursor-pointer transition-all duration-300
            ${value === "Female" ? "text-white" : "text-gray-700"}
        `}
      >
        <img
          src="./female-icon.png"
          alt="Female"
          className="w-[25px] h-[25px]"
        />
        <div className="ml-[5px] text-[16px] font-bold">Female</div>
      </div>
    </div>
  );
};

export default GenderSelectionButton;
