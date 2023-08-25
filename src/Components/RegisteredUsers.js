import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify' // Import the toast object

import SideBarAdmin from './SideBarAdmin'
import baseUrl from '../config/Congif'
import Intercepter from '../intercepter/Intercepter'
function RegisteredUsers () {
  const [data1, setData1] = useState([])

  useEffect(() => {
    getUsers()
  }, [handleDelete])
  function getUsers () {
    try {
      axios.get(`${baseUrl}/api/getUsers`).then(res => {
        setData1(res.data.filter(ob => ob.isAdmin !== true))
      })
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error)
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
        // autoClose: 3000, // Auto close the toast after 3 seconds
      })
      // You can show an error message or take any other appropriate action
    }
  }

  function handleDelete (id) {
    try {
      axios.delete(`${baseUrl}/api/deleteUsers/${id}`).then(res => {
        toast.success(res.data, {
          position: toast.POSITION.TOP_RIGHT
          // autoClose: 3000, // Auto close the toast after 3 seconds
        })
        getUsers()
      })
    } catch (error) {
      // Handle the error here
      console.error('An error occurred:', error)
      // You can show an error toast or take any other appropriate action
      toast.error('An error occurred. Please try again.', {
        position: toast.POSITION.TOP_RIGHT
      })
    }
  }

  return (
    <div className='d-flex'>
      <Intercepter />
      <SideBarAdmin />
      <div className='container-fluid'>
        <div className='row bg-light m-2 p-5'>
          <div className='col-sm-6'>
            {' '}
            <h1 className='text-danger  text-center '>USERS DETAILS</h1>
          </div>
          <div className='col-sm-6'>
            <Link className='btn btn-warning ml-5 mt-2' to='/home'>
              Go Back
            </Link>
          </div>
        </div>
        {/* <Link className='btn btn-success'>SEE ADMiNS</Link> */}

        <table class='table table-hover table-bordered bg-light'>
          <thead className='text-center p-2'>
            <tr>
              <th>Profile</th>
              <th>Username</th>
              <th>Email</th>
              {/* <th>Update_Users_Details</th> */}
              <th>Delete Users</th>
              {/* <th></th> */}
            </tr>
          </thead>
          {/* {data && data.map(ob=><h5>{ob.isAdmin}heeeee</h5>)} */}
          {data1.map(ob => (
            <>
              <tbody className='text-center'>
                <tr>
                  <td>
                    <img
                      className='rounded-circle'
                      src='images.jpeg'
                      height='50px'
                    />
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
