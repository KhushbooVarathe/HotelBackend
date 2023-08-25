import axios from 'axios'
import { toast } from 'react-toastify'; // Import the toast object

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
// import { Navigate, Outlet } from 'react-router-dom'
import baseUrl from '../config/Congif'
import Intercepter from '../intercepter/Intercepter'
function ShowRooms () {
  // const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false) // State to control the first modal visibility

  const [isDemo1Open, setIsDemo1Open] = useState(false);

  const { id } = useParams()
  const [data, setData] = useState([])
  const[modalshow,setModal]=useState(true)
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    maxPeople: '',
    roomNumbers: [{ number: '' }],
    photo: null
  })
  useEffect(() => {
    try {
      axios.get(`${baseUrl}/api/gethotelroom/${id}`)
        .then(res => {
          setData(res.data);
        });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // You can set an error state or take any other appropriate action
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        // autoClose: 3000,
      });
    }
  }, [modalshow,isDemo1Open]);
  

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleRoomNumberChange = (e, index) => {
    const { name, value } = e.target
    setFormData(prevData => {
      const updatedRoomNumbers = [...prevData.roomNumbers]
      updatedRoomNumbers[index] = { number: value }
      return {
        ...prevData,
        roomNumbers: updatedRoomNumbers
      }
    })
  }

  const handleAddRoomNumber = () => {
    setFormData(prevData => ({
      ...prevData,
      roomNumbers: [...prevData.roomNumbers, { number: '' }]
    }))
  }

  const handleRemoveRoomNumber = index => {
    setFormData(prevData => {
      const updatedRoomNumbers = prevData.roomNumbers.filter(
        (_, i) => i !== index
      )
      return {
        ...prevData,
        roomNumbers: updatedRoomNumbers
      }
    })
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    setFormData(prevData => ({
      ...prevData,
      photo: file
    }))
  }

  const handleSubmit = e => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
  
    formDataToSend.append('title', formData.title);
    formDataToSend.append('desc', formData.desc);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('maxPeople', formData.maxPeople);
  
    formData.roomNumbers.forEach((roomNumber, index) => {
      formDataToSend.append(`roomNumbers[${index}]`, roomNumber.number);
    });
  
    formDataToSend.append('photo', formData.photo);
  
    try {
      axios
        .post(`${baseUrl}/api/createRoom/${id}`, formDataToSend)
        .then(res => {
          toast.success(res.data, {
            position: toast.POSITION.TOP_RIGHT,
            // autoClose: 3000, // Auto close the toast after 3 seconds
          });
          setModal(!modalshow)
        })
        .catch(error => {
          toast.error("An error occurred. Please try again.", {
            position: toast.POSITION.TOP_RIGHT,
            // autoClose: 3000,
          });
        });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // You can show an error toast or take any other appropriate action
      toast.error("An error occurred. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
        // autoClose: 3000,
      });
    }
  };
  
  function handleDeleteRooms(roomid) {
    axios
      .delete(`${baseUrl}/api/deleteRoom/${roomid}/${id}`)
      .then(res => {
        toast.success(res.data, {
          position: toast.POSITION.TOP_RIGHT,
          // autoClose: 3000, // Auto close the toast after 3 seconds
        });
        setIsDemo1Open(!isDemo1Open);
      })
     
      .catch(error => {
        // Handle the error here
        console.error("An error occurred:", error);
        // You can show an error message or take any other appropriate action
        toast.error("An error occurred. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          // autoClose: 3000,
        });
      });
  }
  
  // function handleupdate () {
  //   setShowUpdateModal(false)
  // }
  function closebutton () {
    setShowModal(false)
  }

  function haaa () {
    setShowModal(true)
  }


  return (
    <>
      <Intercepter />

      <div
        className='container-fluid text center row  mt-5 ml-5'
        // style={{ marginLeft: '220px' }}
      >
        <div className='col-sm-4'>
          <Link className='btn btn-warning' to={`/contact`}>
            Go Back
          </Link>
        </div>
        <div className='col-sm-4'>
          <Link
            type='submit'
            className='btn btn-primary'
            data-toggle='modal'
            data-target='#myModal'
            onClick={haaa}
          >
            ADD ROOMS
          </Link>
        </div>
        <div className='col-sm-4'>
          <Link
            className='btn btn-primary text-white px-4 pt-3'
            // style={{ marginLeft: '1600px' }}
            data-toggle='collapse'
            data-target='#demo1'
          
          >
            DELETE ROOMS
          </Link>
        </div>
      </div>

      <div
        id='demo1'
        className='collapse bg-light container'
        data-placement='bottom'
      >
        <table className='table table-bordered text-center'>
          <>
            <thead>
              <tr>
                <th>ROOM</th>
                <th>DELETE ROOM</th>
                {/* <th>Email</th> */}
              </tr>
            </thead>
            {data &&
              data.map(hotel => (
                <tbody>
                  <tr>
                    <td>
                      <h5>{hotel.title}</h5>
                    </td>
                    <td>
                      <Link
                        className='btn btn-danger'
                        onClick={() =>{ handleDeleteRooms(hotel._id)}}
                        // onClick={()=>setIsDemo1Open(!isDemo1Open)}
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

      <div className='d-flex row ml-5 mt-5'>
        {data &&
          data.map(ob => (
            <div
              className='card bg-white text-dark m-3'
              style={{
                width: '400px',
                textDecoration: 'none'
              }}
            >
              {/* {console.log(ob,"objectsssssssssss")} */}
              {ob.photos.map(photo => (
                <img
                  src={photo.filename}
                  height='300px'
                  width='400px'
                  alt='No image found'
                />
              ))}
              <div className='card-body '>
                <h4 className='card-title'>ROOM:{ob.title}</h4>
                <p className='card-text'>DESC:{ob.desc}</p>
                <p className='card-text'>PRICE:{ob.price}</p>
                {ob.roomNumbers.map(room => (
                  <p className='card-text'>ROOM_NUMBER :{room.number}</p>
                ))}
              
              </div>
            </div>
          ))}
      </div>

      {showModal ? (
        <div className='modal fade ' id='myModal'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              {/* <!-- Modal Header --> */}
              <div className='modal-header'>
                <h4 className='modal-title'>Fill Data About Room</h4>
                <button type='button' className='close' data-dismiss='modal'>
                  &times;
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <div className='modal-body'>
                <div className='container p-4 mt-5'>
                  {/* <h1 className="text-center">Add a New Room</h1> */}
                  <form
                    onSubmit={handleSubmit}
                    method='POST'
                    encType='multipart/form-data'
                  >
                    <div className='form-group'>
                      <label>Title:</label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Description:</label>
                      <textarea
                        className='form-control'
                        name='desc'
                        rows='3'
                        value={formData.desc}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Price:</label>
                      <input
                        type='number'
                        className='form-control'
                        name='price'
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Max People:</label>
                      <input
                        type='number'
                        className='form-control'
                        name='maxPeople'
                        value={formData.maxPeople}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Room Numbers:</label>
                      {formData.roomNumbers.map((roomNumber, index) => (
                        <div key={index} className='input-group mb-2'>
                          <input
                            type='number'
                            className='form-control'
                            name='roomNumber'
                            value={roomNumber.number}
                            onChange={e => handleRoomNumberChange(e, index)}
                            required
                          />
                          <div className='input-group-append'>
                            <button
                              className='btn btn-danger'
                              type='button'
                              onClick={() => handleRemoveRoomNumber(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        className='btn btn-primary'
                        type='button'
                        onClick={handleAddRoomNumber}
                      >
                        Add Room Number
                      </button>
                    </div>
                    <div className='form-group'>
                      <label>Photo:</label>
                      <input
                        type='file'
                        className='form-control-file'
                        name='photo'
                        onChange={handleFileChange}
                        accept='photo/*'
                        required
                      />
                    </div>
                    <button type='submit' className='btn btn-primary' 
                    // onClick={()=>setModal(!modalshow)}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-danger'
                  data-dismiss='modal'
                  onClick={closebutton}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default ShowRooms
