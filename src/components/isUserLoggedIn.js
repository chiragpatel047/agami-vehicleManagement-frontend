import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const IsUserLoggedIn = (navigate)=> {
  
    useEffect(() => {

        const isUserLogin = localStorage.getItem("isUserLogin");
        const userType = localStorage.getItem("userType");
    
        if (isUserLogin === "true") {
          if (userType === "User") {
            navigate("/dashboard"); // Redirect to User Dashboard
          } else if (userType === "Mechanic") {
            navigate("/mechanic-dashboard"); // Redirect to Mechanic Dashboard
          }
        }
      }, [navigate]);
}

export default IsUserLoggedIn;
