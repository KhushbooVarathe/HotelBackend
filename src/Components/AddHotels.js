import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddHotels () {
  const navigate = useNavigate()
  const [hotels, setHotels] = useState([])
  useEffect(() => {
    axios.get('https://backend-eoh8.onrender.com/api/hotels').then(res => {
      console.log(res.data, 'hotelsssssssssssss')
      setHotels(res.data)
    })
  }, [])
  function handleData () {
    console.log('addhotel_function')
  }
  // console.log('hotelss', hotels)
  function handleAddRooms (id) {
    // console.log('add room for this hotel', id)
    navigate('/admins')
  }
  function handleClick () {
    console.log('sdfhsdfsdjfghd')
  }
  function handleDeleteHotel (id) {
    const token = JSON.parse(localStorage.getItem('token'))
    // console.log(token, typeof token)
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    // console.log(isAdmin, 'isAdmin')
    console.log('DeleteHotel', id)
    axios
      .delete(`https://backend-eoh8.onrender.com/api/deleteHotels/find/${id}`
      // , {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     isAdmin: `${isAdmin}`
      //   }
      // }
      )
      .then(res => {
        console.log(res.data, 'rsgfgfgg')
        alert(res.data)
        navigate('/contact')
      })
  }
  return (
    <>
      {/* <h1 className='bg-dark text-light p-4'>ADD HOTELS</h1><hr/> */}
      <div className='  p-5'>
        <Link
          className='btn btn-primary px-4 pt-3'
          style={{ marginLeft: '100px' }}
          to='/addhot'
        >
          ADD_HOTELS
        </Link>
        <Link
          className='btn btn-primary text-white px-4 pt-3'
          style={{ marginLeft: '1600px' }}
          data-toggle='collapse'
          data-target='#demo1'
        >
          DELETE_HOTELS
        </Link>
        

        <div
          id='demo1'
          className='collapse bg-light container'
          data-placement='bottom'
        >
          <table className='table table-bordered text-center'>
            <>
              <thead>
                <tr>
                  <th>HOTEL_NAME</th>
                  <th>DELETE_HOTEL</th>
                  {/* <th>Email</th> */}
                </tr>
              </thead>
              {hotels &&
                hotels.map(hotel => (
                  <tbody>
                    <tr>
                      <td>
                        <h5>{hotel.name}</h5>
                      </td>
                      <td>
                        <Link
                          className='btn btn-danger'
                          onClick={() => handleDeleteHotel(hotel._id)}
                        >
                          DELETE
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </>
          </table>
        </div>
      </div>
      <div className=' text-center d-flex row m-5'>
        {hotels &&
          hotels.map(ob => (
            <>
              {/* //  onClick={()=>handleAddRooms(ob._id)}
              > */}
              <div
                className='card bg-white text-dark card-columns d-flex  m-3'
                style={{
                  height: '450px',
                  width: '400px',
                  textDecoration: 'none'
                }}
              >
                {/* {ob.photos.map(obj=>{
                    console.log(obj.filename,"obj")
                  })} */}
                <Link onClick={handleClick}>
                  <img
                    className='card-img-top '
                    src={ob.photos[0].filename}
                    alt='Card image'
                    style={{ height: '200px', width: '400px' }}
                  />
                </Link>

                <div className='card-body'>
                  <h4 className='card-title'>{ob.name}</h4>
                  <p className='card-text'>{ob.desc}</p>
                  <p className='card-text'>Ratings:{ob.rating}</p>
                  {/* <a href="#" className="btn btn-primary">Add Rooms</a> */}
                  <Link to={`/admins/${ob._id}`} className='btn btn-secondary'>
                    {' '}
                    SEE ROOMS
                  </Link>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  )
}

export default AddHotels
