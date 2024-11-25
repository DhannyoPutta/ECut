import React from 'react'

const Jumbotron = () => {
    return (

        <section id="hero" class="d-flex align-items-center">
        <div class="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
          <div class="row">
            <div class="col-lg-12">
                
              <h1>Welcome to <span>ECut</span></h1>
              <h1>Extraordinary Barber Hub For Hair Enthusiasts</h1>
    
              <div class="btns">
                <a href="explore" class="btn-menu animated fadeInUp">Explore</a>
                <a href="login" class="btn-book animated fadeInUp">Login</a>
              </div>
            </div>
            {/* <div class="col-lg-4 d-flex align-items-center justify-content-center position-relative" data-aos="zoom-in" data-aos-delay="200">
              <a href="https://www.youtube.com/watch?v=GlrxcuEDyF8" class="glightbox play-btn"></a>
            </div> */}
    
          </div>
        </div>
      </section>
    
    )
}

export default Jumbotron