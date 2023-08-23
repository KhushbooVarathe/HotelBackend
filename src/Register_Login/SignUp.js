import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBarAdmin from '../Components/SideBarAdmin'

function SignUp () {
  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    isAdmin: false,
    image: null,
    address: '',
    DOB: '',
    city: ''
  })

  const navigate = useNavigate()

  function handleChange (e) {
    if (e.target.name === 'image') {
      setData({ ...data, [e.target.name]: e.target.files[0] })
    } else if (e.target.name === 'isAdmin') {
      setData({ ...data, [e.target.name]: true })
    } else {
      setData({ ...data, [e.target.name]: e.target.value })
    }
  }

  function handleSubmit (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('isAdmin', data.isAdmin)
    formData.append('image', data.image)
    formData.append('address', data.address)
    formData.append('DOB', data.DOB)
    formData.append('city', data.city)
    // formData.append('dateOfJoining', data.dateOfJoining) // Add date of joining to the formData
    axios.post('https://backend-eoh8.onrender.com/api/register', formData).then(res => {
      console.log(res.data, 'gggggggg')
      if (res.data.newData === true) alert(res.data.data)
        navigate('/newadmin');
    })
  }
  // console.log(data,"dataaaaaaaaaa")
  return (
    <>
    <div className='d-flex'>
      <SideBarAdmin/>
   
      <div
        style={{
          height: '900px',
          width: '800px',
          marginLeft: '300px',
          marginTop: '20px'
        }}
        className='bg-light p-5'
      >
        <h1 className='bg-dark text-center text-light p-2'>CREATE ADMIN</h1>
        <form className='text-dark' method='POST' encType='multipart/form-data'>
          <div className='form-group'>
            <label htmlFor='username'>Username:</label>
            <input
              type='email'
              className='form-control'
              id='username'
              placeholder='Enter username'
              name='username'
              value={data.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='Enter email'
              name='email'
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              className='form-control'
              id='password'
              placeholder='Enter password'
              name='password'
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* New image upload */}
          <div className='form-group'>
            <label htmlFor='image'>Profile Image:</label>
            <input
              type='file'
              className='form-control'
              id='image'
              name='image'
              accept='image/*'
              onChange={handleChange}
            />
          </div>
          {/* New address field */}
          <div className='form-group'>
            <label htmlFor='address'>Address:</label>
            <input
              type='text'
              className='form-control'
              id='address'
              placeholder='Enter address'
              name='address'
              value={data.address}
              onChange={handleChange}
              required
            />
          </div>
          {/* New DOB field */}
          <div className='form-group'>
            <label htmlFor='DOB'>Date of Birth:</label>
            <input
              type='date'
              className='form-control'
              id='DOB'
              name='DOB'
              value={data.DOB}
              onChange={handleChange}
              required
            />
          </div>
          {/* New date of joining field
          <div className='form-group'>
            <label htmlFor='dateOfJoining'>Date of Joining:</label>
            <input
              type='date'
              className='form-control'
              id='dateOfJoining'
              name='dateOfJoining'
              value={data.dateOfJoining}
              onChange={handleChange}
              required
            />
          </div> */}
          {/* New city field */}
          <div className='form-group'>
            <label htmlFor='city'>City:</label>
            <input
              type='text'
              className='form-control'
              id='city'
              placeholder='Enter city'
              name='city'
              value={data.city}
              onChange={handleChange}
              required
            />
          </div>
          {/* New isAdmin checkbox */}
          <div className='form-group'>
            <label htmlFor='isAdmin'>Is Admin:</label>
            <input
              type='checkbox'
              className='form-control'
              id='isAdmin'
              name='isAdmin'
              checked={data.isAdmin}
              onChange={handleChange}
            />
          </div>
          <button
            type='submit'
            className='btn btn-primary'
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
      </div>
    </>
  )
}

export default SignUp

// import axios from 'axios';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function SignUp() {
//   const [data, setData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     isAdmin: false,
//     image: null, // New field for image file
//     address:'',
//     DOB:'',
//     city:''
//   });

//   const navigate = useNavigate();

//   function handleChange(e) {
//     if (e.target.name === 'image') {
//       setData({ ...data, [e.target.name]: e.target.files[0] });
//     }
//    else if (e.target.name === 'isAdmin') {
//       setData({ ...data, [e.target.name]: true });
//     }
//      else {
//       setData({ ...data, [e.target.name]: e.target.value });
//     }
//   }
// let formData;
//   function handleSubmit(e) {
//     e.preventDefault();
//      formData = new FormData();
//     formData.append('username', data.username);
//     formData.append('email', data.email);
//     formData.append('password', data.password);
//     formData.append('isAdmin', data.isAdmin);
//     formData.append('image', data.image);
//     console.log(formData,"formData")

//     axios.post('http://localhost:7000/api/register', formData).then((res) => {
//       console.log(res.data, 'gggggggg');
//       if (res.data.newData === true) alert(res.data.data);
//     //   navigate('/login');
//     });
//   }

//   return (
//     <>
//       <div style={{ height: '500px', width: '500px' }} className='bg-light p-5 m-5'>
//         <h1 className='bg-dark text-center text-light p-2'>SIGNUP_ADMIN</h1>
//         <form className='text-warning' method="POST" encType="multipart/form-data">
//           <div className='form-group'>
//             <label htmlFor='username'>Username:</label>
//             <input
//               type='email'
//               className='form-control'
//               id='username'
//               placeholder='Enter username'
//               name='username'
//               value={data.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <label htmlFor='email'>Email:</label>
//             <input
//               type='email'
//               className='form-control'
//               id='email'
//               placeholder='Enter email'
//               name='email'
//               value={data.email}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className='form-group'>
//             <label htmlFor='password'>Password:</label>
//             <input
//               type='password'
//               className='form-control'
//               id='password'
//               placeholder='Enter password'
//               name='password'
//               value={data.password}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           {/* New isAdmin checkbox */}
//           <div className='form-group'>
//             <label htmlFor='isAdmin'>Is Admin:</label>
//             <input
//               type='checkbox'
//               className='form-control'
//               id='isAdmin'
//               name='isAdmin'
//               checked={data.isAdmin}
//               onChange={handleChange}
//             />
//           </div>
//           {/* New image upload */}
//           <div className='form-group'>
//             <label htmlFor='image'>Profile Image:</label>
//             <input
//               type='file'
//               className='form-control'
//               id='image'
//               name='image'
//               accept='image/*'
//               onChange={handleChange}
//             />
//           </div>
//           <button type='submit' className='btn btn-primary' onClick={handleSubmit}>
//             Sign Up
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default SignUp;
