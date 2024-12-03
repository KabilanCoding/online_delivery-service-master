import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Navbar from "../../Components/Navbar";
import ProductDisplayPage from "../ProductDisplayPage/ProductDisplayPage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductByCategory() {
  const [items, setItems] = useState();
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/products/" + category
        );
        setItems(res.data);
      } catch (e) {
        notify(e.message);
        console.log(e);
      }
    };
    fetch();
  });
  const notify = (message) => toast.error(message);
  const category =
    window.location.href.split("/")[window.location.href.split("/").length - 1];
  return (
    <>
      <Navbar />
      <div className="flex-center-full">
        <center>
          <Typography variant="h4" gutterBottom className="heading">
            {category
              .split("-")
              .map(
                (word) =>
                  word.split("")[0].toUpperCase() +
                  word.slice(1, word.length) +
                  " "
              )}
          </Typography>
        </center>
        {items && <ProductDisplayPage items={items} />}
        <ToastContainer />
      </div>
    </>
  );
}

export default ProductByCategory;
