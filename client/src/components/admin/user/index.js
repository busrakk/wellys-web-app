import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const Users = () => {
  return (
    <div className="h-full ml-14 mt-20 mb-10 md:ml-64">
      <div className="mt-4 text-fontlg font-semibold flex justify-between md:mx-24 mx-10">
        <span>Kullanıcılar</span>
      </div>

      <div className="flex justify-center">
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-5/6">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Kullanıcı Adı
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium text-gray-900 hidden md:flex"
                >
                  Durum
                </th>
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
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">name</td>
                <td className="px-6 py-4 hidden md:block">
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                    Active
                  </span>

                  {/* <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                Inactive
              </span> */}
                </td>
                <td className="px-6 py-4"> "Admin" : "User"</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    <BiEditAlt className="h-6 w-6 hover:text-blue-600" />
                    <MdDeleteOutline className="h-6 w-6 hover:text-red-600" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
