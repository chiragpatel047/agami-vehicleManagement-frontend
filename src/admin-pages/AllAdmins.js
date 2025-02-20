import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import React from "react";

const AllAdmins = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const loginType = localStorage.getItem("loginType");
  const userId = localStorage.getItem("userId");

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

  const deleteAdmin = async (record_id,e) => {
    try {
        const response = await api.delete(`/user/${record_id}`);
  
        if (response.status === 200) {
          fetchRecords(); 
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
  };

  const fetchRecords = async () => {
    try {
      const response = await api.get(`/admins`);

      setRecords(response.data.response);
      console.log(response.data.response);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [userId, accessToken, loginType]);

  return (
    <div>
      <div>
        <div class="overflow-hidden rounded-2xl mx-10 mt-10">
          <table class="min-w-full shadow-lg">
            <thead class="bg-slate-800 text-white text-lg rounded-lg ">
              <tr className="">
                <th class="px-6 py-5 text-center font-semibold uppercase">
                  Admin ID
                </th>
                <th class="px-6 py-5 text-center font-semibold uppercase">
                  Name
                </th>
                <th class="px-6 py-5 text-center font-semibold uppercase">
                  Email
                </th>
                <th class="px-6 py-5 text-center font-semibold uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr class="hover:bg-gray-100">
                    <td class="px-6 py-4 text-center">{record.user_id}</td>
                    <td class="px-6 py-4 text-center">{record.name}</td>
                    <td class="px-6 py-4 text-center">{record.email || "-"}</td>
                    <td class="px-6 py-4 text-center">
                      <button
                        onClick={(e) => deleteAdmin(record.user_id,e)}
                        className=" bg-red-600 text-gray-100 px-5 py-2 rounded-full hover:bg-red-400 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-3">no data</p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllAdmins;
