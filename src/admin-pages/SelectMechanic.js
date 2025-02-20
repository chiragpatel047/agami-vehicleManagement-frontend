import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import React from "react";

const SelectMechanic = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const loginType = localStorage.getItem("loginType");
  const userId = localStorage.getItem("userId");

  const urlParams = new URLSearchParams(window.location.search);
  const record_id = urlParams.get("record_id");
  const user_id = urlParams.get("user_id");

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

  const assignToMechanic = async (mechanicId, e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/maintenance/assign/${record_id}`, {
        user_id : user_id,
        mechanic_id: mechanicId,
      });

      if (response.status === 200) {
        navigate("/AdminDashboard");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Please try again.");
    }
  };

  const fetchRecords = async () => {
    try {
      const response = await api.get(`/user/mechanics`);

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
        <h1 className="text-4xl text-gray-100 font-bold mt-10">
          Select Mechanic
        </h1>

        <div class="overflow-hidden rounded-2xl mx-10 mt-10">
          <table class="min-w-full shadow-lg">
            <thead class="bg-slate-800 text-white text-lg rounded-lg ">
              <tr className="">
                <th class="px-6 py-5 text-center font-semibold uppercase">
                  Mechanic ID
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
                        onClick={(e) => assignToMechanic(record.user_id, e)}
                        className=" bg-green-600 text-gray-100 px-5 py-2 rounded-full hover:bg-green-400 font-semibold"
                      >
                        Assign
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

export default SelectMechanic;
