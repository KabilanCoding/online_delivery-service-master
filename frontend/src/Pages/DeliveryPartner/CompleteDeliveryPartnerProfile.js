import { Button, TextField } from "@mui/material";
import Navbar from "../../Components/Navbar";
import { useState } from "react";

function CompleteDeliveryPartnerProfile() {
  const [userDetails, setUserDetails] = useState({
    doorNo: "",
    street: "",
    locality: "",
    contactNo: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(userDetails);
  }

  return (
    <>
      <Navbar />
      <div className="flex-center-full-hw">
        <form onSubmit={handleSubmit}>
          <div className="field-container">
            <h1>Complete Your Profile</h1>
          </div>
          <div className="field-container">
            <TextField
              required
              value={userDetails.doorNo}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  doorNo: e.target.value,
                });
              }}
              type="text"
              id="text"
              label="Door No"
              variant="outlined"
              fullWidth
            ></TextField>
          </div>
          <div className="field-container">
            <TextField
              required
              value={userDetails.street}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  street: e.target.value,
                });
              }}
              type="text"
              id="text"
              label="Street"
              variant="outlined"
              fullWidth
            ></TextField>
          </div>
          <div className="field-container">
            <TextField
              required
              value={userDetails.locality}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  locality: e.target.value,
                });
              }}
              type="text"
              id="text"
              label="Locality"
              variant="outlined"
              fullWidth
            ></TextField>
          </div>
          <div className="field-container">
            <TextField
              required
              value={userDetails.contactNo}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  contactNo: e.target.value,
                });
              }}
              type="text"
              id="text"
              label="Door No"
              variant="outlined"
              fullWidth
            ></TextField>
          </div>
          <div className="field-container">
            <Button
              variant="contained"
              type="submit"
              className="bg-orange"
              fullWidth
            >
              Complete
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CompleteDeliveryPartnerProfile;
