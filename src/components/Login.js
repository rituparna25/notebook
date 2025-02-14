/*import React, { useState } from 'react'

const Login = () => {
    const [credentials , setCredentials] = useState({email: "",password: ""})
   
    const handleSubmit= async(e)=>{
        e.preventDefault();
        fetch("http://localhost:5000/api/auth/login")
            const response = await fetch("http://localhost:5000/api/auth/login", {
              method: "POST", // Use GET instead of POST
              body: JSON.stringify({ email: credentials.email,password: credentials.password }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            const json = await response.json()
            console.log(json)
    }
    const onChange  = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
        }
  return (
    <div>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlfor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} onChange = {onChange} name="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlfor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange = {onChange} id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
       // Navigate to home page after successful login
      props.showAlert("Logged-In Successfully","success")
      navigate("/");
    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
  } catch (error) {
    console.error("Error during login:", error);
    props.showAlert("Something went wrong. Please try again.", "danger");
  }

  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
return(
  
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
