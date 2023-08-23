import axios from 'axios'
import React, { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Link, useNavigate } from 'react-router-dom'
function YourBooking() {
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

  function getBookingData() {
    axios
      .get(`http://localhost:7000/api/yourbooking/${decoded.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          isAdmin: `${isAdmin}`
          //   userID:`${decoded.id}`
        }
      })
      .then(res => {
        console.log(res.data, 'booked room data')
        setData(res.data)
      })
  }
  // data.map((ob, index) => {
  //   console.log(ob, 'ob', index)
  //   ob.booking.map((YourBooking, index1) => {
  //     console.log(YourBooking, 'YourBooking', index1)
  //   })
  // })
  // console.log(data,"data")

  function HandleCancelBooking(roomid,dta) {
    console.log('roomid===========>: ', roomid,dta);
    navigate('/yourbooking')
    // console.log('room',roomid)
    axios
      .put(
        `http://localhost:7000/api/cancelbooking/${roomid}/${decoded.id}`,
        {dta},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            isAdmin: `${isAdmin}`,
            userID: `${decoded.id}`
          }
        }
      )
      .then(res => {
        console.log(res.data,"cancel booking response")
        // navigate('/yourbooking')
      })
  }
  function handlePayment() {
    console.log('payment')
  }
  let isBookingEnabled;
  const today = Date.now();
  return (
    <>
      <div className='d-flex row m-5'>
        <>
          {data &&
            data.map((ob, index) => (
              <div
                key={index}
                className={`card bg-light m-4`}
                style={{ height: '650px', width: '400px' }}
              >
                <div className='justify-content-center bg-white'>
                  {ob.hotel.photos.map(photo => (
                    <React.Fragment key={photo.filename}>
                      <img
                        className='card-img-top rounded-circle'
                        src={photo.filename}
                        alt='Card image'
                        style={{ height: '160px', width: '200px' }}
                      />
                      <h4 className='text-center'>{ob.hotel.name}</h4>
                      <hr />
                    </React.Fragment>
                  ))}
                </div>
                {ob.room.photos.map(photo => (
                  <img
                    key={photo.filename}
                    className='card-img-top'
                    src={photo.filename}
                    alt='Card image'
                    style={{ height: '160px', width: '400px' }}
                  />
                ))}

                <div className='card-body'>
                  <h4 className='card-title'>{ob.room.title}</h4>
                  <p className='card-text'>{ob.room.desc}</p>
                  {/* Conditional rendering based on index and index1 */}
                  {ob.booking.length > 1 ? ob.booking.map(
                    (yourdate, index1) => {
                      onedata1 = yourdate
                      // console.log('onedata1==========>: ', onedata1);
                      const fromDate = new Date(yourdate.fromDate).getTime();
                      isBookingEnabled = fromDate >= today;

                      // console.log()
                      return (
                        <>
                          {' '}
                          <p key={index1} className={`card-text ${isBookingEnabled ? 'active-date' : 'disabled-date'
                            }`}>{console.log("index1",index1)}
                            Your Booking Date: {yourdate.fromDate}/
                            {yourdate.toDate}
                          </p>{' '}
                        </>
                      ) 
                    }
                    // setOneData(yourdate)
                  ) : ob.booking.map(yourdate => {
                    const fromDate = new Date(yourdate.fromDate).getTime();
                    isBookingEnabled = fromDate >= today;
                    onedata1 = yourdate
                    return (
                      <>
                        <p>Your boking date:{yourdate.fromDate}/{yourdate.toDate}</p>
                      </>
                    )
                  }
                  )
                  }

                  {ob.room.roomNumbers.map(room => (
                    <p key={room.number} className='card-text'>
                      Room: {room.number}
                    </p>
                  ))}
                  {ob.booking.length > 1 ?
                    <Link
                      className={`btn btn-danger ${isBookingEnabled && onedata1.isBooking ? '' : 'disabled'
                        }`}
                      onClick={() => HandleCancelBooking(ob.room._id,onedata1._id)}
                    >
                      {onedata1 && onedata1.isBooking
                        ? 'Cancel Booking'
                        : 'Cancelled Booking'}
                    </Link>

                    :
                    <Link
                      className={`btn btn-danger ${isBookingEnabled && onedata1.isBooking ? '' : 'disabled'
                        }`}
                      onClick={() => HandleCancelBooking(ob.room._id,onedata1._id)}
                    >
                      {onedata1 && onedata1.isBooking
                        ? 'Cancel Booking'
                        : 'Cancelled Booking'}
                    </Link>
                  }

                  {isBookingEnabled && onedata1.isBooking ? (
                    <Link
                      className='btn btn-info ml-3'
                      data-toggle='modal'
                      data-target='#myModal'
                      onClick={handlePayment}
                    >
                      Payment
                    </Link>
                  ) : null}
                  {/* <!-- The Modal --> */}
                  <div className='modal fade' id='myModal'>
                    <div className='modal-dialog modal-lg'>
                      <div className='modal-content'>
                        {/* <!-- Modal Header --> */}
                        <div className='modal-header'>
                          <h4 className='modal-title'>Modal Heading</h4>
                          <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                          >
                            &times;
                          </button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className='modal-body'>
                          <label>TOTAL PRICE:</label>
                          <p>fffs</p>
                          <Link className='btn btn-danger'>PAY</Link>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div className='modal-footer'>
                          <button
                            type='button'
                            className='btn btn-secondary'
                            data-dismiss='modal'
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </>
      </div>
    </>
  )
}

export default YourBooking
