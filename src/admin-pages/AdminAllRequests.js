import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import AdminPendingRequests from "../components/AdminPendingRequests";
import AdminInProgressRequests from "../components/AdminInProgressRequests";
import AdminCompletedRequests from "../components/AdminCompletedRequests";

const AdminAllRequests = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

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
              onClick={() => setActiveTab("in-progress")}
              className={`${
                activeTab === "in-progress" ? "bg-slate-700 rounded-full" : ""
              } py-5 px-10  hover:rounded-full cursor-pointer`}
            >
              <h1 className="text-xl">In-Progress Request</h1>
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
            <AdminPendingRequests />
          ) : activeTab === "in-progress" ? (
            <AdminInProgressRequests />
          ) : (
            <AdminCompletedRequests />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAllRequests;
