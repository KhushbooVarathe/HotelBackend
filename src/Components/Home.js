import React from 'react';
import home from './Home.jpg';
import room1 from './room1.webp';
import room2 from './room2.jpg';
import room3 from './room3.jpg';
import room4 from './room4.jpg';
import room5 from './room5.jpg';
import room6 from './room6.jpg';
import SideBarAdmin from './SideBarAdmin';
import Intercepter from '../intercepter/Intercepter';

function Home() {
  const imagesArray = [room1, room2, room3, room4, room5, room6];
 
  return (
    <>
    <Intercepter/>
      <div className='d-flex'>
        <SideBarAdmin />
        <div className='container-fluid mt-1 text-light'>
          {/* <h3 className='text-center p-5' style={{ fontSize: '70px' }}>
            WELCOME_TO HOME PAGE
          </h3> */}
          <div id='demo' className='carousel slide' data-ride='carousel'>
            <ul className='carousel-indicators'>
              {imagesArray.map((_, index) => (
                <li
                  key={index}
                  data-target='#demo'
                  data-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                />
              ))}
            </ul>
            <div className='carousel-inner'>
              {imagesArray.map((imageurl, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                  <img
                    src={imageurl}
                    alt={`Image ${index + 1}`}
                    width='100%'
                    height='600'
                  />
                  <div className='carousel-caption'>
                    <h3>Image {index + 1}</h3>
                    <p>Image description goes here</p>
                  </div>
                </div>
              ))}
            </div>
         
            <a class="carousel-control-prev" href="#demo" data-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </a>
  <a class="carousel-control-next" href="#demo" data-slide="next">
    <span class="carousel-control-next-icon"></span>
  </a> </div>
          <div className='d-flex flex-wrap'>
            {imagesArray.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Image ${index + 1}`}
                style={{ width: '300px', height: '250px', margin: '10px',marginLeft:'25px' }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

// import React from 'react'
// import home from './Home.jpg'
// import room1 from './room1.webp'
// import room2 from './room2.jpg'
// import room3 from './room3.jpg'
// import room4 from './room4.jpg'
// import room5 from './room5.jpg'
// import room6 from './room6.jpg'
// import SideBarAdmin from './SideBarAdmin';
// function Home () {
//   const imagesArray=[
// room1,room2,room3,room4,room5,room6
//   ]
//   return (
//     <>
     
//       <div className='d-flex'>
//         <SideBarAdmin/>
     
//     <div className='container-fluid mt-5 text-light'>

//         <h3 className='text-center p-5' style={{ fontSize: '70px' }}>WELCOME_TO HOME PAGE</h3>
      
//       <div>
       
//         <>
//           <div id="demo" class="carousel slide" data-ride="carousel">
//             <>
//             {imagesArray.map((imageurl,index=>
         
//       <ul class="carousel-indicators">
//     <li data-target="#demo" data-slide-to={index} class="active"></li>
//     {/* <li data-target="#demo" data-slide-to="1"></li>
//     <li data-target="#demo" data-slide-to="2"></li> */}
//   </ul>
//   <div class="carousel-inner">
//     <div class="carousel-item active">
//       <img key={index}
//           src={imageurl}alt="Los Angeles" width="1100" height="500"/>
//       <div class="carousel-caption">
//         <h3>Los Angeles</h3>
//         <p>We had such a great time in LA!</p>
//       </div>   
//     </div>
//     </div>
//       </div>
//         </>
//           ))}
    
//       </div>
//         <div>
//       {imagesArray.map((imageUrl, index) => (
//         <img
//           key={index}
//           src={imageUrl}
//           alt={`Image ${index + 1}`}
//           style={{ width: '300px', height: '250px', margin: '10px',marginLeft:'25px' }}
//         />
//       ))}
//     </div>
//     </div>
//       </div>
//     </>
//   )
// }

// export default Home
