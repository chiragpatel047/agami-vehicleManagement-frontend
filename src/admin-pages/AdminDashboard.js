import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  
  const navigate = useNavigate();

  const userType = localStorage.getItem("userType");
  const isUserLogin = localStorage.getItem("isUserLogin");

      useEffect(() => {
        if(isUserLogin ==="true"){
          if (userType !== "Admin") {
            navigate("/unauthorized");
          }
        }else{
          navigate("/");
        }
        
      }, [userType, navigate]);

  return (
    <div>
        <div className='mt-14 flex flex-col gap-5 px-24'>
        <div className='flex flex-row justify-around gap-4'>

        <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg shadow-md gap-6 w-full h-52 hover:bg-slate-700 cursor-pointer' onClick={()=> {navigate("/AdminAllRequests")}}>
          <img src='/images/repairs.png' className='w-16 h-16'></img>
          <h1 className='text-xl text-gray-200 font-bold'>All Requests</h1>
          </div>

          <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg shadow-md gap-6 w-full h-52 hover:bg-slate-700 cursor-pointer' onClick={()=> {navigate("/AllMechanics")}} >
          <img src='/images/mechanic_icon.png' className='w-16 h-16'></img>
          <h1 className='text-xl text-gray-200 font-bold'>Mechanics</h1>
          </div>
          
        </div>

        <div className='flex flex-row justify-around gap-4'>
          <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg shadow-md gap-6 w-full h-52 hover:bg-slate-700 cursor-pointer' onClick={()=> {navigate("/AddAdmin")}} >
          <img src='/images/add.png' className='w-16 h-16'></img>
          <h1 className='text-xl text-gray-200 font-bold'>Add Admin</h1>
          </div>

          <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg shadow-md gap-6 w-full h-52 hover:bg-slate-700 cursor-pointer' onClick={()=> {navigate("/AllAdmins")}}> 
          <img src='/images/user-group.png' className='w-16 h-16'></img>
          <h1 className='text-xl text-gray-200 font-bold'>All Admin</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminDashboard