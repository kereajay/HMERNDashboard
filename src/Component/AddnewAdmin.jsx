import React, { useContext, useState } from 'react';
import { Usercontext } from '../main';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddnewAdmin() {
  const { isAuthenticated, setIsAuthenticated } = useContext(Usercontext);
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleAddnewAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://hmernbackend.onrender.com/api/v1/user/admin/addnew", {
        withCredentials: true,
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === true) {
        navigate('/');
        toast.success(data.message, { autoClose: 1200 });
      } else {
        toast.error(data.message, { autoClose: 1500 });
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className='w-full md:w-[85%] lg:w-[75%] mx-auto mt-10 mb-5 shadow-xl rounded-2xl  p-6 '>
      <h1 className='text-3xl font-bold text-gray-600 text-center'>Admin Signup</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div>
          <img 
            src="https://kredmint.com/_next/static/media/PartnersHero.84039818.gif" 
            alt="Admin signup" 
            className="w-full h-auto object-cover rounded-lg "
          />
        </div>
        <div className=''>
          <form onSubmit={handleAddnewAdmin} className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4 ">
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-xl font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formdata.firstName}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-xl font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formdata.lastName}
                  onChange={handleChange}
                  className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-xl font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formdata.phone}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xl font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formdata.email}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                required
              />
            </div>

            <div>
              <label htmlFor="nic" className="block text-xl font-medium text-gray-700">NIC</label>
              <input
                type="text"
                name="nic"
                id="nic"
                value={formdata.nic}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                required
              />
            </div>

            <div>
              <label htmlFor="dob" className="block text-xl font-medium text-gray-700">DOB</label>
              <input
                type="date"
                name="dob"
                id="dob"
                value={formdata.dob}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-xl font-medium text-gray-700">Gender</label>
              <input
                type="text"
                name="gender"
                id="gender"
                value={formdata.gender}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xl font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={formdata.password}
                onChange={handleChange}
                className="mt-1 p-3 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-md"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
            >
              Admin Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddnewAdmin;
