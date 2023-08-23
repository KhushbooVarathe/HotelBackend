import React from 'react'
import { useParams,Link } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'

function Room() {
    const user=JSON.parse(localStorage.getItem('name'))
    console.log('user: ', user);
    const { id } = useParams()
    console.log('roomid: ', id)
    const mymeeting = element => {
      const appID = 1935856324
      const serverSecret = '9b649f091a2a18042795b94120d3bf5e'
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        id,
        Date.now().toString(),
        // 'Khushboo Varathe'
        user
      )
      const zc = ZegoUIKitPrebuilt.create(kitToken)
      zc.joinRoom({
        container: element,
        sharedLinks:[{
          name:"Copy Link",
          url:`https://deploygitvideocall.onrender.com/room/${id}`
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall
  
       },
      // showTurnOffRemoteCameraButton:true,
        showScreenSharingButton:true,
      //   showTurnOffRemoteMicrophoneButton:true,
        
      })
    }
  
  return (
    <div className='container bg-light text-center'>
    <div ref={mymeeting}>
    {/* <Link className='mt-5'>Share Link</Link> */}

    </div>
    {/* <div className=''>

    <Link className=''>Share Link</Link>
    </div> */}
  </div>
  )
}

export default Room