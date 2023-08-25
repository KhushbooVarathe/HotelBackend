import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import Intercepter from '../intercepter/Intercepter';
import baseUrl from '../config/Config';
import img from '../Images/img1.jpg';

function Profile() {
  const auth = JSON.parse(localStorage.getItem('token'));
  const [data, setData] = useState({});
  const [data1, setData1] = useState({});
const[dataget,setDataGet]=useState(false)
  var decoded = jwt_decode(auth);

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/getoneUser/${decoded.id}`)
        .then(res => {
          setData(res.data);
          console.log('res.data: ', res.data);
          setData1(res.data);
        })
        .catch(error => {
          toast.error('An error occurred. Please try again.', {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }, [dataget]);

  function handleupdateChange(e) {
    setData1({ ...data1, [e.target.name]: e.target.value });
  }

  async function handleUpdateSubmit(e) {
    e.preventDefault();

    try {
      await axios.put(`${baseUrl}/api/updateUser/${decoded.id}`, data1).then(res=>{
        // console.log('res: ', res.data);
        setDataGet(!dataget)
        // setData(res.data)
      });
      toast.success('Profile updated successfully', {
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  return (
    <>
      <Intercepter />
      <div className='text-left ml-5 mt-3'>
        <Link className='btn btn-warning ml-3' to='/home'>
          Go Back
        </Link>
      </div>

      <div
        className='mt-5 '
        style={{ height: '500px', width: '500px', marginLeft: '700px' }}
      >
        <div className='card bg-light '>
          <div className='text-center '>
            <img
              className='card-img-top rounded-circle'
              src={data.photoUrl}
              alt='Card image'
              style={{ height: '150px', width: '150px' }}
            />
          </div>

          <div className='card-body'>
  <h4 className='card-title'>Name: {data.username}</h4>
  <p className='card-text'>Email: {data.email}</p>
  <p className='card-text'>City: {data.city}</p>
  <p className='card-text'>Address: {data.address}</p>
  <p className='card-text'>DOB: {data.DOB}</p>
  <p className='card-text'>Mobile No: {data.mobile}</p>
  <br />
  <Link
    className='btn btn-warning'
    data-toggle='collapse'
    data-target='#demo'
  >
    Edit Profile
  </Link>
</div>

          <div id='demo' className='collapse'>
            <form onSubmit={handleUpdateSubmit}>
              <label>Name:</label>
              <br />
              <input
                type='text'
                name='username'
                value={data1.username}
                onChange={handleupdateChange}
              />
              <br />
              <label>Email:</label>
              <br />
              <input
                type='text'
                name='email'
                value={data1.email}
                onChange={handleupdateChange}
              />
              <br />
              <label>Mobile No:</label>
              <br />
              <input
                type='text'
                name='mobile'
                value={data1.mobile}
                onChange={handleupdateChange}
              />
              <br />
              <button type='submit' className='btn btn-primary'>
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
