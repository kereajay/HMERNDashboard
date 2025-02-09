import React, { useContext, useState, useEffect } from "react";
import { Usercontext } from "../main";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated, setIsAuthenticated } = useContext(Usercontext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
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
    fetchDoctors();
  }, []);

  return (
    <div className="w-full p-6">
      <h1 className="text-3xl text-blue-400 font-bold text-center">Doctors</h1>
      <br />
      <div className="flex justify-center mb-6">
        <input
          type="text"
          className="w-full md:w-1/3 border border-gray-300 py-3 px-4 rounded-full text-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          placeholder="Search doctors by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="shadow-lg w-[93%] m-auto mt-10 rounded-2xl p-4 mb-5 bg-white">
        <br />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-4">
          {doctors && doctors.length > 0 ? (
            doctors
              .filter((doc) =>
                doc.firstName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((doc) => (
                <div
                  key={doc._id}
                  className="shadow-[inset_0px_0px_20px_10px_#9ae6b4] rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-4 flex justify-center items-center bg-green-200">
                    <img
                      src={doc.docAvatar?.url || "default-avatar.png"}
                      alt="docavatar"
                      className="w-[200px] h-[200px] rounded-full border-4 border-white shadow-md"
                    />
                  </div>
                  <div className="p-6 text-center ">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {doc.firstName} {doc.lastName}
                    </h3>
                    <p className="text-gray-500 text-sm mb-3">
                      {doc.doctorDepartment}
                    </p>
                    <div className="border-t my-4"></div>
                    <div className="text-lg text-left space-y-4">
                      <p>
                        <span className="font-semibold">Email:</span>{" "}
                        {doc.email}
                      </p>
                      <p>
                        <span className="font-semibold">Phone:</span>{" "}
                        {doc.phone}
                      </p>
                      <p>
                        <span className="font-semibold">DOB:</span>{" "}
                        {doc.dob.substr(0, 10)}
                      </p>
                      <p>
                        <span className="font-semibold">Gender:</span>{" "}
                        {doc.gender}
                      </p>
                      <p>
                        <span className="font-semibold">NIC:</span> {doc.nic}
                      </p>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <div className="col-span-4 text-center">
              <h1 className="text-xl text-gray-700 font-medium">
                There are no doctors available.
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Doctors;
