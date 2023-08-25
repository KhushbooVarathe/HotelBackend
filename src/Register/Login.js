import React, { useState } from 'react'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'

import baseUrl from '../config/Config';
import { toast } from 'react-toastify'; // Import the toast object

function Login () {
  const [data, setData] = useState({})
  const navigate = useNavigate()
  function handleChange (e) {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  function handleSubmit(e) {
    e.preventDefault();
  
    try {
      axios.post(`${baseUrl}/api/login`, data)
        .then(res => {
          if (typeof res.data === 'string') {
            toast.error(res.data, {
              position: toast.POSITION.TOP_RIGHT,
              // autoClose: 3000,
            });
          } else {
            if (res.data.isAdmin === false) {
              localStorage.setItem('name', JSON.stringify(res.data.user));
              localStorage.setItem('token', JSON.stringify(res.data.token));
              localStorage.setItem('isAdmin', JSON.stringify(res.data.isAdmin));
              localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
              toast.success(res.data.data, {
                position: toast.POSITION.TOP_RIGHT,
                // autoClose: 3000,
              });
              navigate('/home');
            } else {
              toast.error("You are not authorized", {
                position: toast.POSITION.TOP_RIGHT,
                // autoClose: 3000,
              });
              navigate('/login');
            }
          }
        })
        .catch(error => {
          // console.error("An error occurred:", error);
          toast.error("An error occurred. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
            // autoClose: 3000,
          });
        });
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error here, you can show an error message to the user
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        // autoClose: 3000,
      });
    }
  }
  
  return (
    <>
      <div
        style={{ height: '500px', width: '500px' ,marginLeft:'750px',marginTop:'100px',padding:'20px'}}
        className='bg-light '
      >
        <div className='text-center'>

       <img className="rounded-circle"  src='profile.png' height="100px"/>
       <p> <h4>LOGIN</h4></p>
        </div>
        {/* <h1 className='bg-dark text-center text-light p-2'>LOGIN_ADMIN</h1> */}
        <form className='text-warning'>
          {/* <div className='form-group'>
            <label htmlFor='username'>Username:</label>
            <input
              type='email'
              className='form-control'
              id='username'
              placeholder='Enter username'
              name='username'
              value={data.username}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter email'
              name='email'
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              name='password'
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='text-center'>

          <button
            type='submit'
            className='btn btn-primary px-4 py-3'
            onClick={handleSubmit}
          >
            Login
          </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;
