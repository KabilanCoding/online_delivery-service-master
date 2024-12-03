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
  IconButton,
  TextField,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import Footer from "../../Components/Footer";

const ProductDisplayPage = (props) => {
  const [cart, setCart] = useState([]);
  // localStorage.clear();
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const [products, setProducts] = useState(
    props.items.map((item) => ({
      ...item,
      currentQuantity: 1,
    }))
  );

  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, currentQuantity: item.currentQuantity + 1 }
            : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product }]);
    }
    console.log(cart);
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

  const handleIncreaseQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              currentQuantity: Math.min(
                product.currentQuantity + 1,
                product.quantity
              ),
            }
          : product
      )
    );
    console.log(products);
  };

  const handleDecreaseQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId && product.currentQuantity > 1
          ? { ...product, currentQuantity: product.currentQuantity - 1 }
          : product
      )
    );
  };

  return (
    <>
      <Container className="flex-center-full">
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card className="grid-container">
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imgURL}
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
                    <IconButton
                      color="primary"
                      onClick={() => handleDecreaseQuantity(product.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <TextField
                      type="text"
                      variant="outlined"
                      size="small"
                      value={product.currentQuantity}
                      onChange={(e) => handleQuantityChange(e, product.id)}
                      inputProps={{ min: 1, step: 1, max: product.quantity }}
                      style={{ width: 60, margin: "0", padding: "6px" }}
                    />
                    <IconButton
                      color="primary"
                      onClick={() => handleIncreaseQuantity(product.id)}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className="footer-bottom">
        <Footer />
      </div>
    </>
  );
};

export default ProductDisplayPage;
