import React from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import config from '../config/Congif';

function Intercepter() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
    var decoded = jwt_decode(refreshToken);

    if (decoded.exp * 1000 > Date.now()) {
      var decoded_accessToken = jwt_decode(token);

      if (decoded_accessToken.exp * 1000 > Date.now()) {
        // No need to handle errors here, just continue
      } else {
        try {
          axios.get(`${config}/api/refresh`).then(res => {
            // console.log(res.data)
          });
        } catch (error) {
          // Handle the error here
          console.error("An error occurred:", error);
          // You can show an error message or take any other appropriate action
        }
      }
    } else {
      localStorage.clear();
      window.location.href = '/login';
    }

    axios.interceptors.request.use(config => {
      // Retrieve tokens from localStorage
      const accessToken = JSON.parse(localStorage.getItem('token'));
      const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
      const refreshToken = JSON.parse(localStorage.getItem('refreshToken'));
      // Set the Authorization header with the access token
      config.headers.Authorization = `Bearer ${accessToken}`;
      config.headers.isadmin = isAdmin;
      config.headers.refreshToken = refreshToken;
      // console.log('config: ', config);

      return config;
    });

    axios.interceptors.response.use(
      response => {
        // console.log(response, 'interceptor response', response.data.token)
        if (response.data.token) {
          localStorage.setItem('token', JSON.stringify(response.data.token));
        } else {
          // console.log('response.data.token is not generatedddddd')
        }

        // You can modify the response here if needed
        return response;
      },
      error => {
        console.error('Interceptor error:', error);
        // Handle error responses here
        throw error; // Rethrow the error to propagate it
      }
    );
  } catch (error) {
    // Handle errors that occurred synchronously
    console.error("An error occurred:", error);
    // You can show an error message or take any other appropriate action
  }

  return <></>;
}

export default Intercepter;
