import Navbar from "../../Components/Navbar";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import CustomerDashBoard from "../Customer/CustomerDashboard";
import DeliveryPartnerDashBoard from "../DeliveryPartner/DeliveryPartnerDashBoard";
import ShopDashBoard from "../Shop/ShopDashboard";

function DashBoard() {
  const user = useSelector(selectUser);
  console.log(user.role);
  return (
    <>
      <Navbar />
      DashBoard
      {user.role === "customer" ? (
        <CustomerDashBoard user={user} />
      ) : user.role === "deliveryPartner" ? (
        <DeliveryPartnerDashBoard user={user} />
      ) : (
        <ShopDashBoard user={user} />
      )}
    </>
  );
}

export default DashBoard;
