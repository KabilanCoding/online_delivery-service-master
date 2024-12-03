import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerDashBoard = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/customers/" + user.email
        );
        setUserDetails(res.data);
        console.log(res.data);
      } catch (e) {
        notify(e.message);
        console.log(e);
      }
    };
    fetch();
  }, [user.email]);
  const notify = (message) => toast.error(message);
  return (
    <>
      <Navbar />
      <div className="flex-center-full">
        <div className="profile-card">
          <div className="cover-photo">
            <img
              src="https://img.freepik.com/free-vector/delivery-courier-service-flat-composition-with-cityscape-delivery-boy-riding-bike-with-smartphone-tracking-app-vector-illustration_1284-74349.jpg?size=626&ext=jpg&ga=GA1.2.638213289.1690206114&semt=ais"
              alt="Cover"
            />
          </div>
          <div className="profile-details">
            <img
              src="https://i.imgur.com/KykRUCV.jpeg"
              alt="Profile"
              className="profile-pic"
            />
            <h2>{userDetails?.name}</h2>
            <p>
              <h5>Email:</h5> {userDetails.user && userDetails.user.email}
            </p>
            {user.address ? (
              <>
                <p>Contact No: profileData.contact</p>
                <p>Locality: profileData.locality</p>
              </>
            ) : (
              <div className="field-container">
                <Button
                  variant="contained"
                  type="submit"
                  className="bg-orange"
                  fullWidth
                  onClick={() => {
                    navigate("/dashboard/shop-owner/complete-profile");
                  }}
                >
                  Complete Your Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default CustomerDashBoard;
