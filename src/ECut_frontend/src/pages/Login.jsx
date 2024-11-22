import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Replace with your form submission logic
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-white text-tertiary space-y-6 md:space-y-0">
            <div className="flex flex-col justify-center w-full max-w-md p-8 bg-opacity-50 rounded-l-lg shadow-lg backdrop-blur-lg md:h-[80vh]">
                <h2 className="text-3xl font-semibold text-center mb-6">Welcome Back to ECut</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="peer w-full px-4 py-2 text-lg bg-transparent border rounded-lg focus:outline-none focus:ring-2"
                        />
                        <label className="absolute left-4 -top-3.5 px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-3.5 peer-focus:left-4">
                            Username
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="peer w-full px-4 py-2 text-lg bg-transparent border rounded-lg focus:outline-none focus:ring-2"
                        />
                        <label className="absolute left-4 -top-3.5 px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-3.5 peer-focus:left-4">
                            Email
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="peer w-full px-4 py-2 text-lg bg-transparent border rounded-lg focus:outline-none focus:ring-2"
                        />
                        <label className="absolute left-4 -top-3.5 px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-3.5 peer-focus:left-4">
                            Password
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="peer w-full px-4 py-2 text-lg bg-transparent border rounded-lg focus:outline-none focus:ring-2"
                        />
                        <label className="absolute left-4 -top-3.5 px-1 text-sm transition-all transform peer-placeholder-shown:top-3 peer-placeholder-shown:left-4 peer-focus:-top-3.5 peer-focus:left-4">
                            Confirm Password
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-lg font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-primary/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    >
                        Enter
                    </button>
                </form>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center md:h-[80vh]">
                <img src="./login.jpg" alt="Login Visual" className="w-full h-full object-cover rounded-r-lg shadow-lg" />
            </div>
        </div>
    );
};

export default Login;
