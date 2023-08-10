import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./layouts/auth/Login";
import Register from "./layouts/auth/Register";
import Master from "./layouts/frontend/Master";
import Home from "./components/frontend/sections/Home";
import Page404 from "./layouts/error/Page404";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Master />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
