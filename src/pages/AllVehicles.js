import { useEffect, useState } from "react";
import axios from "axios";
import api from '../utils/api'; 
import { useNavigate } from "react-router-dom";


const AllVehicles = () => {

  const navigate = useNavigate();
  

  const [vehicles, setVehicles] = useState([]);

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

  useEffect(() => {
    let isMounted = true;

    const fetchVehicles = async () => {
      try {
        const response = await api.get(
          `/user/vehicles?user_id=${userId}`
        );

        if (isMounted) {
          setVehicles(response.data.response);
        }
      } catch (error) {
        if (isMounted) console.error("Error fetching vehicles:", error);
      }
    };

    fetchVehicles();

    return () => {
      isMounted = false; 
    };
  }, [[userId, accessToken, loginType]]);

  return (
    <div>
      <h1 className="text-4xl text-gray-100 font-bold mt-10">Your Vehicles</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-14 mt-10">
        {vehicles.length > 0 ? (
          vehicles.map((vehicle, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center bg-slate-800 rounded-lg p-8 shadow-md hover:bg-slate-700"
            >
              <img src="/images/car_logo.png" className="w-20 h-20"></img>
              <h3 className="text-xl font-semibold text-gray-100 mt-5">
                {vehicle.vehicle_brand + " " + vehicle.vehicle_model}
              </h3>
              <p className="text-lg text-gray-300 mt-3">
                {vehicle.vehicle_type +
                  " | " +
                  vehicle.vehicle_color +
                  " | " +
                  vehicle.vehicle_plate_no}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            Loading vehicles...
          </p>
        )}
      </div>
    </div>
  );
};

export default AllVehicles;
