import './App.css';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import About from './components/About.js';
import NoteState from './context/notes/NoteState.js';
import {createBrowserRouter , RouterProvider} from 'react-router-dom'
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Alert from './components/Alert.js';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';


function App() {
  const [alert,setAlert]= useState(null);
  const showAlert = (message , type) =>{
    setAlert({
      msg: message,
      type: type,
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  const router = createBrowserRouter([
    {
    path: "/",
    element: <><Navbar/><Alert alert={alert}/><Home showAlert={showAlert}/></>
    },
    {
      path: "/About",
      element: <><Navbar/><About/></>
    },
    {
      path: "/Login",
      element: <><Navbar/><Alert alert={alert}/><Login showAlert={showAlert}/></>
    },
    {
      path: "/SignUp",
      element: <><Navbar/><Alert alert={alert}/><Signup showAlert={showAlert}/></>
    }
  ])
  return (
    <div className="App">
      <NoteState>
        <RouterProvider router={router} />
      </NoteState>
    </div>
  );
}

export default App;
