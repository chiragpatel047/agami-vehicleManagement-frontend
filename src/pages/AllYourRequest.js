import { useEffect, useState } from "react";
import axios from "axios";
import api from '../utils/api'; 
import { useNavigate } from "react-router-dom";

const AllYourRequest = () => {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);

  const accessToken = localStorage.getItem("accessToken");
  const loginType = localStorage.getItem("loginType");
  const userId = localStorage.getItem("userId");

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
  
  const fetchMaintenances = async () => {
    try {
      const response = await api.get(
        `/user/maintenances?user_id=${userId}`
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

  const handleDelete = async (record_id, e) => {
    e.preventDefault();

    try {
      const response = await api.delete(
        `/maintenance/${record_id}`
      );

      if (response.status === 200) {
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
        <h1 className="text-4xl text-gray-100 font-bold mt-10">
          Your Requests
        </h1>

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
                        onClick={(e) => handleDelete(record.record_id, e)}
                        className=" bg-red-600 text-gray-100 px-5 py-2 rounded-full hover:bg-red-400 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-3">
                  Loading data...
                </p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllYourRequest;
