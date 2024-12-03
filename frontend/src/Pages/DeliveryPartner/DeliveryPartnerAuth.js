import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeliveryPartnerAuth() {
  const notify = (message) => toast.error(message);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState("login");
  const [deliveryPartnerLogin, setDeliveryPartnerLogin] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = {
        email: deliveryPartnerLogin.email,
        password: deliveryPartnerLogin.password,
      };
      console.log(data);
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        data
      );
      if (res.data.token === "Invalid Email/Password") {
        notify("Invalid Email/Password");
      } else {
        console.log(res);
        dispatch(
          login({
            email: deliveryPartnerLogin.email,
            password: deliveryPartnerLogin.password,
            role: "deliveryPartner",
            loggedIn: true,
          })
        );
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      notify("Invalid Email/Password");
    }
  }

  const [deliveryPartner, setDeliveryPartner] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleRegister(e) {
    e.preventDefault();
    try {
      if (deliveryPartner.password !== deliveryPartner.confirmPassword) {
        notify("Passwords won't match");
      } else {
        const data = {
          name: deliveryPartner.firstName + " " + deliveryPartner.lastName,
          email: deliveryPartner.email,
          role: "deliveryPartner",
          password: deliveryPartner.password,
        };
        console.log(data);
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          data
        );
        if (res.data.token === "Email Already exists") {
          notify("Email already exists");
        } else {
          dispatch(
            login({
              email: deliveryPartner.email,
              password: deliveryPartner.password,
              token: res.data.token,
              role: "deliveryPartner",
              loggedIn: true,
            })
          );
          navigate("/");
        }
      }
    } catch {
      notify("Network Error");
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex-center-full-hw">
        <form
          onSubmit={(e) => {
            if (state === "login") {
              handleLogin(e);
            } else {
              handleRegister(e);
            }
          }}
        >
          <h1>Delivery Partner</h1>
          <div>
            <img src="shopping-delivery.gif" alt="delivery"></img>
          </div>
          <div>
            <div className="button-header">
              <Button
                onClick={() => {
                  setState("login");
                }}
                className="color-orange"
              >
                Login
              </Button>
              |
              <Button
                onClick={() => {
                  setState("register");
                }}
                className="color-orange"
              >
                Register
              </Button>
            </div>

            {state === "login" ? (
              <>
                <div className="field-container">
                  <TextField
                    required
                    value={deliveryPartnerLogin.email}
                    onChange={(e) => {
                      setDeliveryPartnerLogin({
                        ...deliveryPartnerLogin,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    id="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    required
                    value={deliveryPartnerLogin.password}
                    onChange={(e) => {
                      setDeliveryPartnerLogin({
                        ...deliveryPartnerLogin,
                        password: e.target.value,
                      });
                    }}
                    type="password"
                    id="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <Link to={"/forgot-password"}>Forgot Password?</Link>
                </div>

                <div className="field-container">
                  <Button
                    type="submit"
                    variant="contained"
                    className="bg-orange"
                    fullWidth
                  >
                    Login
                  </Button>
                </div>
                <div className="button-header">
                  <Button
                    onClick={() => {
                      navigate("/customer-auth");
                    }}
                    className="color-orange"
                  >
                    Customer?
                  </Button>
                  |
                  <Button
                    onClick={() => {
                      navigate("/shop-auth");
                    }}
                    className="color-orange"
                  >
                    Shop Owner?
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="field-container">
                  <TextField
                    value={deliveryPartner.firstName}
                    onChange={(e) => {
                      setDeliveryPartner({
                        ...deliveryPartner,
                        firstName: e.target.value,
                      });
                    }}
                    type="text"
                    id="first-name"
                    label="First Name"
                    required
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    value={deliveryPartner.lastName}
                    onChange={(e) => {
                      setDeliveryPartner({
                        ...deliveryPartner,
                        lastName: e.target.value,
                      });
                    }}
                    type="text"
                    id="last-name"
                    label="Last Name"
                    required
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    value={deliveryPartner.email}
                    onChange={(e) => {
                      setDeliveryPartner({
                        ...deliveryPartner,
                        email: e.target.value,
                      });
                    }}
                    type="email"
                    id="email"
                    label="Email"
                    required
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    value={deliveryPartner.password}
                    onChange={(e) => {
                      setDeliveryPartner({
                        ...deliveryPartner,
                        password: e.target.value,
                      });
                    }}
                    type="password"
                    id="password"
                    label="Password"
                    required
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    value={deliveryPartner.confirmPassword}
                    onChange={(e) => {
                      setDeliveryPartner({
                        ...deliveryPartner,
                        confirmPassword: e.target.value,
                      });
                    }}
                    type="password"
                    id="confirm-password"
                    label="Confirm password"
                    required
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <Button
                    variant="contained"
                    type="submit"
                    className="bg-orange"
                    fullWidth
                  >
                    Register
                  </Button>
                </div>
                <div className="button-header">
                  <Button
                    onClick={() => {
                      navigate("/customer-auth");
                    }}
                    className="color-orange"
                  >
                    Customer
                  </Button>
                  |
                  <Button
                    onClick={() => {
                      navigate("/shop-auth");
                    }}
                    className="color-orange"
                  >
                    Shop Owner?
                  </Button>
                </div>
              </>
            )}
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default DeliveryPartnerAuth;
