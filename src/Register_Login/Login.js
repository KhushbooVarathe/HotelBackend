import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login () {
  const [data, setData] = useState({})
  const navigate = useNavigate()
  function handleChange (e) {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  function handleSubmit (e) {
    e.preventDefault()
    console.log(data, 'data')
    axios.post('https://backend-eoh8.onrender.com/api/login', data).then(res => {
      console.log(res.data, 'gggggggg')
      if (typeof res.data == 'string'){
        console.log(res.data)
        alert(res.data)
      }else{
        if(res.data.isAdmin == true){
      localStorage.setItem('name', JSON.stringify(res.data.user))
      localStorage.setItem('token', JSON.stringify(res.data.token))
      localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken))
      localStorage.setItem('isAdmin', JSON.stringify(res.data.isAdmin))
      alert(res.data.data)
      navigate('/home')
        }else{
          alert('you are not authorized')
          navigate('/login')
        }
      }
    })
  }
  return (
    <>
      <div
        style={{ height: '500px', width: '500px' ,marginLeft:'750px',marginTop:'100px',padding:'20px'}}
        className='bg-light '
      >
        <div className='text-center'>

       <img className="rounded-circle"  src='../images.jpeg' height="100px"/>
       <p> <h4>LOGIN</h4></p>
        </div>
        {/* <h1 className='bg-dark text-center text-light p-2'>LOGIN_ADMIN</h1> */}
        <form className='text-warning'>
          <div className='form-group'>
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
          </div>
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

export default Login
