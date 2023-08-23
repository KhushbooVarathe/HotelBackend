import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from 'react'
import { Navigate,Outlet } from 'react-router-dom';
function PrivateComponent() {
  // const[tokenstatus,setTokenStatus]=useState()
    const auth=JSON.parse(localStorage.getItem('token'));
    // if(typeof auth == undefined){
    //   <Navigate to='/login'/>
    // }
    var decoded = jwt_decode(auth);
// console.log(decoded, 'decodeddd', decoded.exp * 1000 > Date.now());

if (decoded.exp * 1000 > Date.now()) {
  // console.log("Token is not expired");
  // setTokenStatus(true)
} else {
  // console.log("Token has expired");/
  // setTokenStatus(false)
}
  return (
    <>
 {  decoded?<Outlet/>:<><Navigate to='/login'/> 

 </>}
   
   </>
  )
}

export default PrivateComponent