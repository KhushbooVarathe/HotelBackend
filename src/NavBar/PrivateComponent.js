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
//===============dropdown for delete hotel and rooms==============================//
{/* <div class="dropdown mt-0">
<button type="button" class="btn btn-primary dropdown-toggle p-3" data-toggle="dropdown" style={{ marginLeft: '1600px' }}>
 Delete Dropdown 
</button>
<div class="dropdown-menu">
  <h5 class="dropdown-header">DELETE HOTELS</h5>
  <Link class="dropdown-item" 
   data-toggle='collapse'
   data-target='#demo1'
   >DELETE</Link>
  
  <h5 class="dropdown-header">DELETE ROOMS</h5>
  <a class="dropdown-item" >DELETE</a>
</div>
</div> */}