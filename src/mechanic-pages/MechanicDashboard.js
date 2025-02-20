import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import MechPendingRequests from "../components/MechPendingRequests";
import MechCompletedRequestes from "../components/MechCompletedRequestes";

const MechanicDashboard = () => {
  const navigate = useNavigate();

  const userType = localStorage.getItem("userType");

  const isUserLogin = localStorage.getItem("isUserLogin");

  useEffect(() => {
    if(isUserLogin ==="true"){
      if (userType !== "Mechanic") {
        navigate("/unauthorized");
      }
    }else{
      navigate("/");
    }
    
  }, [userType, navigate]);

  const [activeTab, setActiveTab] = useState("pending");

  return (
    <div>
      <div>
        <h1 className="text-4xl text-gray-100 font-bold mt-10">Requests</h1>

        <div className="mt-10 w-screen bg-slate-800 text-white flex flex-row justify-evenly py-5">
          <div
            onClick={() => setActiveTab("pending")}
            className={`${
              activeTab === "pending" ? "bg-slate-700 rounded-full" : ""
            } py-5 px-10  hover:rounded-full cursor-pointer`}
          >
            <h1 className="text-xl">Pending Request</h1>
          </div>
          <div
            onClick={() => setActiveTab("completed")}
            className={`${
              activeTab === "completed" ? "bg-slate-700 rounded-full" : ""
            } py-5 px-10  hover:rounded-full cursor-pointer`}
          >
            <h1 className="text-xl">Completed Request</h1>
          </div>
        </div>

        {activeTab === "pending" ? (
          <MechPendingRequests />
        ) : (
          <MechCompletedRequestes />
        )}
      </div>
    </div>
  );
};

export default MechanicDashboard;
