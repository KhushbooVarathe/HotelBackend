import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddHot () {
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    distance: '',
    desc: '',
    cheapestprice: '',
    rating: '',
    image: null,
  })

  const handleChange = e => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    // console.log('formData: ', formData);
  }

  const handleSubmit = e => {
    e.preventDefault()
    const token = JSON.parse(localStorage.getItem('token'))
    // console.log(token, typeof token)
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    // console.log(isAdmin, 'isAdmin')

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
    // Append the images to FormData
    // formData.photos.forEach((image, index) => {
    //   formDataToSend.append(`image_${index}`, image)
    //   console.log('formDataToSend: ', formDataToSend)
    // })

    // Send the FormData object to the server
    axios
      .post('https://backend-eoh8.onrender.com/api/createHotels', formDataToSend
      // , {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     isAdmin: `${isAdmin}`
      //   }
      // }
      )
      .then(res => {
        // console.log(res.data, 'ressss')
        alert(res.data)
        navigate('/contact')
      })
  }

  //   const handleChange = (e) => {
  //     if (e.target.name === 'photos') {
  //       const selectedImages = Array.from(e.target.files);
  //       setFormData({ ...formData, [e.target.name]: selectedImages });
  //     } else {
  //       setFormData({ ...formData, [e.target.name]: e.target.value });

  //     }
  //   };
  //   const formDataToSend = new FormData();
  //     formDataToSend.append('name', formData.name);
  // formDataToSend.append('type', formData.type);
  // formDataToSend.append('city', formData.city);
  // formDataToSend.append('address', formData.address);
  // formDataToSend.append('distance', formData.distance);
  // formDataToSend.append('desc', formData.desc);
  // formDataToSend.append('cheapestprice', formData.cheapestprice);
  // formDataToSend.append('rating', formData.rating);

  // // Append the images to FormData
  // formData.photos.forEach((image, index) => {
  //   formDataToSend.append(`image_${index}`, image);
  // });
  //   const handleSubmit = (e) => {
  //     const token=JSON.parse(localStorage.getItem('token'))
  //     console.log(token,typeof token)
  //     const isAdmin=JSON.parse(localStorage.getItem('isAdmin'))
  //     console.log(isAdmin,"isAdmin",formDataToSend)
  //     e.preventDefault();

  //     axios.post('http://localhost:7000/api/createHotels',{formDataToSend,token,isAdmin}).then(res=>{
  //         console.log(res.data,"ressss")
  //     })
  //     // Handle form submission logic here, e.g., sending data to the server
  //     console.log(formData,formDataToSend);
  //   };
  return (
    <>
      <div className='container mt-5 bg-secondary text-light p-5'>
        <h1 className='text-center mb-4 bg-dark text-light p-3'>
          Add a New Hotel
        </h1>
        <form onSubmit={handleSubmit} method='POST' encType='multipart/form-data'>
          <div className='form-group'>
            <label htmlFor='name'><h5>Name:</h5></label>
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
            <label htmlFor='type'><h5>Type:</h5></label>
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
            <label htmlFor='city'><h5>City:</h5></label>
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
            <label htmlFor='address'><h5>Address:</h5></label>
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
            <label htmlFor='distance'><h5>Distance:</h5></label>
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
            <label htmlFor='image'><h5>Images:</h5></label>
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
            <label htmlFor='desc'><h5>Description:</h5></label>
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
            <label htmlFor='cheapestprice'><h5>Cheapest Price:</h5></label>
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
            <label htmlFor='rating'><h5>Rating:</h5></label>
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
