import React, { useState } from 'react';
import axios from 'axios';
import './searchUser.css'
import nodata from '../images/nodata.jpg'

const Search = () => {
  const [formData, setFormData] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  console.log("formData",formData)

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    
    if (!value) {
      setSearchResults([]); // Clear the search results if the input is empty
    } else {
      try {
        const response = await axios.get(`http://localhost:6700/getUser/${value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };
  
  return (
    <div>
      <div className="searchContainer">
        <form
      
         className="form-container">
          <label>Employee: </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            placeholder="Enter Employee Name"
          />
        </form>
      </div>
 <div>
      { 
          searchResults && searchResults.length>0 ? (searchResults.map((user, index) => (
     <div className="container leave-card border border-dark p-2 m-5"
     style={{width:'800px'}}
     >
      <div className="user-details d-flex flex-row justify-content-between">
      
        <div className="user-info col-6">
        <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.number}</p>
        </div>
        <div className="user-image ">
          <img  src={user.imageUrl}  className="rounded-circle" alt="User" 
          style={{height:"80%",width:'100%'}}
          />
        </div>
       
      </div>
      <div className='d-flex flex-row  '>
        <p><strong>Mother Name:</strong> {user.motherName}</p>
        <p  className='mx-3 '><strong>Father Name:</strong> {user.fatherName}</p>
        </div>
        <div className='d-flex flex-row  '>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p  className='mx-3 '><strong>Joining Date:</strong> {user.joiningDate}</p>
        </div>
        
        <div className='d-flex flex-row  '>
        <p  className=''><strong>Department:</strong> {user.department}</p>

        <p  className='mx-3'><strong>Education:</strong> {user.education}</p>

        <p  className='mx-3 '><strong>Skills:</strong> {user.skills}</p>
        </div>
</div>
          )) )
          :
          (
            <div className="justify-content-center">
              {formData.name ? (
                <div>
                  {/ <h4>No user found</h4> 
/}
                  <img 
                  className='mt-5'
                  src={nodata} alt="User" style={{ height: '30%', width: '30%', marginLeft: '30%' }} />
                </div>
              ) : null}
            </div>
          )
        
}
      </div>

    </div>
  );
};

export default Search;