import axios from 'axios'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Intercepter from '../intercepter/Intercepter'
import baseUrl from '../config/Config'
import { toast } from 'react-toastify' // Import the toast object

function Rooms () {
  const today = new Date().toISOString().split('T')[0] // Get current date in 'YYYY-MM-DD' format
  const token = JSON.parse(localStorage.getItem('token'))
  var decoded = jwt_decode(token)
  let { id } = useParams()
  const [data, setData] = useState([])
  const [obj, setObj] = useState([])

  const [rooid, setROOID] = useState('')
  const [gethotel, setGetHotel] = useState()
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: ''
  })
  useEffect(() => {
    axios.get(`${baseUrl}/api/getonehotel/${id}`).then(res => {
      console.log('res: ', res.data)
      setGetHotel(res.data)
    })
    axios
      .get(`${baseUrl}/api/yourbooking/${decoded.id}`)
      .then(res => {
        // console.log('res: ', res.data)

        const bookingsWithReviews = res.data.bookings.filter(ob => ob.review)
        setObj(bookingsWithReviews)
        // console.log('bookingsWithReviews: ', bookingsWithReviews)

        // Show a success notification using react-toastify
        // toast.success('Bookings with reviews fetched successfully')
      })
      .catch(error => {
        console.error('Error fetching data:', error)

        // Show an error notification using react-toastify
        toast.error('Error fetching bookings data')
      })
  }, [])
  useEffect(() => {
    try {
      axios
        .get(`${baseUrl}/api/gethotelroomuser/${id}`)
        .then(res => {
          // console.log(res.data, 'resssssssssssss')
          setData(res.data)
        })
        .catch(error => {
          console.error('An error occurred:', error)
          toast.error('An error occurred. Please try again.', {
            position: toast.POSITION.TOP_RIGHT
            // autoClose: 3000,
          })
        })
    } catch (error) {
      console.error('An error occurred:', error)
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
        // autoClose: 3000,
      })
    }
  }, [])

  let paramsid = id

  function handleBooking (rooomid) {
    console.log('rooomid: ', rooomid)
    var decoded = jwt_decode(token)
    console.log('formData: ', formData)

    try {
      axios
        .post(`${baseUrl}/api/alreadybookingroom/${rooomid}`, formData)
        .then(res => {
          if (res.data === false) {
            toast.error('These Room(s) are not available for this day', {
              position: toast.POSITION.TOP_RIGHT
            })
          } else {
            // Handle success or further actions
            axios
              .post(
                `${baseUrl}/api/booking/${decoded.id}/${rooomid}/${paramsid}`,
                formData
              )
              .then(res => {
                toast.success(res.data.message, {
                  position: toast.POSITION.TOP_RIGHT
                })
              })
              .catch(error => {
                console.error('An error occurred:', error)
                toast.error(res.data, {
                  position: toast.POSITION.TOP_RIGHT
                })
              })
          }
        })
        .catch(error => {
          console.error('An error occurred:', error)
          toast.error('An error occurred. Please try again.', {
            position: toast.POSITION.TOP_RIGHT
          })
        })
    } catch (error) {
      console.error('An error occurred:', error)
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleId (roomifd) {
    // console.log("roomifd==================>",roomifd)
    setROOID(roomifd)
  }
  // console.log(rooid,"rrrrrrrrrrrrrrrroooooooooooooooifdd")/
  return (
    <>
      <Intercepter />
      <div className='text-left ml-5 mt-5'>
        {' '}
        <Link className='btn btn-warning ml-5' to='/home'>
          Go Back
        </Link>
      </div>

      <div className='container card mt-5'>
        <div className='text-center mt-3'>
          <img
            className=''
            src={gethotel && gethotel.photos[0].filename}
            style={{ width: '800px' }}
          />
        </div>

        <div className=''>
          <div className='card-body'>
            <label>Hotel Name :</label>
            <h2 className='card-title text-danger bg-light'>
              {gethotel && gethotel.name}
            </h2>
            <br />
            <div className='bg-light'>
              <span>Rating:</span> {gethotel && gethotel.rating}{' '}
              <i class='fas fa-star'></i>
            </div>

            <br />
            <br />
            <div className='row'>
              <div className='col-sm-4'>
                <p>
                  Address:{'   '}
                  {gethotel && gethotel.address}
                </p>
              </div>
              <div className='col-sm-4'>
                <p>
                  City:{'   '}
                  {gethotel && gethotel.city}
                </p>
              </div>
              <div className='col-sm-4'>
                <p>
                  Description:{'   '}
                  {gethotel && gethotel.desc}
                </p>
              </div>
            </div>
            <br />
            <div className='bg-light'>
              <details>
                <summary>See all reviews : </summary>
                <br />
                <ul>
                  {obj.map(ob => (
                    <>
                      {ob.hotelName == gethotel.name ? (
                        <li>{ob.review}</li>
                      ) : (
                        ''
                      )}
                    </>
                  ))}
                </ul>
              </details>
            </div>

            <br />
            <div>
              <h5 className='text-danger'>Best Offers :</h5>
            </div>
            <ul style={{ listStyleType: 'none' }}>
              <li>
                <span>Get 5% off on </span>
                <Link className='text-info bg-light ml-1 mr-1'>Gpay</Link>
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
          </div>
        </div>
      </div>

      <div className='d-flex row m-5'>
        {data &&
          data.map(ob => (
            <div
              className='card bg-white text-dark card-columns  m-3'
              style={{
                height: '600px',
                width: '350px',
                textDecoration: 'none'
              }}
            >
              {/* {console.log(ob,"objectsssssssssss")} */}
              {ob.photos.map(photo => (
                <img
                  src={photo.filename}
                  height='250px'
                  width='350px'
                  alt='No image found'
                />
              ))}

              <div className='card-body '>
                <h4 className='card-title'>ROOM:{ob.title}</h4>
                <p className='card-text'>DESC:{ob.desc}</p>
                <p className='card-text'>TOTAL PROPLE : {ob.maxPeople}</p>
                <p className='card-text'>PRICE:{ob.price}</p>
                {ob.roomNumbers.map(room => (
                  <p className='card-text'>ROOM_NUMBER :{room.number}</p>
                ))}
                {/* {console.log(ob._id,"room ki id")} */}
                {ob.bookedDate == Date.now() ? (
                  <Link className='btn btn-warning disabled'>
                    Unavailable Now
                  </Link>
                ) : (
                  <Link
                    className='btn btn-secondary'
                    data-toggle='modal'
                    data-target='#myModal'
                    onClick={() => handleId(ob._id)}
                  >
                    BOOK NOW
                  </Link>
                )}

                {/* <!-- The Modal --> */}
                <div className='modal fade' id='myModal'>
                  <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                      {/* <!-- Modal Header --> */}
                      <div className='modal-header'>
                        {/* <h4 className='modal-title'>Modal Heading</h4> */}
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
                        <form>
                          <label htmlFor='fromDate'>From Date:</label>
                          <input
                            type='date'
                            id='fromDate'
                            name='fromDate'
                            value={formData.fromDate}
                            onChange={handleChange}
                            min={today}
                            required
                          />
                          <br />
                          <br />

                          <label htmlFor='toDate'>To Date:</label>
                          <input
                            type='date'
                            id='toDate'
                            name='toDate'
                            value={formData.toDate}
                            onChange={handleChange}
                            min={today}
                            required
                          />
                          <br />
                          <br />

                          <Link
                            className='btn btn-primary'
                            data-dismiss='modal'
                            onClick={() => handleBooking(rooid)}
                            type='submit'
                          >
                            Submit
                          </Link>
                        </form>
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
      </div>
    </>
  )
}

export default Rooms
