import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../utils/api'; 

const AddDescription = () => {
  const navigate = useNavigate();

  const [desc, setDesc] = useState("");

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-CA");
    console.log(formattedDate);

    const urlParams = new URLSearchParams(window.location.search);
    const vehicle_id = urlParams.get("vehicle_id");
    const userId = localStorage.getItem("userId");


    try {
      const response = await api.post(
        "/maintenance",
        {
          user_id : userId,
          vehicle_id : vehicle_id,
          maintenance_date : formattedDate,
          description : desc
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-gray-900 h-screen flex mt-12 justify-center">
        <div className="flex flex-col">
          <h1 className="text-4xl text-gray-100 font-bold">Description</h1>
          <p className=" text-gray-100 text-lg mt-5">
            Enter description about your issue
          </p>
          <textarea
            class="bg-gray-800 text-gray-100 outline-none mt-10 px-5 py-4 rounded-lg w-96"
            placeholder="Describe your issue..."
            value={desc}
            rows={5}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>

          <button
            onClick={handleSubmit}
            class="bg-blue-600 text-gray-100 mt-10 px-5 py-4 rounded-lg hover:bg-blue-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDescription;
