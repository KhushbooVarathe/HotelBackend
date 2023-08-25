import jwt_decode from 'jwt-decode'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
function PrivateComponent () {
  const auth = JSON.parse(localStorage.getItem('token'))

  var decoded = jwt_decode(auth)

  return (
    <>
      {decoded ? (
        <Outlet />
      ) : (
        <>
          <Navigate to='/login' />
        </>
      )}
    </>
  )
}

export default PrivateComponent
