import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SearchHotel (props) {
  const [data, setData] = useState('')
  function handleSearch (e) {
    // console.log(e.target.value, 'targt value')
  
    setData(e.target.value)
  }

  
  return (
    <>
      <div className='d-flex'>
        <input
          className='form-control p-4'
          type='text'
          placeholder='Search Your Destination'
          onChange={handleSearch}
        />
        <Link className='btn btn-info ml-2 px-3' onClick={()=>props.handleSubmit(data)}>
          SEARCH
        </Link>
      </div>
    </>
  )
}

export default SearchHotel
