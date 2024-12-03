import { Button, TextField } from "@mui/material";
import Navbar from "../../Components/Navbar";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompleteShopProfile() {
  const notify = (m) => toast.error(m);
  const notifySuccess = (m) => toast.success(m);
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState({
    shopName: "",
    doorNo: "",
    street: "",
    locality: "",
    contactNo: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/shop-owners/add-address/" + user.email,
        userDetails
      );
      console.log(res);
      notifySuccess("Profile updated successfully");
    } catch (e) {
      notify(e.CODE);
    }
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
              value={userDetails.CompleteShopProfile}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  shopName: e.target.value,
                });
              }}
              type="text"
              id="text"
              label="Shop Name"
              variant="outlined"
              fullWidth
            ></TextField>
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
              label="Contact No"
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
      </div>{" "}
      <ToastContainer />
    </>
  );
}

export default CompleteShopProfile;
