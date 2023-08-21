import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import axios from "axios";
import Swal from "sweetalert2";
import Form from "./Form";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showUpdate, setShowUpdate] = useState(false);

  const resetForm = () => {
    setRole("");
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  // get all user
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/user/get-user`
      );
      if (data.success) {
        setIsLoading(false);
        setUsers(data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Silme işlemi
  const handleDelete = async (userId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete the user?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const response = await axios.delete(
          `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/user/delete-user/${userId}`
        );
        if (response?.data?.success) {
          toast.success("User deleted successfully");
          getAllUsers();
        } else {
          toast.error(response?.data?.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  //update category
  const handleEdit = (userId) => {
    const selectedUser = users.find((item) => item._id === userId);
    if (selectedUser) {
      setSelectedUserId(userId);
      setRole(selectedUser.role === 0 ? 0 : 1);
      setShowUpdate(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/user/update-user/${selectedUserId}`,
        {
          role
        }
      );
      if (data?.success) {
        setShowUpdate(false);
        toast.success(`Role is successfully updated`);
        resetForm();
        getAllUsers();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  const renderTable = () => {
    let view = [];
    users.map((item) => {
      view.push(
        <tr key={item._id} className="hover:bg-gray-50">
          <td className="px-6 py-4">{item.name}</td>
          {/* <td className="px-6 py-4 hidden md:block">
            {item.status === 1 ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                Inactive
              </span>
            )}
          </td> */}
          <td className="px-6 py-4">{item.role === 1 ? "Admin" : "User"}</td>
          <td className="px-6 py-4">
            <div className="flex justify-end gap-4">
              <BiEditAlt
                onClick={() => handleEdit(item._id)}
                className="h-6 w-6 hover:text-blue-600"
              />
              <MdDeleteOutline
                onClick={() => handleDelete(item._id)}
                className="h-6 w-6 hover:text-red-600"
              />
            </div>
          </td>
        </tr>
      );
      return view;
    });
    if (view.length === 0) {
      return (
        <tr>
          <td colSpan={4} className="text-center p-4">
            No data found!
          </td>
        </tr>
      );
    } else {
      return view;
    }
  };

  return (
    <div className="h-full ml-14 mt-20 mb-10 md:ml-64 fixed overflow-x:hidden overflow-y-scroll w-4/5 pb-24">
      <div className="mt-4 text-fontlg font-semibold flex justify-between md:mx-24 mx-10">
        <span>Kullanıcılar</span>
      </div>

      {showUpdate && (
        <Form
          setShow={setShowUpdate}
          role={role}
          setRole={setRole}
          handleSubmit={handleUpdate}
          isLoading={isLoading}
          button="Güncelle"
        />
      )}

      <div className="flex justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-5/6">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Kullanıcı Adı
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900 hidden md:flex"
                >
                  Durum
                </th> */}
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900 "
                >
                  Rol
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900"
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
              {isLoading && (
                <tr>
                  <td colSpan={4} className="text-center p-4">
                    <span>Loading..</span>
                  </td>
                </tr>
              )}
              {!isLoading && renderTable()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
