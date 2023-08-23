import React from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Intercepter () {
  const navigate=useNavigate()
  const token = JSON.parse(localStorage.getItem('token'))
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
  const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
  var decoded = jwt_decode(refreshToken)
  console.log(decoded,'decodedddtokenappppppjs',decoded.exp * 1000 > Date.now())

  if (decoded.exp * 1000 > Date.now()) {
    console.log('not expireeee refresh tokenn')

    var decoded_accessToken = jwt_decode(token)
    // console.log(
    //   'decoded_accessToken: ',
    //   decoded_accessToken,
    //   decoded_accessToken.exp * 1000 > Date.now()
    // )
    if (decoded_accessToken.exp * 1000 > Date.now()) {
      console.log('accesstoken is not expiree')
    } else {
      console.log('access token is expired')
      axios.get('https://backend-eoh8.onrender.com/api/refresh').then(res => {
        console.log(res.data)
        // localStorage.setItem('token', JSON.stringify(res.data.token))
      })
    }
    
  } else {
    console.log('expireeeeeeeee refresh token');
    
   
    localStorage.clear();
    
    // setTimeout(() => {
    //   localStorage.clear();
    // }, 2000); // 60000 milliseconds = 1 minute
    window.location.href = '/login';
    // setTimeout(() => {
    //   localStorage.clear();
    // }, 20000); // 60000 milliseconds = 1 minute
  }
  axios.interceptors.request.use(config => {
    // Retrieve tokens from localStorage
    const accessToken = JSON.parse(localStorage.getItem('token'))
    const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
    // Set the Authorization header with the access token
    config.headers.Authorization = `Bearer ${accessToken}`
    config.headers.isadmin = isAdmin
    config.headers.refreshToken = refreshToken
    // console.log('config: ', config)
    return config
  })
  axios.interceptors.response.use(
    response => {
      // console.log(response, 'interceptor response', response.data.token)
      if (response.data.token) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
      } else {
        console.log('response.data.token is not generatedddddd')
      }

      // You can modify the response here if needed
      return response
    },
    error => {
      console.error('Interceptor error:', error)
      // Handle error responses here
      throw error // Rethrow the error to propagate it
    }
  )

  return <></>
}

export default Intercepter
