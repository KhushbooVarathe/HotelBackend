import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
import Intercepter from '../intercepter/Intercepter'
import { toast } from 'react-toastify'

import baseUrl from '../config/Config'
function Yourbooking () {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [changedata, setChangeData] = useState(false)
  const today = new Date() // Get today's date
  const todayDateString = today.toISOString().split('T')[0] // Convert t
  const token = JSON.parse(localStorage.getItem('token'))
  // console.log(token, typeof token)
  const [review, setReview] = useState('')
  var decoded = jwt_decode(token)
  // console.log(decoded.id,"he");
  useEffect(() => {
    getBookingData()
  }, [])

  function getBookingData () {
    try {
      axios
        .get(`${baseUrl}/api/yourbooking/${decoded.id}`)
        .then(res => {
          setData(res.data.bookings)
        })
        .catch(error => {
          console.error('Error fetching booking data:', error)
          toast.error('Error fetching booking data:', {
            position: toast.POSITION.TOP_RIGHT
          })
          // You can handle the error here, such as showing an error message to the user.
        })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error occurs. please try again later', {
        position: toast.POSITION.TOP_RIGHT
      })
      // Handle any synchronous error that might occur before making the HTTP request.
    }
  }

  function handleCancelBooking (cancelid) {
    try {
      axios
        .put(`${baseUrl}/api/cancelbooking/${cancelid}`, {})
        .then(res => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_RIGHT
          })
          setChangeData()
        })
        .catch(error => {
          console.error('Error canceling booking:', error)
          toast.error('Error in canceling booking', {
            position: toast.POSITION.TOP_RIGHT
          })
          // You can handle the error here, such as showing an error message to the user.
        })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error occurs', {
        position: toast.POSITION.TOP_RIGHT
      })
      // Handle any synchronous error that might occur before making the HTTP request.
    }
  }

  function handlereview (e) {
    console.log(e.target.value)
    setReview(e.target.value)
  }
  let reviewData = {}
  function handleAddreview (ob,userId) {
    console.log('ob: ', ob);
    try {
      reviewData = { review,ob,userId }
      console.log('reviewData: ', reviewData)

      axios
        .post(`${baseUrl}/api/review/${decoded.id}`, reviewData)
        .then(res => {
          toast.success(res.data, {
            position: toast.POSITION.TOP_RIGHT
          })
        })
        .catch(error => {
          console.error('Error adding review:', error)
          toast.error('Error adding review', {
            position: toast.POSITION.TOP_RIGHT
          })
          // You can handle the error here, such as showing an error message to the user.
        })
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error occurs', {
        position: toast.POSITION.TOP_RIGHT
      })
      // Handle any synchronous error that might occur before making the HTTP request.
    }
  }

  return (
    <>
      <Intercepter />
      <div className='text-left ml-5 mt-5'>
        <Link className='btn btn-warning mt-3' to='/home'>
          Go Back
        </Link>
      </div>

      <div className='d-flex row m-4'>
        {data.map(ob => (
          <>
            <div class='card m-3' style={{ width: '400px' }}>
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
              <div className='card-footer'>
                {ob.isBooking ? (
                  <>
                  
                    <div>
                      {ob.fromDate === todayDateString ||
                      ob.fromDate < todayDateString ? (
                        <>
                          <Link
                            className='btn btn-success'
                            data-toggle={`collapse`}
                            data-target={`#demo${ob._id}`}
                          >
                            ADD REVIEW
                          </Link>
                          <div id={`demo${ob._id}`} className='collapse'>
                            <form>
                              <textarea onChange={handlereview} />
                              <br />
                              <Link
                                className='btn btn-primary'
                                onClick={() => handleAddreview(ob._id,ob.userId)}
                              >
                                Submit
                              </Link>
                            </form>
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            className='btn btn-danger'
                            onClick={() => handleCancelBooking(ob._id)}
                          >
                            CancelBooking
                          </Link>

                          <Link className='btn btn-info' to='/pay'>
                            PAY
                          </Link>
                          <details>
                            <summary>Best Offers</summary>
                            <ul>
                              <li>
                                <span>Get 5% off on </span>
                                <Link className='text-info bg-light ml-1 mr-1'>
                                  Gpay
                                </Link>
                                <span>on paying of more than 1000 Rs</span>
                              </li>
                              <li>
                                <span>Get 15% off on </span>
                                <Link className='text-info bg-light ml-1 mr-1'>
                                  Axis Bank credit card
                                </Link>
                                <span>on paying of more than 2000 Rs</span>
                              </li>
                              <li>
                                {' '}
                                <span>Get 25% off on </span>
                                <Link className='text-info bg-light ml-1 mr-1'>
                                  SBI Bank credit card
                                </Link>
                                <span>on paying of more than 1500 Rs</span>
                              </li>
                              <li>
                                {' '}
                                <span>Get 50% off on </span>
                                <Link className='text-info bg-light ml-1 mr-1'>
                                  HDFC Bank credit card
                                </Link>
                                <span>on paying more than 5000 Rs</span>
                              </li>
                            </ul>
                          </details>
                        </>
                      )}
                    </div>
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
