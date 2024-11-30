import React, { useState } from "react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { motion, AnimatePresence } from 'framer-motion';
import Carousel from '../component/carousel/carousel';
import MultipleSelectionButton from '../component/MultipleSelectionButton';
import GenderSelectionButton from '../component/GenderSelectionButton';

function Register() {
  const carouselItems = [
    <img src="./register/carousel-1.jpg" alt="Image 1" className="w-full h-full object-cover" />,
    <img src="./register/carousel-2.jpg" alt="Image 2" className="w-full h-full object-cover" />,
    <img src="./register/carousel-3.jpg" alt="Image 3" className="w-full h-full object-cover" />,
  ];
    
  const [selectedOption, setSelectedOption] = useState('Barber Shop');

  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? '50%' : '-10%',
      opacity: 0
    }),
    in: {
      x: 0,
      opacity: 1
    },
    out: (direction) => ({
      x: direction > 0 ? '-10%' : '50%',
      opacity: 0
    })
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.3
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handlePhoneChange = (phone) => {
    setFormData({ ...formData, phoneNumber: phone });
  };

  const [formData, setFormData] = useState({
      shopName: '',
      email: '',
      phoneNumber: '',
      address: ''
  });

  const [formEmployeeData, setFormEmployeeData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    nationality: '',
  });

  const [gender, setGender] = useState('Male')

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setFormEmployeeData({ ...formEmployeeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSend = selectedOption === 'Barber Shop' ? formData : formEmployeeData;
    
    console.log(dataToSend); 
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#eef2f3] to-[#8e9eab]">
      <div className="relative flex w-[70%] max-w-[1200px] h-[90%] bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-[60%] bg-[#101820] text-white flex flex-col justify-center">
          <Carousel items={carouselItems} autoPlayInterval={3000} />
        </div>
        
        {/* Right Section */}
        <div className="absolute right-0 w-[50%] h-full p-12 bg-white rounded-tl-[10px] rounded-bl-[10px] flex flex-col justify-center">
          <MultipleSelectionButton
            options={['Barber Shop', 'Employee']}
            selectedOption={selectedOption}
            onSelect={handleSelect}
          />
          
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedOption}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            custom={selectedOption === 'Employee' ? 1 : -1}
          >
              {selectedOption === 'Barber Shop' ?
                (
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                    <div className="flex flex-col">
                      <label className="mb-[4px] text-[14px] font-medium">
                          Barber Shop Name
                      </label>
                      <input
                          type="text"
                          name="shopName"
                          value={formData.shopName}
                          onChange={handleChange}
                          required
                          className="px-3 py-2 w-full border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-[4px] text-[14px] font-medium">
                          Email
                      </label>
                      <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="px-3 py-2 w-full border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-[4px] text-[14px] font-medium">
                          Phone Number
                      </label>
                      <PhoneInput
                        inputStyle={{
                          paddingBlock: 8,
                          width: '100%',
                          height: 'auto',
                          borderRadius: 10,
                          fontSize: 16,
                        }}
                        buttonStyle={{
                          borderTopLeftRadius: 8, 
                          borderEndStartRadius: 8, 
                        }}
                        country={'us'}
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-[4px] text-[14px] font-medium">
                          Address
                      </label>
                      <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="px-3 py-2 w-full border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2"
                      />
                    </div>
                    <br />
                    <button
                      type="submit"
                      className={`bg-yellow-500 text-white font-bold py-3 rounded transition-colors duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
                    >
                      Register Barber
                    </button>
                  </form>
                )
                  :
                (
                  <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                    <div className="flex flex-col">
                        <label className="mb-[4px] text-[14px] font-medium">
                          Name
                        </label>
                        <input
                            type="text"
                            name="shopName"
                            value={formData.shopName}
                            onChange={handleChange}
                            required
                            className="px-3 py-2 w-full border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-[4px] text-[14px] font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="px-3 py-2 w-full border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2"
                        />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-[4px] text-[14px] font-medium">
                          Phone Number
                      </label>
                      <PhoneInput
                        inputStyle={{
                          paddingBlock: 8,
                          width: '100%',
                          height: 'auto',
                          borderRadius: 10,
                          fontSize: 16,
                        }}
                        buttonStyle={{
                          borderTopLeftRadius: 8, 
                          borderEndStartRadius: 8, 
                        }}
                        country={'us'}
                        value={formData.phoneNumber}
                        onChange={handlePhoneChange}
                        />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-[4px] text-[14px] font-medium">
                          Phone Number
                      </label>
                      <GenderSelectionButton
                        value={formEmployeeData.gender}
                        onChange={handleEmployeeChange}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="mb-[4px] text-[14px] font-medium">
                          Date of Birth
                      </label>
                      <input
                          type="date"
                          name="dob"
                          value={formEmployeeData.dob}
                          onChange={handleEmployeeChange}
                          required
                          className="px-3 py-2 w-full border border-gray-300 rounded-[8px] focus:outline-none focus:ring-2"
                      />
                    </div>
                    <br />
                    <button
                      type="submit"
                      className={`bg-yellow-500 text-white font-bold py-3 rounded transition-colors duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2`}
                    >
                      Register Employee
                    </button>
                  </form>
                )
              }
              

          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Register;
