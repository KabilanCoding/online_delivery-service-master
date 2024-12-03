import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/Navbar";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";

function ShopDashBoard(props) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/shop-owners/get-product/" + user.email
        );
        setItems(res.data);
      } catch (e) {
        console.log(e);
        notify(e.message);
      }
    };
    fetch();
  });
  const notify = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  const [items, setItems] = useState([]);

  const handleDeleteItem = async (itemId) => {
    try {
      console.log(itemId);
      const res = await axios.delete(
        "http://localhost:8080/api/products/delete-product/" + itemId
      );
      console.log(res.data);
      notifySuccess(res.data);
    } catch (e) {
      notify(e.message);
    }
  };

  const handleEditItem = (item) => {
    console.log(`Editing item with ID ${item}`);
    navigate("/dashboard/shop-owner/edit-product", { state: { item } });
  };
  return (
    <>
      <Navbar />
      <div className="flex-center-full">
        <Container className="flex-center-full">
          <center>
            {" "}
            <Typography variant="h4" className="heading" gutterBottom>
              My Shop Items
            </Typography>
          </center>
          <Grid container spacing={2}>
            {items.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                key={item.id}
                className="shop-items"
              >
                <Card className="grid-container">
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.imgURL}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      {`₹${item.price}`}
                    </Typography>
                    <Typography variant="body2">{item.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={() => handleEditItem(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <Button
                      size="small"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
      <ToastContainer />
      <div className="footer-bottom">
        <Footer />
      </div>
    </>
  );
}

export default ShopDashBoard;
