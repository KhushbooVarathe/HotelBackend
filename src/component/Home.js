import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Intercepter from '../intercepter/Intercepter'
// import SearchHotel from './SearchHotel'
function Home () {

  
  const navigate = useNavigate()
  const [hotels, setHotels] = useState([])
  const [hotels2, setHotels2] = useState([])
  const [image, setImage] = useState([])
  useEffect(() => {
    axios.get('https://backend-eoh8.onrender.com/api/hotels').then(res =>{
      // console.log(res.data, 'hotelsssssssssssss')
      setHotels(res.data)
      setHotels2(res.data)
      const array = []
      res.data.map(ob => {
        // console.log(ob.photos, 'photos')
        ob.photos.map(image => {
          
          array.push(image.filename)

          // console.log('image: ', image)
          //
        })
        setImage(array)
      })
      // setImage(res.data.)p
    })
  }, [])
  // function handleData () {
  //   console.log('addhotel_function')
  // }
  // // console.log('hotelss', hotels)
  // function handleAddRooms (id) {
  //   // console.log('add room for this hotel', id)
  //   navigate('/admins')
  // }
  function handleClick () {
    console.log('sdfhsdfsdjfghd')
  }

  const [data, setData] = useState({})

  function handleSearch (e) {
    const { name, value } = e.target
    const searchKey = value.toLowerCase() // Convert the input value to lowercase
    setData(prevData => ({ ...prevData, [name]: value }))
    // console.log(value, 'target value')

    if (!value) {
      setHotels(hotels2)
      // console.log('firstttt is workingggggggggggg')
      // console.log('hotels22222222', hotels2)
    } else {
      try {
        axios
          .get(`https://backend-eoh8.onrender.com/api/search/${searchKey}`) // Use 'searchKey' instead of 'value'
          .then(res => {
            if (searchKey === '') {
              // console.log('this is workingggggggggggg')
              // console.log(res.data, 'resssssssssssssss')
              setHotels(hotels2)
            } else {
              // console.log('else is workingggggggggggg')/
              // console.log(res.data, 'resssssssssssssss')
              setHotels(res.data)
            }
          })
          .catch(err => {
            console.log(err, 'errrrrr')
          })
      } catch (err) {
        console.log(err, 'errrrrr')
      }
    }
  }

  // console.log("imagee",image)

  function handleCarousal () {
    // console.log('carousel function')
  }

  return (
    <>
    <Intercepter/>
      <div className='container mt-5'>
        <div className='d-flex '>
          <h3 className='p-2 text-danger'>SEARCH_HERE:</h3>
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
        <Link onClick={handleCarousal}>
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
                  {/* <div className='carousel-caption'>
                    <h3>Image {index + 1}</h3>
                    <p>Image description goes here</p>
                  </div> */}
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
              {/* //  onClick={()=>handleAddRooms(ob._id)}
            > */}

              <div
                className='card  bg-light text-dark card-columns d-flex m-5'
                style={{
                  height: '450px',
                  width: '350px',
                  textDecoration: 'none'
                }}
              >
                {/* {ob.photos.map(obj=>{
                  console.log(obj.filename,"obj")
                })} */}
                <Link onClick={handleClick}>
                  <img
                    className='card-img-top'
                    src={ob.photos[0].filename}
                    alt='Card image'
                    style={{ height: '250px', width: '350px' }}
                  />
                </Link>

                <div className='card-body'>
                  <h4 className='card-title'>{ob.name}</h4>
                  <p className='card-text'>{ob.desc}</p>
                  <p className='card-text'>Ratings:{ob.rating}</p>
                  {/* <a href="#" className="btn btn-primary">Add Rooms</a> */}
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
              <div class='spinner-border text-danger'></div>NO DATA FOUND
            </h1>
          </div>
        )}
      </div>
    </>
  )
}

export default Home
