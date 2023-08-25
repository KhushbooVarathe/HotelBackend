import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SideBarAdmin from './SideBarAdmin';
import baseUrl from '../config/Congif'
import Intercepter from '../intercepter/Intercepter';
import { toast } from 'react-toastify';

function Profile() {

  const auth = localStorage.getItem('token');
  const [data, setData] = useState({});
  const [newdata, setNewData] = useState({});
  const [dataget, setDataGet] = useState(false);

  var decoded = jwt_decode(auth);

  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/getoneUser/${decoded.id}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          setNewData(res.data);
        });
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
      toast.error('An error occurred', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }, [dataget]);

 

  async function updateProfile(id) {
    try {
      await axios.put(`${baseUrl}/api/updateUser/${id}`, newdata);
      setDataGet(!dataget);
      toast.success('Profile updated successfully', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error);
      toast.error('An error occurred', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  return (
    <div className="d-flex">
      <Intercepter />
      <SideBarAdmin />
      <div className="m-5">
        {' '}
        <Link className="btn btn-warning " to="/home">
          Go Back
        </Link>
      </div>
      <div className="container mt-5 p-5 ">
        <h1 className="text-center p-3 text-light">Your Profile</h1>
        <div className="container card" style={{ width: '300px' }}>
          <img
            className="card-img-top rounded-circle"
            src={data.photoUrl}
            alt="Card"
          />
          <button
            className="btn btn-warning mt-4"
            data-toggle="collapse"
            data-target="#demo1"
          >
            Edit <i className="material-icons" />
          </button>
          <div id="demo1" className="collapse">
            <form>
              <div className="form-group">
                <label htmlFor="username">New UserName:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter New Username"
                  value={newdata.username || ''}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">New Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={newdata.email || ''}
                  name="email"
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="number">Number:</label>
                <input
                  type="text"
                  className="form-control"
                  id="number"
                  placeholder="Enter Number"
                  value={newdata.mobile || ''}
                  name="mobile"
                  onChange={handleChange}
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => updateProfile(data._id)}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <hr />
          <div className="card-body">
            <Link
              className="btn btn-primary"
              data-toggle="collapse"
              data-target="#demo"
            >
              See Profile
            </Link><br/><br/>
            <div id="demo" className="collapse">
              <h6 className="card-title">Name: {data.username}</h6>
              <h6 className="card-title">Email: {data.email}</h6>
              <h6 className="card-title">Date-of-Birth: {data.DOB}</h6>
              <h6 className="card-title">Address: {data.address}</h6>
              <h6 className="card-title">City: {data.city}</h6>
              <h6 className="card-title">Mob. number: {data.mobile}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
