import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://inotebook-backend-wpn2.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
      
      const json = await response.json();
      console.log("Login response:", json);
      
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        props.showAlert("Logged-In Successfully", "success");
        navigate("/");
      } else {
        // Handle failed login (invalid credentials)
        props.showAlert(json.error || "Invalid Credentials", "danger");
      }
    } catch (error) {
      console.error("Error during login:", error);
      props.showAlert("Something went wrong. Please try again.", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <h1 className="card-title text-center mb-4">Welcome Back!!</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="mb-4">Please login to continue</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label htmlFor="email" className="form-label fw-bold">Enter Your Email address : </label>
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    required 
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="password" className="form-label fw-bold">Enter the Password: </label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    required 
                  />
                </div>
                <div className="justify-content-center">
                  <button type="submit" className="btn btn-primary">Login</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;