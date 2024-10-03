import React, { useContext } from 'react'
import { IoHome } from "react-icons/io5";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Usercontext } from '../main';


function Sidebar() {
  const navigate=useNavigate();
  const {isAuthenticated,setIsAuthenticated}=useContext(Usercontext)
  const handlelogout = async () => {
    const res = await fetch("https://hmernbackend.onrender.com/api/v1/user/adminlogout",{
      withCredntials: true,
      credentials: 'include',
      method: 'GET',
      // credentials: 'include',
    });
    const data = await res.json();
    if (data.success == false) {
      
      toast.error(data.message, {
        autoClose: 1200,
      });
    } else {
      toast.success(data.message, {
        autoClose: 1200,
      });
      setIsAuthenticated(false)
      navigate('/login')
    }
  };
  return (
    <>
    {isAuthenticated&&
    <div className='text-4xl     mt-44 px-4'>
      <Link to={"/"}><IoHome /></Link>
      <br />
      <Link to={"/Doctors"}><FaUserDoctor /></Link>
      <br />
      <Link to={"/AddnewAdmin"}><MdAddModerator /></Link>
      <br />
      <Link to={"/AddnewDoctor"}> <IoPersonAddSharp /></Link>
      <br />
      <Link to={"/Message"}> <AiFillMessage /></Link>
      <br />
      
      
     
      
      <RiLogoutBoxFill  onClick={handlelogout}/>

      
    </div>
    }
    </>
  )
}

export default Sidebar
