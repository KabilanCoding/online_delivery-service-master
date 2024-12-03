import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DeliveryPartnerAuth from "./Pages/DeliveryPartner/DeliveryPartnerAuth";
import ShopAuth from "./Pages/Shop/ShopAuth";
import Home from "./Pages/Home/Home";
import Error from "./Pages/Error/Error";
import CustomerAuth from "./Pages/Customer/CustomerAuth";
import ForgotPass from "./Pages/ForgotPass/ForgotPass";
import Cart from "./Pages/Cart/Cart";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import LogOut from "./Pages/LogOut/LogOut";
import ProductByCategory from "./Pages/ProductByCategory/ProductByCategory";
import Orders from "./Pages/Orders/Orders";
import Account from "./Pages/Customer/Account";
import AddProduct from "./Pages/Shop/AddProducts";
import CompleteProfile from "./Pages/Customer/CompleteCustomerProfile";
import ShopDashBoard from "./Pages/Shop/ShopDashboard";
import EditProduct from "./Pages/Shop/EditProduct";
import CompleteShopProfile from "./Pages/Shop/CompleteShopProfile";
import CompleteDeliveryPartnerProfile from "./Pages/DeliveryPartner/CompleteDeliveryPartnerProfile";
import TodayDeals from "./Pages/Customer/TodayDeals";
import CustomerDashBoard from "./Pages/Customer/CustomerDashboard";
import ShopOwnerDashBoardAccount from "./Pages/Shop/ShopOwnerAccount";
import Contact from "./Pages/FeedBack";

function App() {
  const user = useSelector(selectUser);
  return (
    <Router>
      {!user ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-auth" element={<CustomerAuth />} />
          <Route path="/del-partner-auth" element={<DeliveryPartnerAuth />} />
          <Route path="/shop-auth" element={<ShopAuth />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/product/:category" element={<ProductByCategory />} />
          <Route path="/today-deal" element={<TodayDeals />} />
          <Route path="/feedback" element={<Contact />} />
          <Route path="*" element={<Error />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-auth" element={<CustomerAuth />} />
          <Route path="/del-partner-auth" element={<DeliveryPartnerAuth />} />
          <Route path="/shop-auth" element={<ShopAuth />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/today-deal" element={<TodayDeals />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard/customer/account"
            element={<CustomerDashBoard />}
          />
          <Route
            path="/dashboard/shop-owner/account"
            element={<ShopOwnerDashBoardAccount />}
          />
          <Route path="/product/:category" element={<ProductByCategory />} />
          <Route path="/dashboard/shop-owner" element={<ShopDashBoard />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/add-products" element={<AddProduct />} />
          <Route
            path="/dashboard/customer/complete-profile"
            element={<CompleteProfile />}
          />
          <Route
            path="/dashboard/shop-owner/complete-profile"
            element={<CompleteShopProfile />}
          />
          <Route
            path="/dashboard/shop-owner/edit-product"
            element={<EditProduct />}
          />
          <Route
            path="/dashboard/delivery-partner/complete-profile"
            element={<CompleteDeliveryPartnerProfile />}
          />
          <Route path="/feedback" element={<Contact />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
