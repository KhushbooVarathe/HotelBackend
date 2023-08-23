import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom'
function ShowRooms () {
  const navigate = useNavigate()
  const [updateroom, setUpdateRoom] = useState()
  const [showModal, setShowModal] = useState(false) // State to control the first modal visibility
  const [showUpdateModal, setShowUpdateModal] = useState(false) // State to control the second modal visibility
  const token = JSON.parse(localStorage.getItem('token'))
  // console.log(token, typeof token)
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  // console.log(isAdmin, 'isAdmin')
  const { id } = useParams()
  const [data, setData] = useState([])
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    price: '',
    maxPeople: '',
    roomNumbers: [{ number: '' }],
    photo: null
  })
  useEffect(() => {
    axios
      .get(`http://localhost:7000/api/gethotelroom/${id}`
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
  console.log(data, 'dataa')

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
    e.preventDefault()

    const formDataToSend = new FormData()

    formDataToSend.append('title', formData.title)
    formDataToSend.append('desc', formData.desc)
    formDataToSend.append('price', formData.price)
    formDataToSend.append('maxPeople', formData.maxPeople)

    formData.roomNumbers.forEach((roomNumber, index) => {
      formDataToSend.append(`roomNumbers[${index}]`, roomNumber.number)
    })

    formDataToSend.append('photo', formData.photo)

    // console.log(formDataToSend, 'formDataToSend')

    axios
      .post(`https://backend-eoh8.onrender.com/api/createRoom/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          isAdmin: `${isAdmin}`
        }
      })
      .then(res => {
        // console.log(res.data, 'Response')
        alert(res.data)
        // navigate('/admins/:id')

        // Reset the form fields after submitting
        // setFormData({
        //   title: '',
        //   desc: '',
        //   price: '',
        //   maxPeople: '',
        //   roomNumbers: [{ number: '' }],
        //   photo: null,
        // });
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }
  // console.log(formData, 'formData')
  function handleDeleteRooms (roomid) {
    // e.preventDefault()
    console.log('deleteROoms', roomid, 'deleterooom', id)
    axios
      .delete(`https://backend-eoh8.onrender.com/api/deleteRoom/${roomid}/${id}`
      // , {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     isAdmin: `${isAdmin}`
      //   }
      // }
      )
      .then(res => {
        // console.log(res.data,"resssssssssss")
        alert(res.data)
      })
  }
  function handleupdate () {
    setShowUpdateModal(false)
  }
  function closebutton () {
    setShowModal(false)
  }
  function handleUpdaterooms (id) {
    console.log(id, 'handleUpdaterooms', data)
    const newdata1 = data.filter(ob => ob._id == id)
    console.log(newdata1)
    setUpdateRoom(newdata1[0])
    setShowUpdateModal(true)
    // navigate(`/updateroom/${id}`)
  }
  function haaa () {
    setShowModal(true)
  }
  function handleSubmit1 () {
    console.log('chalaaaaaaa')
    // axios.put(`http://localhost:7000/api/updateRoom/`)
  }
  console.log('updateroom==>', updateroom)
  function handleChange1 () {
    console.log('heheh')
  }
  function handleRoomNumberChange1 () {
    console.log('heheh')
  }
  function handleRemoveRoomNumber1 () {
    console.log('heheh')
  }
  function handleFileChange1 () {
    console.log('heheh')
  }
  function handleAddRoomNumber1 () {
    console.log('heheh')
  }
  return (
    <>
      <Link
        type='submit'
        className='btn btn-primary m-5'
        data-toggle='modal'
        data-target='#myModal'
        onClick={haaa}
      >
        ADD ROOMS
      </Link>
      {/* {data && data.map(ob=>
        <Link
       
        className='btn btn-primary m-5'
       onClick={()=>handleDeleteRooms(ob._id)}
      >
        DELETE ROOMS
      </Link>
        )} */}
      <Link
        className='btn btn-primary text-white px-4 pt-3'
        style={{ marginLeft: '1600px' }}
        data-toggle='collapse'
        data-target='#demo1'
      >
        DELETE_ROOMS
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
                        onClick={() => handleDeleteRooms(hotel._id)}
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
      {/* <div className="card " style={{height:'400px',width:'400px'}}>
    <img className="card-img-top rounded-circle" src="favicon.ico" alt="Card image"   />
    <div className="card-body">
      <h4 className="card-title">John Doe</h4>
      <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
      <a href="#" className="btn btn-primary stretched-link">See Profile</a>
    </div>
  </div> */}
      <div className='d-flex'>
        {data &&
          data.map(ob => (
            <div
              className='card bg-white text-dark card-columns  m-3'
              style={{
                height: '600px',
                width: '400px',
                textDecoration: 'none'
              }}
            >
              {/* {console.log(ob,"objectsssssssssss")} */}
              {ob.photos.map(photo => (
                <img
                  src={photo.filename}
                  height='400px'
                  width='400px'
                  alt='No image found'
                />
              ))}
              {/* {ob.photos.map(obj=>{
              console.log(obj.filename,"obj")
            })} */}

              {/* <img
              className='card-img-top rounded-circle'
              src='favicon.ico'
              alt='Card image'
              style={{ height: '200px', width: '200px' }}
            /> */}
              <div className='card-body '>
                <h4 className='card-title'>ROOM:{ob.title}</h4>
                <p className='card-text'>DESC:{ob.desc}</p>
                <p className='card-text'>PRICE:{ob.price}</p>
                {ob.roomNumbers.map(room => (
                  <p className='card-text'>ROOM_NUMBER :{room.number}</p>
                ))}
                <Link
                  className='btn btn-danger'
                  type='submit'
                  data-toggle='modal'
                  data-target='#myModal'
                  onClick={() => handleUpdaterooms(ob._id)}
                >
                  UPDATE DETAILS
                </Link>

                {/* <a href="#" className="btn btn-primary">Add Rooms</a> */}
                {/* <Link
          to={`/admins/${ob._id}`} className='btn btn-secondary'> SEE ROOMS</Link> */}
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
                    <button type='submit' className='btn btn-primary'>
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
      {showUpdateModal ? (
        <div class='modal fade' id='myModal'>
          <div class='modal-dialog modal-xl'>
            <div class='modal-content'>
              {/* <!-- Modal Header --> */}
              <div class='modal-header'>
                <h4 class='modal-title'>UPDATE</h4>
                <button type='button' class='close' data-dismiss='modal'>
                  &times;
                </button>
              </div>

              {/* <!-- Modal body --> */}
              <div class='modal-body'>
                <div className='container p-4 mt-5'>
                  {/* <h1 className="text-center">Add a New Room</h1> */}
                  <form
                    onSubmit={handleSubmit1}
                    method='PUT'
                    encType='multipart/form-data'
                  >
                    <div className='form-group'>
                      <label>Title:</label>
                      <input
                        type='text'
                        className='form-control'
                        name='title'
                        value={updateroom.title}
                        onChange={handleChange1}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Description:</label>
                      <textarea
                        className='form-control'
                        name='desc'
                        rows='3'
                        value={updateroom.desc}
                        onChange={handleChange1}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Price:</label>
                      <input
                        type='number'
                        className='form-control'
                        name='price'
                        value={updateroom.price}
                        onChange={handleChange1}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Max People:</label>
                      <input
                        type='number'
                        className='form-control'
                        name='maxPeople'
                        value={updateroom.maxPeople}
                        onChange={handleChange1}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label>Room Numbers:</label>
                      {updateroom.roomNumbers.map((roomNumber, index) => (
                        <div key={index} className='input-group mb-2'>
                          <input
                            type='number'
                            className='form-control'
                            name='roomNumber'
                            value={roomNumber.number}
                            onChange={e => handleRoomNumberChange1(e, index)}
                            required
                          />
                          <div className='input-group-append'>
                            <button
                              className='btn btn-danger'
                              type='button'
                              onClick={() => handleRemoveRoomNumber1(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        className='btn btn-primary'
                        type='button'
                        onClick={handleAddRoomNumber1}
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
                        //  value={updateroom[0].filename}
                        onChange={handleFileChange1}
                        accept='photo/*'
                        required
                      />
                    </div>
                    <button type='submit' className='btn btn-primary'>
                      Submit
                    </button>
                  </form>
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div class='modal-footer'>
                <button
                  type='button'
                  class='btn btn-secondary'
                  data-dismiss='modal'
                  onClick={handleupdate}
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
