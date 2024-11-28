import React, { useState, useEffect } from 'react';
import NavigationBar from '../component/navbar/Navbar';
import { ECut_backend } from 'declarations/ECut_backend';
import { useNavigate } from "react-router-dom";
const Register = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        
        e.preventDefault();
        if (formData.password != formData.confirmPassword)
        {
            setErrorMessage("Password Doesn't match!");
        }
        else
        {            
            setErrorMessage("");
            window.showLoader();
            ECut_backend.create_user(formData).then((result) => {
                console.log(result)
                navigate("/");
            })
        
            console.log("submitted"); // Replace with your form submission logic
        }
        console.log(formData); // Replace with your form submission logic
    };

    return (
        <div>
            <NavigationBar />
            <div className="flex flex-col md:flex-col items-center justify-center min-h-screen text-tertiary space-y-6 md:space-y-0 login-background">
                <div class="book-a-table w-50" data-aos="fade-up" data-aos-delay="100">
                    <div class="section-title">
                        <h2>Register</h2>
                        <p>Welcome to ECut</p>
                    </div>

                    <form onSubmit={handleSubmit} role="form" class="php-email-form">
                        <div class="row">
                            <div class="col-lg-12 col-md-6 form-group">
                                <input type="text" name="userName" class="form-control" 
                                value={formData.username} id="username"
                                onChange={handleChange} autoComplete="off"
                                placeholder="Username" required
                                />
                            </div>
                            <div class="col-lg-12 col-md-6 form-group">
                                <input type="text" name="userEmail" class="form-control" 
                                value={formData.email} id="email"
                                onChange={handleChange} autoComplete="off"
                                placeholder="Email" required
                                />
                            </div>
                            <div class="col-lg-12 col-md-6 form-group mt-3 mt-md-0">
                                <input type="password" class="form-control" name="userPassword" placeholder="Password" id="password"
                                value={formData.password} required
                                onChange={handleChange}/>
                            </div>
                            <div class="col-lg-12 col-md-6 form-group mt-3 mt-md-0">
                                <input type="password" class="form-control" name="userConfirmPassword" placeholder="Confirm Password" id="confirmPassword"
                                value={formData.confirmPassword} required
                                onChange={handleChange}/>
                            </div>
                        </div>
                        <span style={{ color: "red" }}>{errorMessage}</span>
                        <div class="text-center mt-4"><button type="submit">Register</button></div>                        
                    </form>                
                </div>

            </div>
        </div>
    );
};

export default Register;
