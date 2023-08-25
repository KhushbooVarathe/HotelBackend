import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import baseUrl from '../config/Config'
import { toast } from 'react-toastify' // Import the toast object

function SignUp () {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    image: null,
    address: '',
    DOB: '',
    city: ''
    ,number:''
  })

  const navigate = useNavigate()

  function handleChange (e) {
    if (e.target.name === 'image') {
      setData({ ...data, [e.target.name]: e.target.files[0] })
    } else if (e.target.name === 'isAdmin') {
      setData({ ...data, [e.target.name]: true })
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  function handleSubmit (e) {
    e.preventDefault()

    try {
      const formData = new FormData()
      formData.append('username', data.username)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('isAdmin', data.isAdmin)
      formData.append('image', data.image)
      formData.append('address', data.address)
      formData.append('DOB', data.DOB)
      formData.append('city', data.city)
      formData.append('mobile', data.number)

      axios
        .post(`${baseUrl}/api/register`, formData)
        .then(res => {
          if (res.data.newData === false) {
            toast.success('Account created successfully', {
              position: toast.POSITION.TOP_RIGHT
              // autoClose: 3000,
            })
            navigate('/login')
          }
        })
        .catch(error => {
          console.error('An error occurred:', error)
          // Handle the error here, you can show an error message to the user

          toast.error('An error occurred. Please try again', {
            position: toast.POSITION.TOP_RIGHT
            // autoClose: 3000,
          })
        })
    } catch (error) {
      // console.error("An error occurred:", error);
      // Handle the error here, you can show an error message to the user
      toast.error('An error occurred. Please try again later', {
        position: toast.POSITION.TOP_RIGHT
        // autoClose: 3000,
      })
    }
  }

  return (
    <>
      <div className='d-flex'>
        <div
          style={{
            width: '900px',
            marginLeft: '700px',
            marginTop: '20px'
          }}
          className='bg-light p-5'
        >
          <h1 className='bg-dark text-center text-light p-2'>SignUp</h1>
          <form
            className='text-dark'
            method='POST'
            encType='multipart/form-data'
          >
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
            <div className='form-group'>
                  <label htmlFor='number'>Mobile No:</label>
                  <input
                    type='text'
                    className='form-control'
                    id='number'
                    placeholder='Enter Number'
                    name='number'
                    value={data.number}
                    onChange={handleChange}
                    maxLength={10} 
                    required
                  />
                </div>
            {/* New image upload */}
            <div className='form-group'>
              <label htmlFor='image'>Profile Image:</label>
              <input
                type='file'
                className='form-control'
                id='image'
                name='image'
                accept='image/*'
                onChange={handleChange}
              />
            </div>
            {/* New address field */}
            <div className='form-group'>
              <label htmlFor='address'>Address:</label>
              <input
                type='text'
                className='form-control'
                id='address'
                placeholder='Enter address'
                name='address'
                value={data.address}
                onChange={handleChange}
                required
              />
            </div>
            {/* New DOB field */}
            <div className='form-group'>
              <label htmlFor='DOB'>Date of Birth:</label>
              <input
                type='date'
                className='form-control'
                id='DOB'
                name='DOB'
                value={data.DOB}
                onChange={handleChange}
                required
              />
            </div>
            {/* New city field */}
            <div className='form-group'>
              <label htmlFor='city'>City:</label>
              <input
                type='text'
                className='form-control'
                id='city'
                placeholder='Enter city'
                name='city'
                value={data.city}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type='submit'
              className='btn btn-primary'
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUp
