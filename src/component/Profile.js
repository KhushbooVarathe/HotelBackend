import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Intercepter from '../intercepter/Intercepter'

function Profile() {
  const auth = JSON.parse(localStorage.getItem('token'))
  const [data, setData] = useState({})
  //   const[newdata,setNewData]=
    // console.log('auth: ', auth);
  var decoded = jwt_decode(auth)
    // console.log(decoded.id,"decoded.id");
    useEffect(() => {
      axios
        .get(`https://backend-eoh8.onrender.com/api/getoneUser/${decoded.id}`)
        .then(res => {
          // console.log(res.data)
          setData(res.data)
        })
    }, [])
  return (
   <>
   <Intercepter/>
    {/* {data && data.map(ob=> */}
    <div className='mt-5 '
     style={{height:'500px', width:'600px',marginLeft:'600px'}}>
    <div className="card  bg-light " style={{height:'500px', width:'500px'}}>
   {/* {ob.} */}
      <img className="card-img-top rounded-circle" src="favicon.ico" alt="Card image" style={{height:'250px', width:'250px'}} />
      <div className="card-body">
        <h4 className="card-title">Name:{data.username}</h4>
        <p className="card-text">Email:{data.email}</p>
        {/* <a href="#" className="btn btn-primary stretched-link">See Profile</a> */}
      </div>
    </div>
    </div>
  
      {/* )} */}
 
   </>
  )
}

export default Profile