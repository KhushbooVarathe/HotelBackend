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
  let { id } = useParams()
  const [data, setData] = useState([])
  const [rooid, setROOID] = useState('')
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: ''
  })
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

  function handleBooking(rooomid) {
    console.log('rooomid: ', rooomid);
    var decoded = jwt_decode(token);
    console.log('formData: ', formData);
  
    try {
      axios
        .post(`${baseUrl}/api/alreadybookingroom/${rooomid}`, formData)
        .then(res => {
          if (res.data === false) {
            toast.error('These Room(s) are not available for this day', {
              position: toast.POSITION.TOP_RIGHT
            });
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
                });
              })
              .catch(error => {
                console.error('An error occurred:', error);
                toast.error(res.data, {
                  position: toast.POSITION.TOP_RIGHT
                });
              });
          }
        })
        .catch(error => {
          console.error('An error occurred:', error);
          toast.error('An error occurred. Please try again.', {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      });
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
      <Link className='btn btn-primary' to='/home'>Go Back</Link>
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
                <div class='modal fade' id='myModal'>
                  <div class='modal-dialog modal-lg'>
                    <div class='modal-content'>
                      {/* <!-- Modal Header --> */}
                      <div class='modal-header'>
                        {/* <h4 class='modal-title'>Modal Heading</h4> */}
                        <button
                          type='button'
                          class='close'
                          data-dismiss='modal'
                        >
                          &times;
                        </button>
                      </div>

                      {/* <!-- Modal body --> */}
                      <div class='modal-body'>
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
                      <div class='modal-footer'>
                        <button
                          type='button'
                          class='btn btn-secondary'
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
