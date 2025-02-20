import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IsUserLoggedIn from "../components/isUserLoggedIn"
const Unauthorized = () => {
console.log("unuth");

  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");

  console.log("USERTYPE :" + userType);

  // if(userType=="User"){
  //   navigate("/dashboard");
  // }else if(userType==="Mechanic"){
  //   navigate("/mechanic-dashboard");
  // }else if(userType==="Admin"){
  //   navigate("/AdminDashboard");
  // }

  return (
    <div className="w-screen h-screen justify-center items-center">
      <h1 className="text-4xl text-gray-100 font-bold mt-10">Unauthorized</h1>
    </div>
  );
};

export default Unauthorized;
