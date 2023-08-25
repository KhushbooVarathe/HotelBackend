import React from 'react'
import dummy2 from '../images/dummy.webp'
import dummy from '../images/dummy1.jpg'
import dummy1 from '../images/dummy2.png'

function About() {
  return (
    <>
    <div className='container-fluid text-white'>
        <div className='text-center text-danger mt-1 bg-light'>
            <h1 className='p-4' style={{fontSize:'70px',fontFamily:'fantasy'}}>WELCOME TO OUR WEBSITE</h1>
        </div>
        <div class="row m-5">
      <div class="col-sm-4" > <img src={dummy}/></div>
      <div class="col-sm-4"> <img src={dummy1} style={{width:"630px"}}/></div>
      <div class="col-sm-4"> <img src={dummy2} style={{ height:'630px',width:"700px"}}/></div>
    </div>
        <div className='text-dark mt-4 bg-light'>
<h1 className='text-center p-3'>ABOUT US</h1>
<p className='text-danger mt-5 p-2' style={{fontSize:'30px'}}>
1. Luxurious Accommodations:
From cozy single rooms to spacious suites, our diverse selection of accommodations guarantees a comfortable and relaxing stay.
<br/><br/>
2. Complimentary Wi-Fi:
Stay connected with high-speed Wi-Fi available throughout the hotel, so you can keep in touch with loved ones, catch up on work, or simply browse the web.
<br/><br/>
3. Gourmet Dining:
Indulge in a culinary journey at our on-site restaurants, offering delectable dishes crafted by renowned chefs. From local specialties to international cuisines, there's something to satisfy every palate.
<br/><br/>
4. Fitness Center:
Maintain your fitness routine in our state-of-the-art fitness center equipped with modern exercise machines and equipment.
<br/><br/>
5. Spa and Wellness:
Treat yourself to relaxation with our spa and wellness facilities. Enjoy soothing massages, rejuvenating treatments, and a tranquil atmosphere.
<br/><br/>
6. Swimming Pool:
Take a refreshing dip in our sparkling swimming pool or lounge by the poolside for a leisurely day under the sun.
<br/><br/>
7. Business Center:
For our business travelers, our well-equipped business center offers a quiet and productive space to attend to work matters.
<br/><br/>
8. 24/7 Room Service:
Experience the convenience of 24/7 room service, ensuring that your needs are met at any hour of the day.

9. Concierge Services:
Our dedicated concierge team is available to assist you with booking local tours, arranging transportation, and providing recommendations for nearby attractions.
<br/><br/>
10. Child-Friendly Amenities:
Families are welcome! We offer child-friendly amenities, including play areas and babysitting services, so both parents and kids can have an enjoyable stay.
<br/><br/>
11. Pet-Friendly Accommodations:
Traveling with your furry friend? We offer pet-friendly accommodations to ensure that your four-legged companion enjoys the stay too.
<br/><br/>
12. Event Spaces:
Hosting an event? Our flexible event spaces are suitable for weddings, conferences, and gatherings of all sizes.
<br/><br/>
13. Secure Parking:
Rest assured with our secure parking facilities, ensuring the safety of your vehicle during your stay.
</p>
        </div>
    </div>
    </>
  )
}

export default About