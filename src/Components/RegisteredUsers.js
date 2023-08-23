import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SideBarAdmin from './SideBarAdmin'

function RegisteredUsers () {
  // const[data,setData]=useState([])
  const [data1, setData1] = useState([])

  useEffect(() => {
    getUsers()
  }, [])
  function getUsers () {
    axios.get('https://backend-eoh8.onrender.com/api/getUsers').then(res => {
      // console.log(res.data)
      setData1(res.data.filter(ob => ob.isAdmin !== true))
      // setData(res.data)
    })
  }

  function handleDelete (id) {
    console.log(id, 'onlyoneid')
    axios.delete(`https://backend-eoh8.onrender.com/api/deleteUsers/${id}`).then(res => {
      // console.log(res.data)
      alert(res.data)
      getUsers()
    })
  }
  // console.log(data1, 'data1')
  return (
    <div className='d-flex'>
      <SideBarAdmin />
      <div className='container-fluid'>
        {/* <Link className='btn btn-success'>SEE ADMiNS</Link> */}
        <h1 className='text-danger bg-light text-center mt-3 p-5'>
          UsErS_DeTaIlS......
        </h1>
        <table class='table table-hover table-bordered bg-light'>
          <thead className='text-center p-2'>
            <tr>
              <th>Profile</th>
              <th>Username</th>
              <th>Email</th>
              {/* <th>Update_Users_Details</th> */}
              <th>Delete_Users</th>
              {/* <th></th> */}
            </tr>
          </thead>
          {/* {data && data.map(ob=><h5>{ob.isAdmin}heeeee</h5>)} */}
          {data1.map(ob => (
            <>
              <tbody className='text-center'>
                <tr>
                  <td>
                    <img className="rounded-circle"  src='images.jpeg' height="50px"/>
                  </td>
                  <td>{ob.username}</td>
                  <td>{ob.email}</td>
                  {/* <td className='text-center'>
                    <Link className='btn btn-primary'>Update</Link>
                  </td> */}
                  <td className='text-center'>
                    <Link
                      className='btn btn-danger'
                      onClick={() => handleDelete(ob._id)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              </tbody>
            </>
          ))}
        </table>
      </div>
    </div>
  )
}

export default RegisteredUsers
