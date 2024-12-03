import Navbar from "../../Components/Navbar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../features/userSlice";

function Orders() {
  const user = useSelector(selectUser);
  var name =
    user.role === "customer"
      ? "customer orders"
      : user.role === "shop"
      ? "Shop orders"
      : "Delivery Partner order";
  return (
    <>
      <Navbar />
      <center>
        <h2>{name}</h2>
      </center>
    </>
  );
}

export default Orders;
