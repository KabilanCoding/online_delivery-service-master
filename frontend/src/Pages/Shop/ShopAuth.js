import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShopAuth() {
  const navigate = useNavigate();
  const [state, setState] = useState("login");
  const dispatch = useDispatch();
  const notify = (message) => toast.error(message);
  const [shopOwnerLogin, setCustomerLogin] = useState({
    email: "",
    password: "",
  });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = {
        email: shopOwnerLogin.email,
        password: shopOwnerLogin.password,
        role: "shop",
      };
      console.log(data);
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/authenticate",
        data
      );
      console.log(res);
      if (res.data.token === "Invalid Email/Password") {
        notify("Invalid Email/Password");
      } else {
        dispatch(
          login({
            email: shopOwnerLogin.email,
            password: shopOwnerLogin.password,
            role: "shop",
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

  const [shopOwner, setShopOwner] = useState({
    firstName: "",
    lastName: "",
    shopName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function handleRegister(e) {
    e.preventDefault();
    console.log(shopOwner);
    try {
      if (shopOwner.password !== shopOwner.confirmPassword) {
        notify("Passwords won't match");
      } else {
        const data = {
          name: shopOwner.firstName + " " + shopOwner.lastName,
          email: shopOwner.email,
          role: "shop",
          password: shopOwner.password,
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
              email: shopOwner.email,
              password: shopOwner.password,
              token: res.data.token,
              role: "shop",
              loggedIn: true,
            })
          );
          navigate("/");
        }
      }
    } catch {
      notify("Something went wrong");
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
          <h1>Shop Owner</h1>
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
                    value={shopOwnerLogin.email}
                    onChange={(e) => {
                      setCustomerLogin({
                        ...shopOwnerLogin,
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
                    value={shopOwnerLogin.password}
                    onChange={(e) => {
                      setCustomerLogin({
                        ...shopOwnerLogin,
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
                    fullWidth
                    className="bg-orange"
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
                      navigate("/del-partner-auth");
                    }}
                    className="color-orange"
                  >
                    Delivery Partner?
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="field-container">
                  <TextField
                    value={shopOwner.firstName}
                    onChange={(e) => {
                      setShopOwner({ ...shopOwner, firstName: e.target.value });
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
                    value={shopOwner.lastName}
                    onChange={(e) => {
                      setShopOwner({ ...shopOwner, lastName: e.target.value });
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
                    value={shopOwner.shopName}
                    onChange={(e) => {
                      setShopOwner({ ...shopOwner, shopName: e.target.value });
                    }}
                    type="text"
                    id="shop-name"
                    label="Shop Name"
                    required
                    variant="outlined"
                    fullWidth
                  />
                </div>
                <div className="field-container">
                  <TextField
                    value={shopOwner.email}
                    onChange={(e) => {
                      setShopOwner({ ...shopOwner, email: e.target.value });
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
                    value={shopOwner.password}
                    onChange={(e) => {
                      setShopOwner({ ...shopOwner, password: e.target.value });
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
                    value={shopOwner.confirmPassword}
                    onChange={(e) => {
                      setShopOwner({
                        ...shopOwner,
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
            )}
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default ShopAuth;
