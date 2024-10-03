import React, { useContext, useEffect, useState } from 'react'
import { Usercontext } from '../main';
import { Navigate } from 'react-router-dom';

function Message() {
  const [messages,setMessages]=useState([]);
  const {isAuthenticated,setIsAuthenticated}=useContext(Usercontext)
  useEffect(()=>{
    const fetchmessages=async()=>{
      try{
        
        const res = await fetch("https://hmernbackend.onrender.com/api/v1/message/getallmessage",{
          withCredntials: true,
          credentials: 'include',
          method: 'GET',
          // credentials: 'include',
        });
        const data = await res.json();
        setMessages(data.messages);
        // console.log(data.messages)

      }
      catch(err){
        console.log(err)
      }
      
    }
    fetchmessages();
    

  },[])
  console.log(isAuthenticated)
  // if(!isAuthenticated){
  //   return <Navigate to={"/login"} />
  // }
  return (
    <div className='shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] w-[95%] m-5 px-5'>
    {messages&&messages.length>0?(messages.map((item)=>{
      return(
        <>
        <div className='inline-block shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] py-2 text-xl px-5 rounded-2xl w-[Auto] mt-5 m-auto text-gray-500'>
          <p>FirstName : <span>{item.firstName}</span></p>
          <p>LastName : <span>{item.lastName}</span></p>
          <p>Email : <span>{item.email}</span></p>
          <p>Phone : <span>{item.phone}</span></p>
          <p>Message : <span>{item.message}</span></p>
        </div>
        <br />
        <br />
        </>
      )
    })):""}
      
    </div>
  )
}

export default Message
