import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../utils/api'; 


function AddVehiclePage() {

  const navigate = useNavigate();
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

  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const user_id = localStorage.getItem("userId");

      const response = await api.post("/vehicle", {
        user_id : user_id,
        vehicle_brand: brandName,
        vehicle_model: modelName,
        vehicle_plate_no: plateNo,
        vehicle_color: color,
        vehicle_type: type
      });

      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Failed to add");
    }
  };

  return (
    <div>
      <div className="bg-gray-900 h-screen flex mt-12 justify-center">
        <div className="flex flex-col">
          <h1 className="text-4xl text-gray-100 font-bold">Add Vehicle</h1>
          <p className=" text-gray-100 text-lg mt-5">
            Enter details about your vehicle
          </p>
          <input
            class="bg-gray-800 text-gray-100 outline-none mt-10 px-5 py-4 rounded-lg"
            type="text"
            placeholder="Brand name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          ></input>
          <input
            class="bg-gray-800 text-gray-100 outline-none mt-5 px-5 py-4 rounded-lg"
            type="text"
            placeholder="Model name"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            required
          ></input>

          <input
            class="bg-gray-800 text-gray-100 outline-none mt-5 px-5 py-4 rounded-lg"
            type="text"
            placeholder="Plate No"
            value={plateNo}
            onChange={(e) => setPlateNo(e.target.value)}
            required
          ></input>

          <input
            class="bg-gray-800 text-gray-100 outline-none mt-5 px-5 py-4 rounded-lg"
            type="text"
            placeholder="Colour"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          ></input>

          <input
            class="bg-gray-800 text-gray-100 outline-none mt-5 px-5 py-4 rounded-lg"
            type="text"
            placeholder="Vehcle type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          ></input>

          <button onClick={handleSubmit} class="bg-blue-600 text-gray-100 mt-10 px-5 py-4 rounded-lg hover:bg-blue-400">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVehiclePage;
