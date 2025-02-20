import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import IsUserLoggedIn from "../components/isUserLoggedIn";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //IsUserLoggedIn(navigate);

  const userType = localStorage.getItem("userType");
  const isUserLogin = localStorage.getItem("isUserLogin");

  useEffect(() => {
    if (isUserLogin === "true") {
      if (userType === "User") {
        navigate("/dashboard"); 
      }else if(userType === "Mechanic"){
        navigate("/mechanic-dashboard");
      }else if(userType ==="Admin"){
        navigate("/AdminDashboard")
      }
    } else {
      navigate("/");
    }
  }, [userType, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", {
        email,
        password,
      });

      if (response.status === 200) {

        localStorage.setItem(
          "accessToken",
          response.data.response.user.accessToken
        );
        localStorage.setItem(
          "refreshToken",
          response.data.response.user.refreshToken
        );
        localStorage.setItem("userId", response.data.response.user.user_id);
        localStorage.setItem("userType", response.data.response.user.userType);

        localStorage.setItem("loginType", "custom");
        localStorage.setItem("isUserLogin", "true");

        const userType = response.data.response.user.userType;

        if (userType === "User") {
          navigate("/dashboard");
        } else if (userType === "Mechanic") {
          navigate("/mechanic-dashboard");
        } else if (userType === "Admin") {
          navigate("/AdminDashboard");
        }
      }
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleSignIn = async () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_self");
  };

  return (
    <div className="bg-gray-900 h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-4xl text-gray-100 font-bold">Login</h1>
        <p className=" text-gray-100 text-lg mt-5">
          Welcome back, sign in with your account
        </p>
        <input
          class="bg-gray-800 text-gray-100 outline-none mt-10 px-5 py-4 rounded-lg"
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
          class="bg-blue-600 text-gray-100 mt-10 px-5 py-4 rounded-lg hover:bg-blue-400"
          onClick={handleSubmit}
        >
          Login
        </button>

        <div className="flex flex-row justify-center">
          <p className=" text-gray-100 text-sm mt-5">Don't have account?</p>
          <p
            className=" text-blue-600 font-bold text-sm mt-5 ml-2 cursor-pointer hover:text-blue-400 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </p>
        </div>

        <div
          className="flex flex-row items-center justify-center rounded-lg bg-gray-800 mt-10 py-4 hover:bg-gray-700 cursor-pointer"
          onClick={handleGoogleSignIn}
        >
          <img src="/images/google_logo.png" className="w-8 h-8"></img>
          <p className=" text-blue-100 ml-5">Continue with Google</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
