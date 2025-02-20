import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import React from 'react'

const AdminCompletedRequests = () => {
    const navigate = useNavigate();
    const [records, setRecords] = useState([]);
  
    const accessToken = localStorage.getItem("accessToken");
    const loginType = localStorage.getItem("loginType");
    const userId = localStorage.getItem("userId");

  
    const fetchMaintenances = async () => {
      try {
        const response = await api.get(
          `/maintenanceByStatus?status=Done`
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
  
    return (
      <div>
        <div>
          <div class="overflow-hidden rounded-2xl mx-10 mt-10">
            <table class="min-w-full shadow-lg">
              <thead class="bg-slate-800 text-white text-lg rounded-lg ">
                <tr className="">
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

export default AdminCompletedRequests;