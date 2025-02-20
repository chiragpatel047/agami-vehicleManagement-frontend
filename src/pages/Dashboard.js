import React ,{useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useSocket from "../socket/useSocket";

const Dashboard = () => {
  
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  
  const { messages } = useSocket(userId);

  const userType = localStorage.getItem("userType");

  const isUserLogin = localStorage.getItem("isUserLogin");
  
        useEffect(() => {
          if(isUserLogin ==="true"){
            if (userType !== "User") {
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
          <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg shadow-md gap-6 w-full h-52 hover:bg-slate-700 cursor-pointer' onClick={()=> {navigate("/SelectVehicle")}} >
          <img src='/images/add.png' className='w-16 h-16'></img>
          <h1 className='text-xl text-gray-200 font-bold'>New Request</h1>
          </div>

          <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg shadow-md gap-6 w-full h-52 hover:bg-slate-700 cursor-pointer' onClick={()=> {navigate("/AllYourRequest")}}>
          <img src='/images/repairs.png' className='w-16 h-16'></img>
          <h1 className='text-xl text-gray-200 font-bold'>All Requests</h1>
          </div>
        </div>

        <div className='flex flex-row justify-around gap-4'>
          <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg shadow-md gap-6 w-full h-52 hover:bg-slate-700 cursor-pointer' onClick={()=> {navigate("/addVehicle")}} >
          <img src='/images/add_vehicle.png' className='w-16 h-16'></img>
          <h1 className='text-xl text-gray-200 font-bold'>Add Vehicle</h1>
          </div>

          <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg shadow-md gap-6 w-full h-52 hover:bg-slate-700 cursor-pointer' onClick={()=> {navigate("/AllVehicles")}}> 
          <img src='/images/all_vehicles.png' className='w-16 h-16'></img>
          <h1 className='text-xl text-gray-200 font-bold'>All vehicles</h1>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard