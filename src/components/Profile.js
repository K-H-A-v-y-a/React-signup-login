import React, { useState } from "react";
import axios from "axios"
import {Link} from "react-router-dom";

function Profile(){
  const [age, setAge] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('male');
  const [mobileno, setMobileno] = useState('');

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

  async function submit(e) {
    e.preventDefault();


    try {
        const response = await axios.post("http://localhost:3000/profile", {
            age, dob, gender, mobileno
        });

        if (response.data.status === "error") {
            alert(response.data.message);
        } else if (response.data.status === "success") {
            alert(response.data.message);
            handleUpdateClick();
        }
    } catch (error) {
        alert("Server Error " + error.message);
        console.error(error);
    }
}

    return(
        <>
          <div className="navLink">
            <Link to="/"><p>Logout</p></Link>
          </div> 
          <div className="container">
                <div className="container-credentials">
                  <h2>Profile</h2>
                      Age: <input type="number" onChange={(e) => { setAge(e.target.value) }} placeholder="Age" name="age" /><br></br><br></br>
                      <label for="gender">Gender</label>
                      <select id="gender" onChange={handleGenderChange} value={gender}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <br></br><br></br>
                      DOB: <input type="date" onChange={(e) => { setDob(e.target.value) }} name="dob" placeholder="DOB" /><br></br><br></br>
                      Mobile Number: <input type="number" onChange={(e) => { setMobileno(e.target.value) }} name="mobile" placeholder="Mobile Number" /><br></br><br></br>
                      <button onClick={submit}>Update</button>

          {/* Conditional rendering for the success message */}
          {showSuccessMessage && (
            <div className="success-message">Successfully Updated!</div>
          )}

                </div>
          </div>

        </>

    )

}

export default Profile;