import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import AddnewAdmin from "./Component/AddnewAdmin";
import AddnewDoctor from "./Component/AddnewDoctor";
import Doctors from "./Component/Doctors";
import Message from "./Component/Message";
import Sidebar from "./Component/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Usercontext } from "./main";
import { useNavigate } from "react-router-dom";

function App() {
  // const navigate=useNavigate()
  const { isAuthenticated, setIsAuthenticated, user, setUser } =
    useContext(Usercontext);
  useEffect(() => {
    const fecthuser = async () => {
      try {
        const res = await fetch(
          "https://hmernbackend.onrender.com/api/v1/user/admin/details",
          {
            withCredntials: true,
            credentials: "include",
            method: "GET",
            // headers: {
            //   "Content-Type": "application/json",

            // },
          }
        );
        const data = await res.json();
        // console.log(data);
        if (data.success == true) {
          // console.log("isa")
          setIsAuthenticated(true);
          setUser(data.user);
          // <Navigate to={"/"} />;
        } else {
          setIsAuthenticated(false);
          setUser({});
        }
      } catch (err) {
        console.log(err);
      }
    };
    fecthuser();
  }, [isAuthenticated]);

  return (
    <>
      <div className="">
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/AddnewAdmin" element={<AddnewAdmin />} />
            <Route path="/AddnewDoctor" element={<AddnewDoctor />} />
            <Route path="/Doctors" element={<Doctors />} />
            <Route path="/Message" element={<Message />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
