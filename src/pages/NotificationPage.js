import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useSocket from "../socket/useSocket";
import api from "../utils/api";

const NotificationPage = () => {

  const [records, setRecords] = useState([]);

  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const loginType = localStorage.getItem("loginType");
  const userType = localStorage.getItem("userType");

  let connectionParam;

  if(userType==="Admin"){
    connectionParam = "admin";
  }else{
    connectionParam = userId;
  }

  const { messages } = useSocket(connectionParam);

  const fetchNotifications = async () => {

    try {

      if(userType==="Admin"){
        const response = await api.get(
          `/user/notifications?user_id=admin`
        );
  
        setRecords(response.data.response);
        console.log(response.data.response);
      }else{
        const response = await api.get(
          `/user/notifications?user_id=${userId}`
        );
        setRecords(response.data.response);
        console.log(response.data.response);
      }
      
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, [userId, accessToken, loginType]);
  return (
    <div>
      <h1 className="text-4xl text-gray-100 font-bold mt-10">Notifications</h1>
      <div className="flex flex-col-reverse justify-center mx-10 mt-5">
    
      {records.map((record, index) => (
          <div className="bg-slate-800 rounded-lg flex flex-row px-5 py-5 mt-5">
          <div className="bg-slate-700 rounded-full p-3">
            <img
              src="/images/notification-bell.png"
              className="w-6 h-6"
              alt="Logo"
            />
          </div>

          <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-start items-start mx-5">
            <p className="text-lg text-gray-200 font-bold">{record.message}</p>
            <p className="text-xs text-gray-400 mt-1 ">{record.title} | status : {record.status}</p>
            </div>
            <div className="flex flex-col justify-center mx-5">
            <p className="text-xs text-gray-400 mt-1 ">{record.time}</p>
            </div>
          </div>
            
        </div>
        ))}
        {messages.map((message, index) => (
          <div className="bg-slate-800 rounded-lg flex flex-row px-5 py-5 mt-5">
          <div className="bg-slate-700 rounded-full p-3">
            <img
              src="/images/notification-bell.png"
              className="w-6 h-6"
              alt="Logo"
            />
          </div>

          <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-start items-start mx-5">
            <p className="text-lg text-gray-200 font-bold">{message.message}</p>
            <p className="text-xs text-gray-400 mt-1 ">{message.title} | status : {message.status}</p>
            </div>
            <div className="flex flex-col justify-center mx-5">
            <p className="text-xs text-gray-400 mt-1 ">{message.time}</p>
            </div>
          </div>
            
        </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
