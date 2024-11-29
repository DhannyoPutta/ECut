import React from 'react'

const Jumbotron = () => {
    return (

        <section id="hero" className="d-flex align-items-center">
        <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
          <div className="row">
            <div className="col-lg-12">
                
              <h1>Welcome to <span>ECut</span></h1>
              <h1>Extraordinary Barber Hub For Hair Enthusiasts</h1>
    
              <div className="btns">
                <a href="explore" className="btn-menu animated fadeInUp">Explore</a>
                <a href="login" className="btn-book animated fadeInUp">Login</a>
              </div>
            </div>
            {/* <div className="col-lg-4 d-flex align-items-center justify-content-center position-relative" data-aos="zoom-in" data-aos-delay="200">
              <a href="https://www.youtube.com/watch?v=GlrxcuEDyF8" className="glightbox play-btn"></a>
            </div> */}
    
          </div>
        </div>
      </section>
    
    )
}

export default Jumbotron