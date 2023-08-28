import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import config from '../config/Congif'
import Intercepter from '../intercepter/Intercepter'
import { toast } from 'react-toastify'
function AddHotels () {
  const navigate = useNavigate()
  const [hotels, setHotels] = useState([])
  const[modalshow,setModalShow]=useState(false)
  const [hotelname, setHotelName] = useState('')
  const [hotelid, setHotelId] = useState('')
  useEffect(() => {
    try {
      axios.get(`${config}/api/hotels`).then(res => {
    
        setHotels(res.data)
        console.log('res.data: ', res.data);
      })
    } catch (error) {
     
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }, [modalshow])

  function handleDeleteHotel (id) {
    const token = JSON.parse(localStorage.getItem('token'))

    try {
      axios.delete(`${config}/api/deleteHotels/find/${id}`).then(res => {
        toast.success(res.data, {
          position: toast.POSITION.TOP_RIGHT
          // autoClose: 3000, // Auto close the toast after 3 seconds
        })
        setModalShow(!modalshow)
        // navigate('/contact')
      })
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  function handleDelete (hotelid, hotelName) {
    setHotelName(hotelName)
    setHotelId(hotelid)
  }
  return (
    <>
      <Intercepter />

      <div
        className='container-fluid text center row mt-5'
        style={{ marginLeft: '220px' }}
      >
        <div className='col-sm-4'>
          <Link className='btn btn-warning' to='/home'>
            Go Back
          </Link>
        </div>
        <div className='col-sm-4'>
          <Link
            className='btn btn-primary px-4 pt-3'
            // style={{ marginLeft: '100px' }}
            to='/addhot'
          >
            ADD HOTELS
          </Link>
        </div>
        <div className='col-sm-4'>
          <Link
            className='btn btn-danger text-white px-4 pt-3'
            // style={{ marginLeft: '1600px' }}
            data-toggle='collapse'
            data-target='#demo1'
          >
            DELETE HOTELS
          </Link>
        </div>
      </div>
      {/* <h1 className='bg-dark text-light p-4'>ADD HOTELS</h1><hr/> */}
      <div className=''>
        <div
          id='demo1'
          className='collapse bg-light container'
          data-placement='bottom'
        >
          <table className='table table-bordered text-center'>
            <>
              <thead>
                <tr>
                  <th>HOTEL NAME</th>
                  <th>DELETE HOTEL</th>
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
                          data-toggle='modal'
                          data-target='#myModal'
                          onClick={() => handleDelete(hotel._id, hotel.name)}
                        >
                          DELETE
                        </Link>
                      </td>
                    </tr>
                    <div class='modal fade' id='myModal'>
                      <div class='modal-dialog modal-sm'>
                        <div class='modal-content'>
                          {/* <!-- Modal Header --> */}
                          {/* <div class="modal-header">
          <h4 class="modal-title">Hotel you wants to delete</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
         */}
                          {/* <!-- Modal body --> */}
                          <div class='modal-body'>
                            <h6 className='text-danger'>
                              Are You Sure To delete {hotelname}{' '}
                            </h6>
                          </div>

                          {/* <!-- Modal footer --> */}
                          <div class='modal-footer'>
                            <div class='row'>
                              <div class='col-sm-6'>
                                {' '}
                                <Link
                                  className='btn btn-danger'
                                  data-dismiss='modal'
                                  onClick={() => handleDeleteHotel(hotelid)}
                                >
                                  YES
                                </Link>
                              </div>
                              <div class='col-sm-6'>
                                {' '}
                                <button
                                  type='button'
                                  class='btn btn-secondary'
                                  data-dismiss='modal'
                                >
                                  NO
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
              
                <Link >
                  <img
                    className='card-img-top '
                    src={ob.photoUrl}
                    alt='Card image'
                    // style={{ height: '250px', width: '400px' }}
                  />
                </Link>

                <div className='card-body'>
                  <h4 className='card-title text-danger'>{ob.name}</h4>
                  <p className='card-text'>Desc:{" "}{ob.desc}</p>
                  <p className='card-text'>Ratings:{" "}{ob.rating}{" "}<i class='fas fa-star'></i></p>
                  {/* <a href="#" className="btn btn-primary">Add Rooms</a> */}
                  
                  <Link to={`/admins/${ob._id}`} className='btn btn-secondary mr-5'>
                    {' '}
                    See Rooms
                  </Link>
              <details>
                <summary>All Reviews :</summary>
                <ul>
                  <li>gggfggfgfffgf</li>
                </ul>
              </details>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  )
}

export default AddHotels
