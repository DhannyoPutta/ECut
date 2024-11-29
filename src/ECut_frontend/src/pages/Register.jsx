import React, { useState, useEffect } from 'react';
import NavigationBar from '../component/navbar/Navbar';
import { ECut_backend } from 'declarations/ECut_backend';
import { useNavigate } from "react-router-dom";
import { useSession } from '../component/session/SessionUtil';
const Register = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userPassword: '',
        userConfirmPassword: ''
    });


    const { userInfo, login } =  useSession();

    useEffect(() => {
        const checkUser = async () => {
          window.showLoader(); // Show the global loader
          try {
            if (userInfo) {
              navigate("/"); // Redirect if logged in
            }
          } finally {
            window.hideLoader(); // Always hide the loader
          }
        };

        checkUser();

    }, [userInfo, navigate])
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        if (formData.password != formData.confirmPassword)
        {
            setErrorMessage("Password Doesn't match!");
        }
        else
        {            
            setErrorMessage("");
            window.showLoader();
            const result = await ECut_backend.create_user(formData)
            await login(result.ok.userEmail, result.ok.userPassword);
            window.hideLoader();
        }
    };

    return (
        <div>
            <NavigationBar />
            <div className="flex flex-col md:flex-col items-center justify-center min-h-screen text-tertiary space-y-6 md:space-y-0 login-background">
                <div className="book-a-table w-50" data-aos="fade-up" data-aos-delay="100">
                    <div className="section-title">
                        <h2>Register</h2>
                        <p>Welcome to ECut</p>
                    </div>

                    <form onSubmit={handleSubmit} role="form" className="php-email-form">
                        <div className="row">
                            <div className="col-lg-12 col-md-6 form-group">
                                <input type="text" name="userName" className="form-control" 
                                value={formData.username} id="username"
                                onChange={handleChange} autoComplete="off"
                                placeholder="Username" required data-rule="minlen:4" data-msg="Please enter at least 4 chars"
                                />
                                <div class="validate"></div>
                            </div>
                            <div className="col-lg-12 col-md-6 form-group">
                                <input type="email" name="userEmail" className="form-control" 
                                value={formData.email} id="email"
                                onChange={handleChange} autoComplete="off"
                                placeholder="Email" required
                                />
                            </div>
                            <div className="col-lg-12 col-md-6 form-group mt-3 mt-md-0">
                                <input type="password" className="form-control" name="userPassword" placeholder="Password" id="password"
                                value={formData.password} required
                                onChange={handleChange}/>
                            </div>
                            <div className="col-lg-12 col-md-6 form-group mt-3 mt-md-0">
                                <input type="password" className="form-control" name="userConfirmPassword" placeholder="Confirm Password" id="confirmPassword"
                                value={formData.confirmPassword} required
                                onChange={handleChange}/>
                            </div>
                        </div>
                        <span style={{ color: "red" }}>{errorMessage}</span>
                        <div className="text-center mt-4"><button type="submit">Register</button></div>                        
                    </form>                
                </div>

            </div>
        </div>
    );
};

export default Register;
