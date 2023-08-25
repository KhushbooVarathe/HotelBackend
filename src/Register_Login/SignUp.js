import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SideBarAdmin from '../Components/SideBarAdmin'
import baseUrl from '../config/Congif'
import { toast } from 'react-toastify'
function SignUp () {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    number:'',
    isAdmin: false,
    image: null,
    address: '',
    DOB: '',
    city: ''
   
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
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('mobile', data.number)
    formData.append('isAdmin', data.isAdmin)
    formData.append('image', data.image)
    formData.append('address', data.address)
    formData.append('DOB', data.DOB)
    formData.append('city', data.city)

    console.log('formData: ', formData);
    

    try {
      axios.post(`${baseUrl}/api/register`, formData).then(res => {
        console.log('res.data: ', res.data);
        if (res.data.newData === true) {
        
          toast.success('Registered successfully!', {
            position: toast.POSITION.TOP_RIGHT
          });
          navigate('/home');
        } else if (res.data.error === 'Email is already registered') {
          toast.error(res.data.error, {
            position: toast.POSITION.TOP_RIGHT
          });
         
        } else {
          toast.error('An error occurred during registration.', {
            position: toast.POSITION.TOP_RIGHT
          });
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  // console.log(data,"dataaaaaaaaaa")
  return (
    <>
      <div className='d-flex'>
        <SideBarAdmin />

        <div className='row ml-5 mt-5'>
          <div class='col-sm-12'>
            {' '}
            <Link className='btn btn-warning' to='/home'>
              Go Back
            </Link>
          </div>
        </div>
        <div className='container mt-5'>
          <div className='row justify-content-center'>
            <div className='col-md-8 bg-light p-5'>
              <h1 className='bg-dark text-center text-light p-2'>
                CREATE ADMIN
              </h1>
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
                {/* New image upload */}
                <div className='form-group'>
                  <label htmlFor='image'>Profile Image:</label>
                  <input
                    type='file'
                    className='form-control-file'
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
                {/* New isAdmin checkbox */}
                <div className='form-group'>
                  <div className='form-check'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='isAdmin'
                      name='isAdmin'
                      checked={data.isAdmin}
                      onChange={handleChange}
                    />
                    <label className='form-check-label' htmlFor='isAdmin'>
                      Is Admin
                    </label>
                  </div>
                </div>
                <button
                  type='submit'
                  className='btn btn-primary'
                  onClick={handleSubmit}
                  disabled={
                    !data.username ||
                    !data.email ||
                    !data.password ||
                    !data.number ||
                    !data.address ||
                    !data.DOB ||
                    !data.city
                  }
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp
