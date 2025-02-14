import React ,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "",cpassword: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password,cpassword:credentials.cpassword }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if(json.success){
        console.log(json);
          localStorage.setItem('token', json.authtoken);
          navigate("/"); // Navigate to home page after successful login
          props.showAlert("Account Created Successfully","success")
        }
        else{
          props.showAlert("Invalid Credentials","danger")
        }
      };
    
      const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-start mb-4">Create an Account: </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-start">
                  <label htmlFor="name" className="form-label fw-bold">Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name"
                    value={credentials.name}
                    onChange={onChange}
                    required 
                    minLength={3}
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="email" className="form-label fw-bold">Email address</label>
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
                  <label htmlFor="password" className="form-label fw-bold">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    name="password"
                    value={credentials.password}
                    onChange={onChange}
                    required 
                    minLength={5}
                  />
                </div>
                <div className="mb-3 text-start">
                  <label htmlFor="cpassword" className="form-label fw-bold">Confirm Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="cpassword" 
                    name="cpassword"
                    value={credentials.cpassword}
                    onChange={onChange}
                    required 
                    minLength={5}
                  />
                </div>
                <div className="justify-content-center">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                </div>
              </form>
              <div className="text-center mt-3">
                <p>Already have an account?  <a href="/login">Login</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup
