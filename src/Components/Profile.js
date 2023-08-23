import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import SideBarAdmin from './SideBarAdmin'

function Profile () {
  const navigate = useNavigate()
  const auth = localStorage.getItem('token')
  const [data, setData] = useState({})
  //   const[newdata,setNewData]=
  //   console.log('auth: ', auth);
  var decoded = jwt_decode(auth)
  //   console.log(decoded.id);
  useEffect(() => {
    axios
      .get(`https://backend-eoh8.onrender.com/api/getoneUser/${decoded.id}`)
      .then(res => {
        console.log(res.data)
        setData(res.data)
      })
  }, [])

  function ShowData (e) {
    e.preventDefault()
    navigate('/profile')
  }
  function updateProfile (id) {
    console.log(id, 'eeeeee', id)
    // e.preventDefault();
    axios.put(`https://backend-eoh8.onrender.com/api/updateUsers/${id}`, data).then(res => {
      console.log(res.data)
    })
  }
  function handleChange (e) {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  function handlePhotoChange (e) {
    // const file = e.target.files[0];
    setData({ ...data, photos: e.target.files[0] })
  }
  console.log(data, 'newdatfrggfdgfdgdfaa')

  return (
    <div className='d-flex'>
    <SideBarAdmin/>
    <div className='container mt-5 p-5 '>
      <h1 className='text-center p-3 text-light'>YOUR__Profile</h1>

      <div className='container card' style={{ width: '300px' }}>
        <img
          className='card-img-top rounded-circle'
          src='images.jpeg' 
          // style={{height:'100px',width:'100px'}}
          alt='Card image'
        />
        <Link
          className='btn btn-warning mt-4'
          data-toggle='collapse'
          data-target='#demo1'
          // onClick={updateProfile(data._id)}
        >
          Edit
          {/* <i className="material-icons"/> */}
        </Link>
        <div id='demo1' class='collapse'>
          <form>
            <div class='form-group'>
              <label for='username'>New_UserName:</label>
              <input
                type='email'
                class='form-control'
                id='username'
                placeholder='Enter New Username'
                value={data.username}
                name='username'
                onChange={handleChange}
              />
            </div>
            <div class='form-group'>
              <label for='email'>New_Email:</label>
              <input
                type='email'
                class='form-control'
                id='email'
                placeholder='Enter email'
                value={data.email}
                name='email'
                onChange={handleChange}
              />
            </div>
            <div class='form-group'>
              <label for='password'>New_Password:</label>
              <input
                type='password'
                class='form-control'
                id='password'
                placeholder='Enter password'
                name='password'
                onChange={handleChange}
              />
            </div>
            <div className='text-center'>
              <div class='form-group'>
                <input
                  type='file'
                  className='form-control'
                  id='photos'
                  name='photos'
                  onChange={handlePhotoChange}
                />
              </div>
              <Link
                type='submit'
                class='btn btn-primary'
                onClick={() => updateProfile(data._id)}
              >
                Submit
              </Link>
            </div>
          </form>
        </div>
        <hr />
        <div className='card-body'>
          {/* <h6 className='card-title'>Name: {data.username && data.username}</h6> */}
          <Link
            className='btn btn-primary'
            data-toggle='collapse'
            data-target='#demo'
          >
            See Profile
          </Link>
          <div id='demo' class='collapse'>
            Name:
            <h6 className='card-title'>{data.username && data.username}</h6>
            Email: <h6 className='card-title'>{data.email && data.email}</h6>
            Date-of-Birth: <h6 className='card-title'>{data.DOB && data.DOB}</h6>
            {/* Date-of-joining: <h6 className='card-title'>{data.email && data.email}</h6> */}
            address: <h6 className='card-title'>{data.address && data.address}</h6>
            city: <h6 className='card-title'>{data.city && data.city}</h6>
          </div>
          {/* <details>hyghghgh</details> */}
        </div>
      </div>
    </div>

    </div>
  )
}

export default Profile
