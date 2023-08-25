import React from 'react'
import './home.css';
import { Link, useNavigate,useLocation } from 'react-router-dom';
import Intercepter from '../intercepter/Intercepter';
function SideBarAdmin() {
    const navigate = useNavigate()
    const location = useLocation(); 
    function logoutfun () {
      localStorage.clear()
      navigate('/login')
    }
  return (
    <>
    <Intercepter/>
    <div className="sidenav text-center">
         <Link className='btn btn-light' to='/login'  onClick={logoutfun}>Logout</Link>
  <Link to="/profile"  className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>
  <Link to="/videocall"  className={location.pathname === '/profile' ? 'active' : ''}>videocall</Link>
  <Link to="/newadmin"  className={location.pathname === '/newadmin' ? 'active' : ''}>Create Admin</Link>
  {/* <Link to="/admin">Admins</Link> */}
  <Link to="/seebooking" className={location.pathname === '/seebooking' ? 'active' : ''}>See Booking</Link>
  <Link to="/registeredUsers" className={location.pathname === '/registeredUsers' ? 'active' : ''}>Users</Link>
  <Link to="/contact"  className={location.pathname === '/contact' ? 'active' : ''}>Add Hotels</Link>
</div>
</>
  )
}

export default SideBarAdmin