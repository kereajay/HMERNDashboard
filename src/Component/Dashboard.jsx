import React, { useContext, useEffect, useState } from "react";
import { Usercontext } from "../main";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, setIsAuthenticated, user } = useContext(Usercontext);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchappointments = async () => {
      const res = await fetch(
        "https://hmernbackend.onrender.com/api/v1/Appointment/allAppointments",
        {
          withCredentials: true,
          credentials: "include",
          method: "GET",
        }
      );
      const data = await res.json();
      console.log(data);
      setAppointments(data.appointments);
    };
    fetchappointments();

    const fetchdoctors = async () => {
      try {
        const res = await fetch(
          "https://hmernbackend.onrender.com/api/v1/user/getalldoctors",
          {
            withCredentials: true,
            credentials: "include",
            method: "GET",
          }
        );
        const data = await res.json();
        console.log(data);
        setDoctors(data.doctors);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdoctors();
  }, []);
 


  const handleStatus = async (appointmentid, status) => {
    console.log(status);
    try {
      const { data } = await axios.put(
        `https://hmernbackend.onrender.com/api/v1/Appointment/update/${appointmentid}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointmenti) =>
          appointmenti._id === appointmentid
            ? { ...appointmenti, status }
            : appointmenti
        )
      );
      console.log(data);
      toast.success(data.message, {
        autoClose: 1400,
      });
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  // if(isAuthenticated==false){
  //  return <Navigate to={"/login"} />
  // }

  return (
    <div className="flex flex-col m-auto">
      {/* Dashboard Summary */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 shadow-lg p-5 mt-5 rounded-xl w-[95%] mx-auto">
        {/* User Profile */}
        <div className="flex flex-col items-center md:flex-row shadow-md h-auto md:h-60 p-5 md:p-10">
          <img
            src="https://abhayhospital.com/assets/Abhay/dummy.jpg"
            alt="Profile"
            className="w-40 md:w-60"
          />
          <div className="text-center md:text-left md:ml-5 mt-5 md:mt-0">
            {user && (
              <>
                <h1 className="text-2xl md:text-3xl text-blue-400 font-bold">
                  Hello...
                </h1>
                <p className="text-xl font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm md:text-lg mt-2">
                  Welcome back! Here's your dashboard summary.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Appointment Count */}
        <div className="shadow-md flex flex-col justify-center items-center h-auto md:h-60 p-5">
          <h1 className="text-3xl md:text-4xl font-bold text-green-500">
            Appointments
          </h1>
          <p className="text-2xl font-bold mt-2">{appointments?.length}</p>
        </div>

        {/* Doctors Count */}
        <div className="shadow-md flex flex-col justify-center items-center h-auto md:h-60 p-5">
          <h1 className="text-3xl md:text-4xl font-bold text-green-500">
            Doctors
          </h1>
          <p className="text-2xl font-bold mt-2">{doctors?.length}</p>
        </div>
      </div>

      {/* Appointment Table */}
      <div className="overflow-x-auto mt-8">
        <table className="min-w-full divide-y divide-gray-200 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Patient
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Doctor
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Department
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase">
                Visited
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments&&appointments.map((appoint, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-lg text-gray-700">
                  {appoint.firstName}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  {appoint.appointment_date}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  {appoint.doctor.firstName} {appoint.doctor.lastName}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  {appoint.department}
                </td>
                <td className="px-4 py-3 text-lg text-gray-700">
                  <select
                    className={`${
                      appoint.status === "Pending"
                        ? "text-yellow-500"
                        : appoint.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                    value={appoint.status}
                    onChange={(e) =>
                      handleStatus(appoint._id, e.target.value)
                    }
                  >
                    <option value="Pending" className="text-yellow-500">
                      Pending
                    </option>
                    <option value="Accepted" className="text-green-500">
                      Accepted
                    </option>
                    <option value="Rejected" className="text-red-500">
                      Rejected
                    </option>
                  </select>
                </td>
                <td className="px-4 py-3 text-center text-lg text-gray-700">
                  {appoint.hasVisited ? (
                    <FaCheckCircle className="text-green-500 text-2xl" />
                  ) : (
                    <MdCancel className="text-red-500 text-2xl" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
