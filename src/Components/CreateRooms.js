import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CreateRooms() {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        price: '',
        maxPeople: '',
        roomNumbers: [{ number: '' }],
        photo: null,
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleRoomNumberChange = (e, index) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
          const updatedRoomNumbers = [...prevData.roomNumbers];
          updatedRoomNumbers[index] = { number: value };
          return {
            ...prevData,
            roomNumbers: updatedRoomNumbers,
          };
        });
      };
    
      const handleAddRoomNumber = () => {
        setFormData((prevData) => ({
          ...prevData,
          roomNumbers: [...prevData.roomNumbers, { number: '' }],
        }));
      };
    
      const handleRemoveRoomNumber = (index) => {
        setFormData((prevData) => {
          const updatedRoomNumbers = prevData.roomNumbers.filter((_, i) => i !== index);
          return {
            ...prevData,
            roomNumbers: updatedRoomNumbers,
          };
        });
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
          ...prevData,
          photo: file,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Send the form data and photo to the server for further processing
        console.log(formData);
        // Reset the form fields after submitting
        setFormData({
          title: '',
          desc: '',
          price: '',
          maxPeople: '',
          roomNumbers: [{ number: '' }],
          photo: null,
        });
      };
    console.log(formData,"formmmdataaaaaaaaa")
  return (
   <>
   {/* <Link className='btn btn-primary' to=''>ADD ROOMS</Link> */}
   
   </>
  )
}

export default CreateRooms