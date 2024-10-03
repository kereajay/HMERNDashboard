import React, { useContext, useState } from "react";
import { Usercontext } from "../main";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function AddnewDoctor() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Usercontext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigate = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddnewDoctor = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      // console.log(docAvatar)
      formData.append("docAvatar", docAvatar);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
      
      await axios.post(
        "https://hmernbackend.onrender.com/api/v1/user/doctor/signup",
        formData,
        {
          withCredentials: true, 
        }
      )
      .then((res)=>{
        toast.success(res.data.message,{
          autoClose:1400
        });
        // console.log(res)
        setIsAuthenticated(true);
        navigate("/");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setNic("");
        setDob("");
        setGender("");
        setPassword("");
      })
      
     
      
    } catch (error) {
      
      toast.error(error.response.data.message,{
        autoClose:1400
      });
    }
  };

  // if (!isAuthenticated) {
  //   return <Navigate to={"/login"} />;
  // }
  return (
    <>
      <div className="w-[95%] mt-5 mb-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-2xl">
        <h1 className="text-2xl font-bold text-gray-500 text-center mt-10">
          Add a Doctor
        </h1>
        <br />
        <div className="max-w-lg mx-auto p-4 ">
          <form onSubmit={handleAddnewDoctor} className="space-y-4">
            <div>
              <label htmlFor="avatarInput">
                <img
                  src={
                    docAvatarPreview ? `${docAvatarPreview}` : "/doctor.jpeg"
                  }
                  alt=""
                  className="w-36 h-36 rounded-full cursor-pointer"
                />
              </label>
              <input
                type="file"
                id="avatarInput"
                className="hidden"
                onChange={handleAvatar}
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="firstName"
                  className="block text-2xl font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="lastName"
                  className="block text-2xl font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-2xl font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-2xl font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="nic"
                className="block text-2xl font-medium text-gray-700"
              >
                NIC
              </label>
              <input
                type="tel"
                name="nic"
                id="nic"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="dob"
                className="block text-2xl font-medium text-gray-700"
              >
                DOB
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="gender"
                className="block text-2xl font-medium text-gray-700"
              >
                Gender
              </label>
              <input
                type="text"
                name="gender"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xl font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label
                htmlFor="department"
                className="block text-xl font-medium text-gray-700"
              >
                Department
              </label>
              <select
                value={doctorDepartment}
                className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={(e) => setDoctorDepartment(e.target.value)}
              >
                <option value="">Select Department</option>
                {departmentsArray.map((item, index) => {
                  return (
                    <>
                      <option value={item} key={index}>
                        {item}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>

            {/* <div>
          <p>
             Registered /
            <Link to="/login" className="text-blue-400">
              Login
            </Link>{" "}
          </p>
        </div> */}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Doctor
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddnewDoctor;
