import { TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CustomerAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [customerLogin, setCustomerLogin] = useState({
    email: "",
    password: "",
  });
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [state, setState] = useState("login");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const data = {
        email: customerLogin.email,
        password: customerLogin.password,
        role: "customer",
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
            email: customerLogin.email,
            password: customerLogin.password,
            token: res.data.token,
            role: "customer",
            loggedIn: true,
          })
        );
        navigate("/");
      }
    } catch (e) {
      notify("Invalid Email/Password");
    }
  }

  const notify = (message) => toast.error(message);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const data = {
        name: customer.firstName + " " + customer.lastName,
        email: customer.email,
        role: "customer",
        password: customer.password,
      };
      if (customer.password !== customer.confirmPassword) {
        notify("Passwords won't match");
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/register",
          data
        );
        if (res.data.token === "Email Already exists") {
          notify("Email already exists");
        } else {
          dispatch(
            login({
              email: customer.email,
              password: customer.password,
              token: res.data.token,
              role: "customer",
              loggedIn: true,
            })
          );
          navigate("/");
        }
      }
    } catch (err) {
      notify("Unknown error: " + err.message);
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
          <h1>Customer</h1>
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
                    value={customerLogin.email}
                    onChange={(e) => {
                      setCustomerLogin({
                        ...customerLogin,
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
                    value={customerLogin.password}
                    onChange={(e) => {
                      setCustomerLogin({
                        ...customerLogin,
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
                      navigate("/del-partner-auth");
                    }}
                    className="color-orange"
                  >
                    Delivery Partner?
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
                    value={customer.firstName}
                    onChange={(e) => {
                      setCustomer({ ...customer, firstName: e.target.value });
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
                    value={customer.lastName}
                    onChange={(e) => {
                      setCustomer({ ...customer, lastName: e.target.value });
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
                    value={customer.email}
                    onChange={(e) => {
                      setCustomer({ ...customer, email: e.target.value });
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
                    value={customer.password}
                    onChange={(e) => {
                      setCustomer({ ...customer, password: e.target.value });
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
                    value={customer.confirmPassword}
                    onChange={(e) => {
                      setCustomer({
                        ...customer,
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
                      navigate("/del-partner-auth");
                    }}
                    className="color-orange"
                  >
                    Delivery Partner?
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
          <ToastContainer />
        </form>
      </div>
    </>
  );
}

export default CustomerAuth;
