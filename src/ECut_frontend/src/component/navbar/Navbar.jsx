import React from 'react'
import { useSession } from '../session/SessionUtil';
import { useNavigate } from 'react-router-dom';
const NavigationBar = () => {
  const navigate = useNavigate();
  const { userInfo, logout } = useSession();

  const logoutApp = async (e) => {
    window.showLoader();
    await logout()
    window.hideLoader();
    navigate("/");
  }
  console.log(userInfo);
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
  
        <div className='font-bold flex items-center pl-4 text-3xl'>
        <a href="/" className="logo me-auto me-lg-0 pe-1 flex">
          <img src="./ecut_logo.png" alt="ECut" className="img-fluid"/>
          <h1>
            ECut
          </h1>
        </a>
        </div>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li><a className="nav-link" href="explore">Explore</a></li>
             {/* Conditional rendering based on userInfo */}
             {userInfo ? (
              <li class="dropdown"><a href="#"><span>Welcome, {userInfo.userName}</span> <i class="bi bi-chevron-down"></i></a>
                <ul>
                  <li><a href="#" onClick={logoutApp}>Log out</a></li>
                </ul>
              </li>
            ) : (
              <>
                <li><a className="nav-link" href="login">Login</a></li>
                <li><a className="nav-link" href="register">Register</a></li>
              </>
            )}
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>  
      </div>
    </header>

  )
}

export default NavigationBar