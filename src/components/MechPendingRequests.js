import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import React from 'react'

const MechPendingRequests = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
  
    const accessToken = localStorage.getItem("accessToken");
    const loginType = localStorage.getItem("loginType");
    const userId = localStorage.getItem("userId");
  
    let userInput;
  
    const showPrompt = (e, record_id,user_id) => {
      userInput = prompt("Enter Cost : ");
  
      if (userInput !== null && userInput.trim() !== "") {
        markAsDone(e,record_id, user_id);
      }
    };
  
    const fetchMaintenances = async () => {
      try {
        const response = await api.get(
          `/mechanic/maintenances?mechanic_id=${userId}&status=In-Progress`
        );
  
        setRecords(response.data.response);
        console.log(response.data.response);
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
  
    useEffect(() => {
      fetchMaintenances();
    }, [userId, accessToken, loginType]);
  
    const markAsDone = async (e,record_id,user_id) => {
  
      try {
        console.log("accessToken : " + accessToken);
  
        const response = await api.put(`/maintenance/completed/${record_id}?user_id=`+user_id, {
          cost: userInput,
        });
  
        if (response.status === 200) {
          console.log(response.data);
          fetchMaintenances();
        }
      } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "Please try again.");
      }
    };
  
    return (
      <div>
        <div>
          <div class="overflow-hidden rounded-2xl mx-10 mt-10">
            <table class="min-w-full shadow-lg">
              <thead class="bg-slate-800 text-white text-lg rounded-lg">
                <tr>
                  <th class="px-6 py-5 text-center font-semibold uppercase">
                    Request Date
                  </th>
                  <th class="px-6 py-5 text-center font-semibold uppercase">
                    Description
                  </th>
                  <th class="px-6 py-5 text-center font-semibold uppercase">
                    Cost
                  </th>
                  <th class="px-6 py-5 text-center font-semibold uppercase">
                    Status
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
                      <td class="px-6 py-4 text-center">
                        {record.created_at.split("T")[0]}
                      </td>
                      <td class="px-6 py-4 text-center">{record.description}</td>
                      <td class="px-6 py-4 text-center">{record.cost || "-"}</td>
                      <td class="px-6 py-4 text-center font-semibold">
                        {record.status}
                      </td>
                      <td class="px-2 py-4">
                        <button
                          onClick={(e) => showPrompt(e, record.record_id,record.user_id)}
                          className=" bg-green-600 text-gray-100 px-5 py-2 rounded-full hover:bg-green-400 font-semibold"
                        >
                          Mark done
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p className="text-center text-gray-500 col-span-3">
                    no data 
                  </p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    ); 
}

export default MechPendingRequests