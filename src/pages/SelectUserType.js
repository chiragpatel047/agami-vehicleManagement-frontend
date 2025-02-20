import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from '../utils/api'; 

function SelectUserType() {

    const navigate = useNavigate(); 

    const handleSubmit = async (userType,e) => {
        e.preventDefault();

        const loginType = localStorage.getItem("loginType");

        try {
            const userId = localStorage.getItem("userId"); 
            const accessToken = localStorage.getItem("accessToken");

            const response = await api.put(`/updateUserType/${userId}`,{userType : userType});

              console.log(response.data);

              if (response.status === 200) {
                
                localStorage.setItem("userType",userType);
                localStorage.setItem("isUserLogin","true");

                if(userType==="User"){
                  navigate("/dashboard");
                }else if(userType==="Mechanic"){
                  navigate("/mechanic-dashboard");
                }
              }

        } catch (error) {
            console.log(error);
        }
      };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-4xl text-gray-100 font-bold">Who are you?</h1>
        <p className=" text-gray-100 text-lg mt-5">Choose your user type to continue</p>

        <button class="bg-gray-800 text-gray-100 mt-10 px-5 py-4 rounded-lg hover:bg-blue-600" onClick={(e) => handleSubmit("User", e)}>User</button>
        <button class="bg-gray-800 text-gray-100 mt-5 px-5 py-4 rounded-lg hover:bg-blue-600" onClick={(e) => handleSubmit("Mechanic", e)}>Mechanic</button>

      </div>
    </div>
  );
}

export default SelectUserType;
