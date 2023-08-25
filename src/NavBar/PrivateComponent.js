import React from 'react';
import jwt_decode from "jwt-decode";
import { Navigate,Outlet } from 'react-router-dom';
import Profile from '../Components/Profile';
function PrivateComp() {
    const auth=JSON.parse(localStorage.getItem('token'))
    // if(typeof auth == undefined){
    //   <Navigate to='/login'/>
    // }
    // console.log('auth: ', auth);
    var decoded = jwt_decode(auth);
    // console.log(decoded);
  return (
    <>
 {  decoded?<Outlet/>:<Navigate to='/login'/>}
   
   </>
  )
}

export default PrivateComp
