// import React from 'react'
// import { Link, Navigate, useNavigate } from 'react-router-dom'

// function Navbaradmin () {
//   const name=JSON.parse(localStorage.getItem('token'))
//     console.log(name,"toen")
//   const navigate = useNavigate()
//   function logoutfun () {
//     localStorage.clear()
//     navigate('/login')
//   }
//   return (
//     <>
//       <nav className='navbar navbar-expand-md bg-info navbar-dark'>
//         {/* <img /> */}
//         <a className='navbar-brand' href='#'>
//           <img
//             src='logo.png'
//             alt='logo'
//             style={{ height: '80px', width: '80px' }}
//           />
//         </a>
//         <button
//           className='navbar-toggler'
//           type='button'
//           data-toggle='collapse'
//           data-target='#collapsibleNavbar'
//         >
//           <span className='navbar-toggler-icon'></span>
//         </button>
//         <div
//           className='collapse navbar-collapse justify-content-end '
//           id='collapsibleNavbar'
//         >
//           <ul className='navbar-nav'>
//             {name?<>
//             <li className='nav-item'>
//               <Link className='nav-link m-3' to='/home'>
//                 {' '}
//                 <h4>link</h4>
//               </Link>
//             </li>
//             <li className='nav-item'>
//               <Link className='nav-link m-3' to='/users'>
//                 <h4>link users</h4>
//               </Link>
//             </li>
//             <li className='nav-item'>
//               <Link className='nav-link m-3' to='/bills'>
//                 {' '}
//                 <h4>BILLS</h4>
//               </Link>
//             </li>
//             <li className='nav-item'>
//               <Link className='nav-link m-3' to='/hotels'>
//                 {' '}
//                 <h4>ALL HOTELS</h4>
//               </Link>
//             </li>
//             <li className='nav-item'>
//               <Link className='nav-link m-3' to='/profile'>
//                 {' '}
//                 <h4>Admin_Profile</h4>
//               </Link>
//             </li></>
//             :
//             <>
//             <li className='nav-item'>
//               <Link className='nav-link m-3' to='/login'>
//                 {' '}
//                 <h4>login</h4>
//               </Link>
//             </li>
//             <li className='nav-item'>
//               <Link className='nav-link' onClick={logoutfun} to='/signup'>
//                 <h5>Logout</h5>
//                 <span className='text-danger'>auth name</span>
//               </Link>
//             </li></>
// }</ul>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default Navbaradmin
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Intercepter from '../intercepter/Intercepter'

function Navbaradmin () {
  const name = JSON.parse(localStorage.getItem('name'))
  const navigate = useNavigate()

  function logoutfun () {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <div>
      {/* <Intercepter/> */}
      <nav className='navbar navbar-expand-sm bg-dark p-3 navbar-dark'>
        <a className='navbar-brand' href='#'>
          <img
            src='logo.png'
            alt='logo'
            style={{ height: '60px', width: '60px' }}
          />
        </a>
        <ul className='navbar-nav justify-content-end'>
          {name ? (
            <>
            <div className='d-flex flex-row mt-4'>
              <li className='nav-item active'>
                <Link className='nav-link' to='/'>
                  <h5>Home</h5>
                </Link>
              </li>
              {/* <li className='nav-item'>
                <Link className='nav-link' to='/product'>
                  <h5>Product</h5>
                </Link>
              </li> */}

              {/* <li className='nav-item'>
                <Link className='nav-link' to='/registeredUsers'>
                  <h5>Registered Users</h5>
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/newadmin'>
                  <h5>Add_New_Admin</h5>
                </Link>
              </li> */}
              </div>
              <div className='d-flex flex-row mt-3 ' style={{marginLeft:'1700px'}}>
                {/* <li className='nav-item'>
                  <Link className='nav-link' to='/profile'>
                    <h5>Profile</h5>
                  </Link>
                </li> */}

                <li className='nav-item'>
                  <Link className='nav-link btn btn-light text-dark'  onClick={logoutfun} to='/login'>
                    <h5>Logout</h5>
                    {/* <span className='text-danger'>{name}</span> */}
                  </Link>
                </li>
                
                <h4 className='text-white ml-5 p-2'><i class='fas fa-user-circle ml-4'></i><br/>{name}</h4>
              </div>
            </>
          ) : (
            <>
              <div
                className='m-2'
                style={{ marginLeft: '1500px' }}
              >
                {/* <li className='nav-item '>
                  <Link className='nav-link  text-right' to='/signup'>
                    <h5>SignUp</h5>
                  </Link>
                </li> */}
                
               
                <li className='nav-item'>
                  <Link className='nav-link' to='/login'>
                    <h5>Login</h5>
                  </Link>
                </li>
              </div>
            </>
          )}
        </ul>
      </nav>
    </div>
    // <>
    //   <nav className='navbar navbar-expand-md bg-info navbar-dark'>
    //     <a className='navbar-brand' href='#'>
    //       <img
    //         src='logo.png'
    //         alt='logo'
    //         style={{ height: '80px', width: '80px' }}
    //       />
    //     </a>
    //     <button
    //       className='navbar-toggler'
    //       type='button'
    //       data-toggle='collapse'
    //       data-target='#collapsibleNavbar'
    //     >
    //       <span className='navbar-toggler-icon'></span>
    //     </button>
    //     <div
    //       className='collapse navbar-collapse justify-content-end '
    //       id='collapsibleNavbar'
    //     >
    //       <ul className='navbar-nav'>
    //         {name ? (
    //           <>
    //             <li className='nav-item'>
    //               <Link className='nav-link m-3' to='/home'>
    //                 <h4>Link</h4>
    //               </Link>
    //             </li>
    //             {/* Add other nav items for authenticated users */}
    //             <li className='nav-item'>
    //               <Link className='nav-link m-3' to='/users'>
    //                 <h4>Link users</h4>
    //               </Link>
    //             </li>
    //             {/* Add other nav items for authenticated users */}
    //             <li className='nav-item'>
    //               <Link className='nav-link m-3' to='/bills'>
    //                 <h4>BILLS</h4>
    //               </Link>
    //             </li>
    //             {/* Add other nav items for authenticated users */}
    //             <li className='nav-item'>
    //               <Link className='nav-link m-3' to='/hotels'>
    //                 <h4>ALL HOTELS</h4>
    //               </Link>
    //             </li>
    //             {/* Add other nav items for authenticated users */}
    //             <li className='nav-item'>
    //               <Link className='nav-link m-3' to='/profile'>
    //                 <h4>Admin_Profile</h4>
    //               </Link>
    //             </li>
    //             {/* Add other nav items for authenticated users */}
    //           </>
    //         ) : (
    //           <>
    //             <li className='nav-item'>
    //               <Link className='nav-link m-3' to='/login'>
    //                 <h4>Login</h4>
    //               </Link>
    //             </li>
    //             <li className='nav-item'>
    //               <Link className='nav-link' onClick={logoutfun} to='/signup'>
    //                 <h5>Logout</h5>
    //                 <span className='text-danger'>auth name</span>
    //               </Link>
    //             </li>
    //           </>
    //         )}
    //       </ul>
    //     </div>
    //   </nav>
    // </>
  )
}

export default Navbaradmin
