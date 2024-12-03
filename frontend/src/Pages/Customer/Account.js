import Navbar from "../../Components/Navbar";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectUser } from "../../features/userSlice";

function Account() {
  const user = useSelector(selectUser);
  return (
    <>
      <Navbar />
      <center>
        <h2>
          {user.role === "customer"
            ? "customer orders"
            : user.role === "shop"
            ? "Shop orders"
            : "Delivery Partner order"}
        </h2>
      </center>
    </>
  );
}

export default Account;
