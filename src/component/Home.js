import axios from 'axios'

import jwt_decode from 'jwt-decode'
import React, { useEffect, useState ,createContext, useContext } from 'react'
import { Link } from 'react-router-dom'
import Intercepter from '../intercepter/Intercepter'
import baseUrl from '../config/Config'
import { toast } from 'react-toastify' // Import the toast object
import UserNavBar from '../NavBAr/UserNavBar'

const UserContext = createContext();
function Home () {
  const [hotels, setHotels] = useState([])

  const [hotels2, setHotels2] = useState([])
  const [image, setImage] = useState([])
  const [data, setData] = useState({})
  const [data1, setData1] = useState([])


  const token = JSON.parse(localStorage.getItem('token'))
  // console.log(token, typeof token)

  var decoded = jwt_decode(token)
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/api/hotels`).then(res => {
        setHotels(res.data)
        setHotels2(res.data)
        const array = []
        res.data.map(ob => {
          array.push(ob.photoUrl)
        })
        setImage(array)
      })
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
        // autoClose: 3000,
      })
    }
  }, [])
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/yourbooking/${decoded.id}`)
      .then((res) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to the start of the day
  
        const todaysBookings = res.data.bookings.filter((booking) => {
          const bookingDate = new Date(booking.fromDate);
          bookingDate.setHours(0, 0, 0, 0); // Set time to the start of the day
          return bookingDate.getTime() === today.getTime();
        });
  
        const todaysBookingCount = todaysBookings.length;
  
        console.log('Todays Bookings: ', todaysBookings);
        console.log('Todays Booking Count: ', todaysBookingCount);
    
      if(todaysBookingCount>0) {
        toast.info(`Today's booking notification. Please  check!`, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, // Close after 3 seconds
        });
      } 
        
      })
      .catch((error) => {
        // Handle the error
        console.error('An error occurred:', error);
        toast.error('An error occurred. Please try again.', {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  
    // Show the pop-up message
   
  }, []);
  
  console.log('data1',data1);
  function handleSearch (e) {
    const { name, value } = e.target
    const searchKey = value.toLowerCase() // Convert the input value to lowercase
    setData(prevData => ({ ...prevData, [name]: value }))

    if (!value) {
      setHotels(hotels2)
    } else {
      try {
        axios
          .get(`${baseUrl}/api/search/${searchKey}`)
          .then(res => {
            if (searchKey === '') {
              setHotels(hotels2)
            } else {
              setHotels(res.data)
            }
          })
          .catch(error => {
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
    }
  }

  return (
    <>
      <Intercepter />
      
      <div className='container mt-5'>
        <div className='d-flex '>
          <h3 className='p-2 text-info'>SEARCH HERE:</h3>
          <input
            className='form-control p-4'
            type='text'
            placeholder='Search Your Destination'
            onChange={handleSearch}
          />
          {/* <Link className='btn btn-info ml-2 px-3' onClick={()=>handleSubmit(data)}>
          SEARCH
        </Link> */}
        </div>
      </div>

      <div className='mt-5'>
        <Link>
          <div id='demo' className='carousel slide' data-ride='carousel'>
            <ul className='carousel-indicators'>
              {image.map((_, index) => (
                <li
                  key={index}
                  data-target='#demo'
                  data-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                />
              ))}
            </ul>
            <div className='carousel-inner'>
              {image.map((imageurl, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                
                  <img
                    src={imageurl}
                    alt={`Image ${index + 1}`}
                    width='100%'
                    height='600'
                  />
                </div>
              ))}
            </div>
            <a class='carousel-control-prev' href='#demo' data-slide='prev'>
              <span class='carousel-control-prev-icon'></span>
            </a>
            <a class='carousel-control-next' href='#demo' data-slide='next'>
              <span class='carousel-control-next-icon'></span>
            </a>{' '}
          </div>
        </Link>
      </div>

      <div className=' text-center d-flex row'>
        {hotels.length > 0 ? (
          hotels.map(ob => (
            <>
              <div
                className='card  bg-light text-dark card-columns d-flex m-5'
                style={{
                  // height: '450px',
                  width: '350px',
                  textDecoration: 'none'
                }}
              >
                <Link>
                  <img
                    className='card-img-top'
                    src={ob.photoUrl}
                    alt='Card image'
                    style={{ height: '250px', width: '350px' }}
                  />
                </Link>

                <div className='card-body'>
                  <h4 className='card-title'>{ob.name}</h4>
                  <p className='card-text'>{ob.desc}</p>
                  <p className='card-text'>Ratings:{ob.rating}</p>

                  <Link to={`/rooms/${ob._id}`} className='btn btn-secondary'>
                    {' '}
                    SEE ROOMS
                  </Link>
                </div>
              </div>
            </>
          ))
        ) : (
          <div className='text-center container mt-5'>
            <h1>
              <div class='spinner-border text-danger'></div>Loading...
            </h1>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
