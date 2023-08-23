import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import Intercepter from '../intercepter/Intercepter'

function Yourbooking () {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  let onedata1

  const token = JSON.parse(localStorage.getItem('token'))
  // console.log(token, typeof token)
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  var decoded = jwt_decode(token)
  // console.log(decoded.id,"he");
  useEffect(() => {
    getBookingData()
  }, [])

  function getBookingData () {
    axios
      .get(
        `https://backend-eoh8.onrender.com/api/yourbooking/${decoded.id}`
        // {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        //   isAdmin: `${isAdmin}`
        //   //   userID:`${decoded.id}`
        // }
        // }
      )
      .then(res => {
        // console.log(res.data, 'booked room data')
        setData(res.data.bookings)
      })
  }
  // console.log(data, 'data')
  // data.map((ob,index)=>{
  //   console.log(index,ob);
  //   ob.booking.map((booked,index1)=>{
  //     console.log(index1,booked);
  //   })

  // })

  function handleCancelBooking (cancelid) {
    // console.log('cancelid: ', cancelid)
    axios
      .put(
        `https://backend-eoh8.onrender.com/api/cancelbooking/${cancelid}`,
        {}
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     isAdmin: `${isAdmin}`,
        //     userID: `${decoded.id}`
        //   }
        // }
      )
      .then(res => {
        // console.log(res.data, 'cancel booking response')
        navigate('/yourbooking')
      })
  }
  return (
    <>
    <Intercepter/>
      <div className='d-flex row m-4'>
        {data.map(ob => (
          <>
            <div class='card m-3' style={{width: '400px' }}>
              <div class='card-header'>
                <h4 className='text-center'>{ob.hotelName}</h4>{' '}
              </div>
              <div class='card-body'>
                <div>
                  <img
                    className='card-img-top rounded-circle'
                    src={ob.roomphotos[0].filename}
                    alt='Card image'
                    style={{ height: '160px', width: '200px' }}
                  />
                </div>
                <hr />
                <div className='text-center'>
                  <label> Rooms: </label>{' '}
                  <h5 className='bg-light p-2 text-danger'>{ob.roomTitle}</h5>
                  <label> ROOM_Number: </label>{' '}
                  <h5 className='bg-light p-2 text-danger'>{ob.roomNumber}</h5>
                  <label> DESC: </label>{' '}
                  <span className='bg-light p-2'>{ob.roomdesc}</span>
                  <br />
                  <label> MAXIMUM_PEOPLES: </label>{' '}
                  <span className='bg-light p-2'>{ob.roomMaxPeople}</span>
                  <br />
                  <label> Price: </label>{' '}
                  <span className='bg-light p-2'>{ob.roomPrice}</span>
                  <br />
                  <label> Booking Date: </label>{' '}
                  <span className='bg-light p-2'>"{ob.fromDate}"</span>-
                  <span className='bg-light p-2'>"{ob.toDate}"</span>
                  {/* <h6 className='m-0 '>{ob.roomdesc}</h6> */}
                </div>
              </div>
              <div class='card-footer'>
                {ob.isBooking ? (
                  <>
                  <div>
                  <Link
                    className='btn btn-danger'
                    onClick={() => handleCancelBooking(ob._id)}
                  >
                    CancelBooking
                  </Link>
                  <Link className='btn btn-info' to='/pay'>PAY</Link>
                  </div>
                  
                  
                  <details><summary>Best Offers</summary>
                  <ul>
                    <li>
                    <span>Get 5% off on </span>
                    <Link className='text-info bg-light ml-1 mr-1'>Gpay</Link><span>on paying of more than 1000 Rs</span>
                    </li>
                    <li>
                    <span>Get 15% off on </span>
                    <Link className='text-info bg-light ml-1 mr-1'>Axis Bank credit card</Link><span>on paying of more than 2000 Rs</span>
                    </li>
                    <li> <span>Get 25% off on </span>
                    <Link className='text-info bg-light ml-1 mr-1'>SBI Bank credit card</Link><span>on paying of more than 1500 Rs</span></li>
                    <li> <span>Get 50% off on </span>
                    <Link className='text-info bg-light ml-1 mr-1'>HDFC Bank credit card</Link><span>on paying more than 5000 Rs</span></li>
                  </ul>
                 
                    </details>
                  </>
                 
                ) : (
                 <Link className='btn btn-danger disabled'>Cancelled</Link>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default Yourbooking
