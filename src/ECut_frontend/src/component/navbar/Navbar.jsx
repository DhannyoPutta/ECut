import React from 'react'

const NavigationBar = () => {
  return (
    <nav className='flex justify-around items-center fixed top-0 px-5 py-5 w-full box-border text-tertiary bg-white z-20'>
      <div className="flex">
        <img src="./logo.png" alt="ECut" className='w-12 h-10' />
        <div className='font-bold flex items-center pl-4 text-3xl'>
          ECut
        </div>
      </div>
      <ul className="flex gap-6 text-2xl items-center font-semibold">
        <li><a href="explore">Explore</a></li>
        <li><a href="login">Login</a></li>
      </ul>
    </nav>
  )
}

export default NavigationBar