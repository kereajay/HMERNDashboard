import React, { useContext,useState } from 'react'
import { Usercontext } from '../main';
import { useNavigate,Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddnewAdmin() {
  const { isAuthenticated, setIsAuthenticated } =useContext(Usercontext) ;

  const navigate=useNavigate();
  const [formdata,setFormdata]=useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    confirmpassword: "",
   

  })


  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.name]:e.target.value})
  }
  const handleAddnewAdmin=async(e)=>{
    e.preventDefault();
    // console.log(formdata)
    try{
      const res=await fetch("https://hmernbackend.onrender.com/api/v1/user/admin/addnew",{
        withCredntials: true,
        credentials: "include",
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(formdata)
      })
      const data=await res.json();
      console.log(data);
      console.log(data.success,data.message);
      if(data.success===true){
        toast.success(data.message,{
          autoClose:1200
        })
       
        navigate('/login')
      }
      else{
        toast.error(data.message,{
          autoClose:1500
        })
      }
      // console.log(data)
    }
    catch(err){
      toast.error(data.message)

    }
  }

// if(!isAuthenticated){
//   return <Navigate to={"/login"}/>
// }
  return (
    <>
    <div className='w-[95%] mt-5 mb-5 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] rounded-2xl'>
      <h1 className='text-2xl font-bold text-gray-500 text-center mt-10'>Admin Signup</h1>
      <br />
    <div className="max-w-lg mx-auto p-4 ">
      <form onSubmit={handleAddnewAdmin} className="space-y-4">
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
              value={formdata.firstName}
              onChange={handleChange}
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
              value={formdata.lastName}
              onChange={handleChange}
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
            value={formdata.phone}
            onChange={handleChange}
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
            value={formdata.email}
            onChange={handleChange}
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
            value={formdata.nic}
            onChange={handleChange}
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
            value={formdata.dob}
            onChange={handleChange}
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
            value={formdata.gender}
            onChange={handleChange}
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
            value={formdata.password}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
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
          Admin Signup
        </button>
      </form>
    </div>
      
    </div>
    </>
  )
}

export default AddnewAdmin
