import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function UserLayout(props) {
  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased">
        <Toaster />
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout;