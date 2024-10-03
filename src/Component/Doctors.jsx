import React, { useContext, useState,useEffect } from 'react'
import { Usercontext } from '../main';

function Doctors() {
  const [doctors,setDoctors]=useState([]);
  const {isAuthenticated,setIsAuthenticated}=useContext(Usercontext)
  useEffect(()=>{
    const fetchdoctors=async()=>{
      try{
        
        const res = await fetch("https://hmernbackend.onrender.com/api/v1/user/getalldoctors",{
          withCredntials: true,
          credentials: 'include',
          method: 'GET',
         
        });
        const data = await res.json();
       console.log(data);
       setDoctors(data.doctors);

      }
      catch(err){
        console.log(err)
      }
      
    }
    fetchdoctors();
    

  },[])
  return (
    <div className='shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] w-[95%]  mt-5 rounded-2xl p-4 mb-5 ' >
      <h1 className='text-3xl text-blue-400 font-bold'>Doctors</h1>
      <br />
      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-5'>
        {
          doctors&&doctors.length>0?(doctors.map((doc)=>{
            return(
              <>
              <div className='shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)] p-4 rounded-2xl'>
                <img src={doc.docAvatar&&doc.docAvatar.url} alt="docavatar" className='w-[200px] h-[200px] rounded-full m-auto' />
                <p className='text-xl text-center'>{doc.firstName} {doc.lastName}</p>
              </div>
              <div className='text-xl mt-10'>
                <p className='font-semibold'>Email :- <span className='font-normal'>{doc.email}</span></p>
                <p  className='font-semibold'>Phone :- <span className='font-normal'>{doc.phone}</span></p>
                <p  className='font-semibold'>DOB :- <span className='font-normal'>{doc.dob.substr(0,10)}</span></p>
                <p  className='font-semibold'>Department <span className='font-normal'>{doc.doctorDepartment}</span></p>
                <p  className='font-semibold'>NIC :- <span className='font-normal'>{doc.nic}</span></p>
                
                <p  className='font-semibold'>Gender :- <span className='font-normal'>{doc.gender}</span></p>
                
              </div>
              </>

            )
          })):<h1>There are no doctors</h1>
        }
      </div>
      
    </div>
  )
}

export default Doctors
