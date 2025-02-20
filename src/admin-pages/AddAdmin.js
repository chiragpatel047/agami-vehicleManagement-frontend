import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";

function AddAdmin() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  const isUserLogin = localStorage.getItem("isUserLogin");

  useEffect(() => {
    if (isUserLogin === "true") {
      if (userType !== "Admin") {
        navigate("/unauthorized");
      }
    } else {
      navigate("/");
    }
  }, [userType, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post("/admin", {
        name: name,
        email: email,
        password: password
      });

      if (response.status === 200) {
        navigate("/AdminDashboard");
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
          <h1 className="text-4xl text-gray-100 font-bold">Add Admin</h1>
          <p className=" text-gray-100 text-lg mt-5">
            Enter credentials of new admin
          </p>
          <input
            class="bg-gray-800 text-gray-100 outline-none mt-10 px-5 py-4 rounded-lg"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <input
            class="bg-gray-800 text-gray-100 outline-none mt-5 px-5 py-4 rounded-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>

          <input
            class="bg-gray-800 text-gray-100 outline-none mt-5 px-5 py-4 rounded-lg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>

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
}

export default AddAdmin;
