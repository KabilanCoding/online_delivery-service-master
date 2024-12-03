import { useState } from "react";
import Navbar from "../../Components/Navbar";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddProduct() {
  const user = useSelector(selectUser);
  const category = [
    { content: "Fruits & Vegetables" },
    { content: "Snacks & Biscuits" },
    { content: "Instant Food" },
    { content: "Dairy & Bread" },
    { content: "Chocolates & Icecreams" },
    { content: "Rice, Atta, Dal" },
    { content: "Tea & Coffee" },
    { content: "Eggs, Meat & Fish" },
    { content: "Oil, Masala, Sauces" },
    { content: "Drinks & Juices" },
    { content: "Pet Supplies" },
    { content: "Health & Nutrition" },
    { content: "Breakfast Food" },
    { content: "Baby Care " },
    { content: "Cleaning & Household" },
    { content: "Hygiene & Personal care" },
    { content: "Bath & Body" },
    { content: "Beauty & Makeup" },
    { content: "Kitchen & Home" },
  ];
  const notify = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/shop-owners/create-product/" + user.email,
        items
      );
      console.log(res);
      notify(res.data);
    } catch (e) {
      notifyError(e.CODE);
    }
  }
  const [items, setItems] = useState({
    name: "",
    imgURL: "",
    description: "",
    quantity: "",
    price: "",
    category: "",
    todayDeal: "",
  });
  return (
    <>
      <Navbar />
      <div className="flex-center-full-hw">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <h1>Add Product</h1>
            <div className="field-container">
              <TextField
                value={items.name}
                onChange={(e) => {
                  setItems({
                    ...items,
                    name: e.target.value,
                  });
                }}
                fullWidth
                variant="outlined"
                required
                label="Product Name"
              />
            </div>
            <div className="field-container">
              <TextField
                type="text"
                value={items.imgURL}
                onChange={(e) => {
                  setItems({
                    ...items,
                    imgURL: e.target.value,
                  });
                }}
                label="Product Image"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className="field-container">
              <FormControl fullWidth required>
                <InputLabel>Choose Category</InputLabel>
                <Select label="Choose Category">
                  {category.map((c) => (
                    <MenuItem
                      value={c.content}
                      onClick={() => {
                        setItems({
                          ...items,
                          category: c.content,
                        });
                      }}
                    >
                      {c.content}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="field-container">
              <TextField
                value={items.description}
                onChange={(e) => {
                  setItems({
                    ...items,
                    description: e.target.value,
                  });
                }}
                fullWidth
                multiline
                required
                minRows={5}
                variant="outlined"
                label="Product Description"
              />
            </div>
            <div className="field-container">
              <TextField
                value={items.price}
                onChange={(e) => {
                  setItems({
                    ...items,
                    price: e.target.value,
                  });
                }}
                required
                variant="outlined"
                label="Price(in Rs.)"
                fullWidth
              />
            </div>
            <div className="field-container">
              <TextField
                value={items.quantity}
                onChange={(e) => {
                  setItems({
                    ...items,
                    quantity: e.target.value,
                  });
                }}
                type="number"
                required
                variant="outlined"
                label="Quantity"
                fullWidth
              />
            </div>
            <div className="field-container">
              <TextField
                value={items.todayDeal}
                onChange={(e) => {
                  setItems({
                    ...items,
                    todayDeal: e.target.value,
                  });
                }}
                type="text"
                required
                variant="outlined"
                label="Today's Deal"
                fullWidth
              />
            </div>
          </div>
          <div className="field-container">
            <Button
              fullWidth
              type="submit"
              variant="contained"
              className="bg-orange"
            >
              Add Product
            </Button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}

export default AddProduct;
