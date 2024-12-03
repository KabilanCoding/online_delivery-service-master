import { useEffect } from "react";
import { logout } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout(null));
    navigate("/");
  });
}

export default LogOut;
