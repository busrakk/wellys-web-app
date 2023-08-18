import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import Spinner from "../Spinner";
import Master from "../../layouts/frontend/Master";

export default function UserRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/auth/user-auth`
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          toast.error("Unauthorized access! Please login");
        }
      } catch (error) {
        toast.error("Server error! Try again later");
        // toast.error("Unauthorized access! Please login");
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <Master /> : <Spinner path="login" />;
}
