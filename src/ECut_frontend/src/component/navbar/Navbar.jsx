import React from 'react'

const NavigationBar = () => {
  return (
    <header id="header" class="fixed-top d-flex align-items-cente">
      <div class="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
  
        <div className='font-bold flex items-center pl-4 text-3xl'>
        <a href="/" class="logo me-auto me-lg-0 pe-1">
          <img src="./logo.png" alt="ECut" class="img-fluid"/>
          <h1>
            ECut
          </h1>
        </a>
        </div>

        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <li><a class="nav-link" href="explore">Explore</a></li>
            <li><a class="nav-link" href="login">Login</a></li>
            <li><a class="nav-link" href="register">Register</a></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>  
      </div>
    </header>

  )
}

export default NavigationBar