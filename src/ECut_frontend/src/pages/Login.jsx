import React, { useState, useEffect } from 'react';
import NavigationBar from '../component/navbar/Navbar';
import { ECut_backend } from 'declarations/ECut_backend';
import { useSession } from '../component/session/SessionUtil';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { userInfo, login } = useSession();  
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
        window.showLoader();
        await login(formData.email, formData.password);
        window.hideLoader();

        console.log("submitted"); // Replace with your form submission logic
        console.log(formData); // Replace with your form submission logic
    };

    return (
        <div>
            <NavigationBar />
            <div className="flex flex-col md:flex-col items-center justify-center min-h-screen text-tertiary space-y-6 md:space-y-0 login-background">
                <div className="book-a-table w-50" data-aos="fade-up" data-aos-delay="100">
                    <div className="section-title">
                        <h2>Login</h2>
                        <p>Welcome Back to ECut</p>
                    </div>

                    <form onSubmit={handleSubmit} role="form" className="php-email-form">
                        <div className="row">
                            <div className="col-lg-12 col-md-6 form-group">
                                <input type="email" name="email" className="form-control" 
                                value={formData.email} id="email"
                                onChange={handleChange} autoComplete="off"
                                placeholder="Email" required
                                />
                            </div>
                            <div className="col-lg-12 col-md-6 form-group mt-3 mt-md-0">
                                <input type="password" className="form-control" name="password" placeholder="Password" id="password"
                                value={formData.password}
                                onChange={handleChange}/>
                            </div>
                        </div>
                        <span style={{ color: "red" }}>{errorMessage}</span>
                        <div className="text-center mt-4">
                            <a href="register" className="hyper-link" >Doesn't Have an Account ? Register Now</a>
                        </div>
                        <div className="text-center mt-1"><button type="submit">Login</button></div>
                        
                    </form>                
                </div>

            </div>
        </div>
    );
};

export default Login;
