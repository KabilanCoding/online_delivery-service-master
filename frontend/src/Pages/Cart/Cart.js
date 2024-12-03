import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
} from "@mui/material";
import Navbar from "../../Components/Navbar";
import { Delete as DeleteIcon } from "@mui/icons-material";
import shopItem from "../../assets/shop-item.avif";

function Cart() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setProducts(savedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    setProducts((prevCart) => prevCart.filter((item) => item.id !== productId));
    const p = products.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(p));
  };

  const handleQuantityChange = (event, productId) => {
    const { value } = event.target;
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1) {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId
            ? { ...product, currentQuantity: parsedValue }
            : product
        )
      );
    }
  };

  return (
    <>
      <Navbar />
      <center>
        <Typography variant="h4" gutterBottom className="heading">
          Cart
        </Typography>
      </center>
      <Container>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={shopItem}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {`$${product.price}`}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      value={product.currentQuantity}
                      onChange={(e) => handleQuantityChange(e, product.id)}
                      inputProps={{ min: 1, step: 1, max: product.quantity }}
                      style={{ width: 60, margin: "0", padding: "6px" }}
                    />
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(product.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Cart;
