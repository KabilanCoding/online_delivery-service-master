import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Navbar from "../../Components/Navbar";
import ProductDisplayPage from "../ProductDisplayPage/ProductDisplayPage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DisplayAllProducts() {
  const [items, setItems] = useState();
  const notify = (message) => toast.error(message);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/products/today-deal"
        );
        setItems(res.data);
      } catch (e) {
        notify(e.message);
        console.log(e);
      }
    };
    fetch();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex-center-full-hw">
        <center>
          <Typography variant="h4" gutterBottom className="heading">
            Today's Offer
          </Typography>
        </center>
        {items && <ProductDisplayPage items={items} />}
        <ToastContainer />
      </div>
    </>
  );
}

export default DisplayAllProducts;
