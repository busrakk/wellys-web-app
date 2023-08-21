import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  // get user data
  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/user/profile`
      );
      const userData = response.data.user;
      setName(userData.name);
      setEmail(userData.email);
      setPhone(userData.phone || "");
      setAddress(userData.address || "");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while fetching user data");
    }
  };

  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      toast.error("Name is required field");
      return;
    }
    if (!address) {
      toast.error("Address is required field");
      return;
    }
    if (!phone) {
      toast.error("Phone required field");
      return;
    }
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/user/update-profile`,
        {
          name,
          email,
          phone,
          address,
        }
      );
      if (data?.error) {
        toast.error(data.message);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {auth?.token && (
        <div className="h-full ml-14 mt-20 mb-10 md:ml-[350px] fixed w-2/3 pb-24">
          <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4 ">
            <div className="w-full flex flex-col 2xl:w-1/3">
              <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                <h4 className="ml-4 mb-4 text-fontlg text-gray-900 font-bold">
                  Profile Info
                </h4>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="py-2 px-4">
                      <label
                        htmlFor="name"
                        className="font-bold flex items-center"
                      >
                        Name:
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="text-sm sm:text-base placeholder-gray-500 pl-2 py-1 rounded-lg border border-gray-400 w-full focus:outline-none focus:border-indigo-400"
                        placeholder="İsim"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="py-2 px-4">
                      <label
                        htmlFor="email"
                        className="font-bold flex items-center"
                      >
                        Email:
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        disabled
                        className="text-sm sm:text-base placeholder-gray-500 pl-2 py-1 rounded-lg border border-gray-400 w-full focus:outline-none focus:border-indigo-400"
                        placeholder="E-Posta Adresi"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="py-2 px-4">
                      <label
                        htmlFor="phone"
                        className="font-bold flex items-center"
                      >
                        Mobile:
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        name="phone"
                        className="text-sm sm:text-base placeholder-gray-500 pl-2 py-1 rounded-lg border border-gray-400 w-full focus:outline-none focus:border-indigo-400"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="py-2 px-4">
                      <label
                        htmlFor="address"
                        className="font-bold flex items-center"
                      >
                        Address:
                      </label>
                      <textarea
                        id="address"
                        type="address"
                        name="address"
                        className="text-sm sm:text-base placeholder-gray-500 pl-2 py-1 rounded-lg border border-gray-400 w-full focus:outline-none focus:border-indigo-400 h-24 resize-y"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      type="submit"
                      className="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 rounded py-2 px-4 transition duration-150 ease-in"
                    >
                      <span className="mr-2 uppercase">Update</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
