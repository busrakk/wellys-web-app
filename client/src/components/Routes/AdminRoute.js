import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import MasterLayout from "../../layouts/admin/MasterLayout";
import axios from "axios";
import { toast } from 'react-toastify';
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/auth/admin-auth`
        );
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          toast.error("Unauthorized access! Please login");
        }
      } catch (error) {
        //toast.error("Server error! Try again later");
        toast.error("Unauthorized access! Please login");
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return ok ? <MasterLayout /> : <Spinner path="" />;
}
