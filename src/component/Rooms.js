import axios from 'axios'
import jwt_decode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Intercepter from '../intercepter/Intercepter'
function Rooms () {
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
  const token = JSON.parse(localStorage.getItem('token'))
  // console.log(token, typeof token)
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  // console.log(isAdmin, 'isAdmin')
  let { id } = useParams()
  const [data, setData] = useState([])
  const[rooid,setROOID]=useState('')
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
  });
  useEffect(() => {
    axios
      .get(`https://backend-eoh8.onrender.com/api/gethotelroomuser/${id}`
      // , {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     isAdmin: `${isAdmin}`
      //   }
      // }
      )
      .then(res => {
        // console.log(res.data, 'resssssssssssss')
        setData(res.data)
      })
  }, [])
  // console.log(data, 'dataa')

  let paramsid = id
  // console.log(id, 'paramsid', paramsid)
  function handleBooking (rooomid) {
    // console.log('rooomidBooking', rooomid)
    var decoded = jwt_decode(token)
    // console.log("formData==========>",formData)

    axios.post(`https://backend-eoh8.onrender.com/api/alreadybookingroom/${rooomid}`,formData).then(res=>{
      // console.log("chalaa",res.data)
      if( res.data==false){
        alert(" these Room is not available for this day")
      }else{
   axios
      .post(
        `https://backend-eoh8.onrender.com/api/booking/${decoded.id}/${rooomid}/${paramsid}`,
        formData
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     isAdmin: `${isAdmin}`,
        //     userID: `${decoded.id}`
        //   }
        // }
      )
      .then(res => {
        // console.log(res.data)
        // navigate('/yourbooking')
      })
      }
   
    })
    // console.log(decoded.id, 'he')
   
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server or perform any actions with the formData
    // console.log(formData);
    
  };

  function handleId(roomifd){
    // console.log("roomifd==================>",roomifd)
    setROOID(roomifd)
  }
  // console.log(rooid,"rrrrrrrrrrrrrrrroooooooooooooooifdd")/
  return (
    <>
    <Intercepter/>
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
                {ob.bookedDate == Date.now() ? <Link className='btn btn-warning disabled'>Unavailable Now</Link>:  <Link
                  className='btn btn-secondary'
                  data-toggle='modal'
                  data-target='#myModal'
                  onClick={() => 
                    handleId(ob._id)
                
                  }
                >
                  BOOK NOW
                </Link>}
                

                  {/* <!-- The Modal --> */}
        <div class='modal fade' id='myModal'>
          <div class='modal-dialog modal-lg'>
            <div class='modal-content'>
              {/* <!-- Modal Header --> */}
              <div class='modal-header'>
                <h4 class='modal-title'>Modal Heading</h4>
                <button type='button' class='close' data-dismiss='modal'>
                  &times;
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <div class='modal-body'>
              <form>
        <label htmlFor="fromDate">From Date:</label>
        <input
          type="date"
          id="fromDate"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          min={today}
          required
        /><br /><br />

        <label htmlFor="toDate">To Date:</label>
        <input
          type="date"
          id="toDate"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          min={today}
          required
        /><br /><br />

        <Link className='btn btn-primary'
           data-dismiss='modal' onClick={() => 
                    handleBooking(rooid)
                
                  }  type="submit">Submit</Link>
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
