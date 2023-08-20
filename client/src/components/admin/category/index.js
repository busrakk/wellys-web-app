import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { toast } from 'react-toastify';
import axios from "axios";
import Swal from "sweetalert2";
import { MdDeleteOutline, MdAddCircleOutline } from "react-icons/md";
import Form from "./Form";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("1");
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/category/create-category`,
        {
          name,
          status,
        }
      );
      if (data?.success) {
        setShow(false);
        toast.success(`${name} is successfully created`);
        resetForm();
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  const resetForm = () => {
    setName("");
    setStatus("");
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/category/get-category`
      );
      if (data.success) {
        setIsLoading(false);
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //update category
  const handleEdit = (categoryId) => {
    const selectedCategory = categories.find((item) => item._id === categoryId);
    if (selectedCategory) {
      setSelectedCategoryId(categoryId);
      setName(selectedCategory.name);
      setStatus(selectedCategory.status === "1" ? "1" : "0");
      setShowUpdate(true);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/category/update-category/${selectedCategoryId}`,
        {
          name,
          status,
        }
      );
      if (data?.success) {
        setShowUpdate(false);
        toast.success(`${name} is successfully updated`);
        resetForm();
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating");
    }
  };

  // Silme işlemi
  const handleDelete = async (categoryId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure you want to delete the category?",
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
          `${process.env.REACT_APP_BACKEND_ROOT_URL}/api/category/delete-category/${categoryId}`
        );
        if (response?.data?.success) {
          toast.success("Category deleted successfully");
          getAllCategories();
        } else {
          toast.error(response?.data?.message || "Something went wrong");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const renderTable = () => {
    let view = [];
    categories?.map((item) => {
      view.push(
        <tr key={item._id} className="hover:bg-gray-50">
          <td className="px-6 py-4">{item.name}</td>
          <td className="px-6 py-4 hidden md:block">
            {item.status === "1" ? (
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
          </td>
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
      <div className="mt-4 text-fontlg font-semibold flex justify-between md:mx-40 mx-10">
        <span>Kategoriler</span>
        <button
          onClick={() => setShow(true)}
          className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-violet-600 rounded-lg md:text-fontmd text-fontsm hover:bg-violet-500 focus:outline-none focus:ring focus:ring-violet-300 focus:ring-opacity-80"
        >
          <MdAddCircleOutline size={28} className="w-5 h-5 mx-1" />
          <span className="mx-1">Ekle</span>
        </button>
      </div>

      {show && (
        <Form
          setShow={setShow}
          name={name}
          setName={setName}
          status={status}
          setStatus={setStatus}
          handleSubmit={handleSubmit}
          button="Ekle"
        />
      )}

      {showUpdate && (
        <Form
          setShow={setShowUpdate}
          name={name}
          setName={setName}
          status={status}
          setStatus={setStatus}
          handleSubmit={handleUpdate}
          button="Güncelle"
        />
      )}

      <div className="flex justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-3/4">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Kategori Adı
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900 hidden md:block"
                >
                  Durum
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
                    <div>
                      <span>Loading...</span>
                    </div>
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

export default Category;
