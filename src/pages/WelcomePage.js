import React, { useState } from "react";

function WelcomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign-In Clicked");
  };

  return (
    <div>
      <div className="flex mt-10 justify-center">
        <img className="w-10 h-10" src="/images/main_small_logo.png"></img>
        <h1 className="text-4xl font-bold text-gray-50 ml-5">RAPID REPAIR</h1>
      </div>
      <div>
        <div className="flex items-center justify-center mt-20 ">
          <div className="bg-slate-800 p-10 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-slate-100">
              Login
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  className="w-full p-2 border rounded mt-8 bg-slate-300"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="w-full p-2 border rounded mt-1 bg-slate-300"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-pink-600 text-white p-2 mt-10 rounded hover:bg-pink-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-center">
        
          <div className="flex w-fit mt-20 bg-slate-800 p-5 rounded-lg shadow-md justify-center align-middle ">
            <img className="w-8 h-8" src="/images/google_logo.png"></img>
            <h1 className="ml-3  text-lg font-bold text-gray-50">
              Sign with Google
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WelcomePage;
