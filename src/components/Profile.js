import React, { useState } from "react";
import { Link } from "react-router-dom";

function Profile() {
  // const history = useNavigate();
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Gender');
  const [mobileno, setMobileno] = useState('');
  const [data, setData] = useState('');

  const handleGenderChange = (e) => {
    setGender(e.target.value); // Update the gender state when a radio button is selected
  };

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleUpdateClick = () => {
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
    
    setAge('');
    setDob('');
    setGender('');
    setMobileno('');
  };

  const handleProfileUpdate = async () => {
    try {
      // Send a POST request to your server for profile update
      const response = await fetch("http://localhost:3000/profile", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ age, dob, gender, mobileno }),
      });

      const result = await response.json();

      if (result.status === "error") {
        setData(result.message);
      } else if (result.status === "success") {
        setData(result.message);
        handleUpdateClick();
      }
    } catch (error) {
      console.error("Server Error", error);
    }
  };

  return (
    <>
      <div className="navLink">
        <Link to="/"><p>Logout</p></Link>
      </div>
      <div className="container">
        <div className="container-credentials">
          <h2>Profile</h2>
          <input type="number" onChange={(e) => setAge(e.target.value)} placeholder="Age" name="age" /><br /><br />
          <select id="gender" onChange={handleGenderChange} value={gender} className="custom-select">
            <option value="" >
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br /><br />
          <input type="date" onChange={(e) => setDob(e.target.value)} name="dob" placeholder="DOB" /><br /><br />
          <input type="number" onChange={(e) => setMobileno(e.target.value)} name="mobile" placeholder="Mobile Number" /><br /><br />
          <button onClick={handleProfileUpdate}>Update</button>
          {showSuccessMessage && (
            <div className="success-message">Successfully Updated!</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;


