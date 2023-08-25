import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import config from '../config/Congif'
import Intercepter from '../intercepter/Intercepter'
import { toast } from 'react-toastify'
function AddHot () {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    distance: '',
    desc: '',
    cheapestprice: '',
    rating: '',
    image: null
  })

  const handleChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()

    // Create a FormData object to handle file uploads
    const formDataToSend = new FormData()

    // Append the non-image form data
    formDataToSend.append('name', formData.name)
    formDataToSend.append('type', formData.type)
    formDataToSend.append('city', formData.city)
    formDataToSend.append('address', formData.address)
    formDataToSend.append('distance', formData.distance)
    formDataToSend.append('desc', formData.desc)
    formDataToSend.append('cheapestprice', formData.cheapestprice)
    formDataToSend.append('rating', formData.rating)
    formDataToSend.append('image', formData.image)

    try {
      axios.post(`${config}/api/createHotels`, formDataToSend).then(res => {
        toast.success(res.data, {
          position: toast.POSITION.TOP_RIGHT
          // autoClose: 3000, // Auto close the toast after 3 seconds
        })
        navigate('/contact')
      })
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error)
      // You can show an error toast or take any other appropriate action
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  return (
    <>
      <Intercepter />
      <Link className='btn btn-warning' to='/contact'>Go back</Link>

      <div className='container mt-5 bg-secondary text-light p-5'>
        <h1 className='text-center mb-4 bg-dark text-light p-3'>
          Add a New Hotel
        </h1>
        <form
          onSubmit={handleSubmit}
          method='POST'
          encType='multipart/form-data'
        >
          <div className='form-group'>
            <label htmlFor='name'>
              <h5>Name:</h5>
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='type'>
              <h5>Type:</h5>
            </label>
            <input
              type='text'
              className='form-control'
              id='type'
              name='type'
              value={formData.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='city'>
              <h5>City:</h5>
            </label>
            <input
              type='text'
              className='form-control'
              id='city'
              name='city'
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='address'>
              <h5>Address:</h5>
            </label>
            <input
              type='text'
              className='form-control'
              id='address'
              name='address'
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='distance'>
              <h5>Distance:</h5>
            </label>
            <input
              type='text'
              className='form-control'
              id='distance'
              name='distance'
              value={formData.distance}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='image'>
              <h5>Images:</h5>
            </label>
            <input
              type='file'
              className='form-control'
              id='image'
              name='image'
              multiple
              onChange={handleChange}
              accept='image/*'
            />
          </div>
          <div className='form-group'>
            <label htmlFor='desc'>
              <h5>Description:</h5>
            </label>
            <textarea
              className='form-control'
              id='desc'
              name='desc'
              value={formData.desc}
              onChange={handleChange}
              rows='3'
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='cheapestprice'>
              <h5>Cheapest Price:</h5>
            </label>
            <input
              type='number'
              className='form-control'
              id='cheapestprice'
              name='cheapestprice'
              value={formData.cheapestprice}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='rating'>
              <h5>Rating:</h5>
            </label>
            <input
              type='number'
              className='form-control'
              id='rating'
              name='rating'
              value={formData.rating}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' className='btn btn-info'>
            Add Hotel
          </button>
        </form>
      </div>
    </>
  )
}

export default AddHot
