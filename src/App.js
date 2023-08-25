import logo from './logo.svg'
import './App.css'
import Login from './Register/Login'
import UserNavBar from './NavBAr/UserNavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PrivateComponent from './NavBAr/PrivateComponent'
import Profile from './component/Profile'
import Home from './component/Home'
import Rooms from './component/Rooms'
import background from './Images/hotel.jpeg'
// const tokenProvider = require('axios-token-interceptor');
import YourBooking from './bookings/Yourbooking'
import SignUp from './Register/SignUp'
import YourPayment from './payment/YourPayment'
import VideoHome from './videocalling/VideoHome'
import Room from './videocalling/VideoHome'
import Layout from './layout/Layout'
import About from './layout/About'
function App () {
 
  return (
    <div className='App'>
          <div style={{height:'1900px',backgroundImage:`url(${background})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>

      {/* <Login/> */}
      <BrowserRouter>
        <UserNavBar />
        {/* <h1>Welcome to website</h1> */}
        <Routes>
        <Route path='/' element={<Layout/>} />
        <Route path='/about' element={<About/>} />

          <Route element={<PrivateComponent />}>
            <Route path='/home' element={<Home/>} />
            
            <Route path='/profile' element={<Profile />} />
            <Route path='/rooms/:id' element={<Rooms />} />
            <Route path='/yourbooking' element={<YourBooking />} />
            <Route path='/videocall' element={<VideoHome/>} />
            <Route path='/videocall' element={<Room/>} />
            <Route path='/pay' element={<YourPayment/>} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
     </div>
  )
}

export default App
