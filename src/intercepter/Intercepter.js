import React from 'react'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import baseUrl from '../config/Config'

function Intercepter () {
  const token = JSON.parse(localStorage.getItem('token'))
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
  var decoded = jwt_decode(refreshToken)

  try {
    if (decoded.exp * 1000 > Date.now()) {
      var decoded_accessToken = jwt_decode(token)

      if (decoded_accessToken.exp * 1000 > Date.now()) {
      } else {
        try {
          axios.get(`${baseUrl}/api/refresh`).then(res => {
            console.log(res.data)
          })
        } catch (error) {
          console.error('An error occurred during access token refresh:', error)
        }
      }
    } else {
      localStorage.clear()
      window.location.href = '/login'
    }

    axios.interceptors.request.use(config => {
      const accessToken = JSON.parse(localStorage.getItem('token'))
      const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
      const refreshToken = JSON.parse(localStorage.getItem('refreshToken'))
      config.headers.Authorization = `Bearer ${accessToken}`
      config.headers.isadmin = isAdmin
      config.headers.refreshToken = refreshToken
      return config
    })

    axios.interceptors.response.use(
      response => {
        if (response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data.token))
        }
        return response
      },
      error => {
        console.error('Interceptor error:', error)
        throw error // Rethrow the error to propagate it
      }
    )
  } catch (error) {
    console.error('An error occurred in Intercepter:', error)
  }

  return <></>
}

export default Intercepter
