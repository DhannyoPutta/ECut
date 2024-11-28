import React, { useState } from 'react';
import NavigationBar from '../component/navbar/Navbar';
import { ECut_backend } from 'declarations/ECut_backend';

const Login = () => {

    const [errorMessage, setErrorMessage] = useState("");
  
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted"); // Replace with your form submission logic
        console.log(formData); // Replace with your form submission logic
    };

    return (
        <div>
            <NavigationBar />
            <div className="flex flex-col md:flex-col items-center justify-center min-h-screen text-tertiary space-y-6 md:space-y-0 login-background">
                <div class="book-a-table w-50" data-aos="fade-up" data-aos-delay="100">
                    <div class="section-title">
                        <h2>Login</h2>
                        <p>Welcome Back to ECut</p>
                    </div>

                    <form onSubmit={handleSubmit} role="form" class="php-email-form">
                        <div class="row">
                            <div class="col-lg-12 col-md-6 form-group">
                                <input type="text" name="username" class="form-control" 
                                value={formData.username} id="username"
                                onChange={handleChange} autoComplete="off"
                                placeholder="Email / Username" required
                                />
                            </div>
                            <div class="col-lg-12 col-md-6 form-group mt-3 mt-md-0">
                                <input type="password" class="form-control" name="password" placeholder="Password" id="password"
                                value={formData.password}
                                onChange={handleChange}/>
                            </div>
                        </div>
                        <span style={{ color: "red" }}>{errorMessage}</span>
                        <div class="text-center mt-4">
                            <a href="register" class="hyper-link" >Doesn't Have an Account ? Register Now</a>
                        </div>
                        <div class="text-center mt-1"><button type="submit">Login</button></div>
                        
                    </form>                
                </div>

            </div>
        </div>
    );
};

export default Login;
