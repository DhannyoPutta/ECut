import React from 'react'

const NavigationBar = () => {
  return (
    <nav className='flex justify-around items-center fixed top-0 px-5 py-5 w-full box-border text-tertiary bg-white z-20'>
      <div className="flex">
        <img src="./ecut_logo.png" alt="ECut" className='w-29 h-10' />
      </div>
      <ul className="flex gap-6 text-2xl items-center font-semibold">
        <li><a href="explore">Explore</a></li>
        <li><a href="login">Login</a></li>
      </ul>
    </nav>
  )
}

export default NavigationBar