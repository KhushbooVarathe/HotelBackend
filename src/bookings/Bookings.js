import axios from 'axios'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
function Bookings () {
  const [data, setData] = useState([])
  const token = JSON.parse(localStorage.getItem('token'))
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
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
    axios
      .get('https://backend-eoh8.onrender.com/api/yourbookingadmin'
      , {
        headers: {
          Authorization: `Bearer ${token}`,
          isAdmin: `${isAdmin}`
        }
      }
      )
      .then(res => {
        console.log('res.data: ', res.data)
        setData(res.data)
      })
  }, [])

  console.log(data, 'dataaaaaa')
function handleCancelBooking(cancelid){
console.log("cancelid",cancelid);
axios
.put(
  `https://backend-eoh8.onrender.com/api/cancelbooking/${cancelid}`,
  {},
  {
    headers: {
      Authorization: `Bearer ${token}`,
      isAdmin: `${isAdmin}`,
      // userID: `${decoded.id}`
    }
  }
)
.then(res => {
  console.log(res.data, 'cancel booking response')
  // navigate('/yourbooking')
})
}
  return (
    // <>giohjhho</>
    <>
      <div className=' text-info mt-2 text-center bg-light'>
        <h1 className='p-4'>ALL BOOKINGS</h1>
        <div className='mt-4 bg-info'>
        <table className='table table-hover table-bordered'>
  <thead>
    {tableHeadData.map(dataget => (
      <th key={dataget}>{dataget}</th>
    ))}
  </thead>
  <tbody>
    {/* {data.map(ob => (
      <tr key={ob.userData.username}>
        <td>{ob.userData.username}</td>
        <td>{ob.hotelData.name}</td>
        <td>{ob.roomData.title}</td>
        {ob.roomData.roomNumbers.map(dataob => (
          <td key={dataob.number}>{dataob.number}</td>
        ))}
        {ob.roomData.bookedDate.length > 0 && (
          <td>{ob.roomData.bookedDate[ob.roomData.bookedDate.length - 1]}</td>
        )}

        <td>
          <Link className='btn btn-danger' onClick={()=>handleCancelBooking(ob.roomData._id)}>Cancel Bookings</Link>
        </td>
      </tr>
    ))} */}
    {data.map(ob=>
      <tr>
        <td>{ob.user.username}</td>
        <td>{ob.room.hotelName}</td>
        <td>{ob.room.roomTitle}</td>
        <td>{ob.room.roomNumber}</td>
        <td>"{ob.room.fromDate}"-"{ob.room.toDate}"</td>
        <td>{ob.room.roomPrice}</td>
        <td>{ob.room.roomMaxPeople}</td> 
 
       <td>
        {ob.room.isBooking ? <Link className='btn btn-danger' onClick={()=>handleCancelBooking(ob.room._id)}>Cancel_Booking</Link>
        :
        <Link className='btn btn-danger disabled'>Cancelled</Link>
        }
        
       </td>
      </tr>)}
  </tbody>
</table>

        </div>
      </div>
    </>
  )
}

export default Bookings
