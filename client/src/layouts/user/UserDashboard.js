import React from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UserDashboard = () => {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <div>
      UserDashboard
      <li>
        <Link to="/" onClick={handleLogout}>
          Logout
        </Link>
      </li>
    </div>
  );
};

export default UserDashboard;
