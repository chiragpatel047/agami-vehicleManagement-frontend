import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");
    const userId = urlParams.get("userId");
    const isNewUser = urlParams.get("isNewUser");
    const userType = urlParams.get("userType");
    
    if (accessToken) {

      localStorage.setItem("accessToken",accessToken);
      localStorage.setItem("refreshToken",refreshToken);
      localStorage.setItem("userId",userId);

      localStorage.setItem("loginType","google");
      localStorage.setItem("isUserLogin","true");

      localStorage.setItem("userType",userType);

      if(isNewUser==="true"){
        navigate("/userType");
      }else{
        if(userType==="User"){
          navigate("/dashboard");
        }else if(userType==="Mechanic"){
          navigate("/mechanic-dashboard");
        }
      }

    } else {
      alert("Login failed!");
      navigate("/");
    }
  }, [navigate]);

  return <h1>Processing Login...</h1>;
}

export default OAuthCallback;
