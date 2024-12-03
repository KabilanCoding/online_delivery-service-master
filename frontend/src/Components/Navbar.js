import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import logo from "../assets/logo.gif";

function Navbar() {
  var pages = [
    { name: "Home", link: "/" },
    { name: "Today's Deal", link: "/today-deal" },
  ];
  const user = useSelector(selectUser);
  var settings =
    user === null
      ? [{ name: "Login/Register", link: "/customer-auth" }]
      : [
          { name: "Your Account", link: "/dashboard/customer/account" },
          {
            name: "Complete Your Profile",
            link: "/dashboard/customer/complete-profile",
          },
          { name: "Your Orders", link: "/dashboard/orders" },
          { name: "LogOut", link: "/logout" },
        ];
  if (user !== null) {
    // console.log(user.role);
    if (user.role === "shop") {
      pages = [
        { name: "Add Products", link: "/dashboard/add-products" },
        [{ name: "Orders", link: "/dashboard/orders" }],
      ];
      settings = [
        { name: "Your Account", link: "/dashboard/shop-owner/account" },
        {
          name: "Complete Your Profile",
          link: "/dashboard/shop-owner/complete-profile",
        },
        { name: "Your Orders", link: "/dashboard/orders" },
        { name: "LogOut", link: "/logout" },
      ];
    }
    if (user.role === "deliveryPartner") {
      pages = null;
      settings = [
        { name: "Your Account", link: "/dashboard/account" },
        {
          name: "Complete Your Profile",
          link: "/dashboard/delivery-partner/complete-profile",
        },
        { name: "Your Orders", link: "/dashboard/orders" },
        { name: "LogOut", link: "/logout" },
      ];
    }
  }
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" className="bg-orange">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img className="logo" src={logo} alt="logo" />
            <Typography
              variant="h6"
              noWrap
              onClick={() => {
                navigate("/");
              }}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              Zip Zap
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages &&
                  pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ZIP ZAP
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages &&
                pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => {
                      navigate(page.link);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
            </Box>
            {user && user.role === "customer" ? (
              <div className="flex-box ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="24"
                  style={{ margin: 5, cursor: "pointer" }}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
              </div>
            ) : (
              ""
            )}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Zip-Zap">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.name}
                    onClick={() => navigate(setting.link)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
export default Navbar;
