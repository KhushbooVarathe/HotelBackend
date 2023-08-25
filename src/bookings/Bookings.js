import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../config/Congif'
import Intercepter from '../intercepter/Intercepter'
import { toast } from 'react-toastify'
function Bookings () {
  const [data, setData] = useState([])
  const [bookingCancelled, setBookingCancelled] = useState(false); 
  const tableHeadData = [
    // 'Profile'
    'User Name',
    'Hotel Name',
    'Room title',
    'Room Number',
    'Booked date',
    'Room Price',
    'Maximum Peoples',
    'Cancel'
  ]
  useEffect(() => {
    axios.get(`${config}/api/yourbookingadmin`).then(res => {
      setData(res.data)
    })
  }, [bookingCancelled])

  function handleCancelBooking(cancelid) {
    try {
      axios.put(`${config}/api/cancelbooking/${cancelid}`, {}).then(res => {
        toast.success(res.data, {
          position: toast.POSITION.TOP_RIGHT,
        });
  
        // Update the bookingCancelled state to trigger the useEffect again
        setBookingCancelled(!bookingCancelled);
      });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // You can show an error toast or take any other appropriate action
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  
  return (
    
    <>
      <Intercepter />
      <div className=' text-info text-center bg-light'>
        <div className='row'>
          <div className='col-sm-6'>
            {' '}
            <h1 className='p-4'>ALL BOOKINGS</h1>
          </div>
          <div className='col-sm-6'>
            <Link className='btn btn-warning m-4' to='/home'>
              Go Back
            </Link>
          </div>
        </div>

        <div className='mt-4 bg-info'>
          <table className='table table-hover table-bordered'>
            <thead>
              {tableHeadData.map(dataget => (
                <th key={dataget}>{dataget}</th>
              ))}
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map(ob => (
                  <tr>
                    <td>{ob.user.username}</td>
                    <td>{ob.room.hotelName}</td>
                    <td>{ob.room.roomTitle}</td>
                    <td>{ob.room.roomNumber}</td>
                    <td>
                      "{ob.room.fromDate}"-"{ob.room.toDate}"
                    </td>
                    <td>{ob.room.roomPrice}</td>
                    <td>{ob.room.roomMaxPeople}</td>

                    <td>
                      {ob.room.isBooking ? (
                        <Link
                          className='btn btn-danger'
                          onClick={() => handleCancelBooking(ob.room._id)}
                        >
                          Cancel_Booking
                        </Link>
                      ) : (
                        <Link className='btn btn-danger disabled'>
                          Cancelled
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <div className='container' style={{ alignItems: 'center' }}>
                  {' '}
                  <h1 className='text-light text-center'>
                    Loading............
                  </h1>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Bookings
