import React, { useCallback, useState,useEffect } from 'react'
import { useNavigate,Link } from 'react-router-dom'

function VideoHome() {
    const [value,setValue]=useState()
    useEffect(() => {
      RandomNumber()
    }, [])
    function RandomNumber(){
      const randomnum=Math.floor(Math.random() * 900000) + 100000;
      setValue(randomnum)
    }
    
    const navigate=useNavigate()
    const joinmeet=useCallback(()=>{
        navigate(`/room/${value}`)
    },[navigate,value])
  return (
 <>
 <div className='text-left ml-5 mt-5'> <Link className='btn btn-warning' to='/home'>Go Back</Link></div>
 
  <h2 className='text-light text-center m-5'>Create Your call</h2>
  <div className='container mt-5 d-flex'>
   
        <input type='text' className='form-control mb-1 p-4 mr-sm-2'placeholder='enter your code' value={value} onChange={e=>setValue(e.target.value)}/>
        <button className='btn btn-success' onClick={joinmeet}>Join Meeting</button>
    </div>
 </>
  )
}

export default VideoHome