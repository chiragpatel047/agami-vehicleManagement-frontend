import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import SelectUserType from "./pages/SelectUserType";
import OAuthCallback from "./pages/OauthCallback";
import AddVehiclePage from "./pages/AddVehiclePage";
import NavBar from "./components/NavBar";
import AllVehicles from "./pages/AllVehicles";
import SelectVehicle from "./pages/SelectVehicle";
import AddDescription from "./pages/AddDescriptionPage";
import AllYourRequest from "./pages/AllYourRequest";
import Notification from "./pages/NotificationPage";
import Unauthorized from "./pages/Unauthorized";
import MechanicDashboard from "./mechanic-pages/MechanicDashboard";
import AdminDashboard from "./admin-pages/AdminDashboard";
import AdminAllRequests from "./admin-pages/AdminAllRequests";
import AllMechanics from "./admin-pages/AllMechanics";
import SelectMechanic from "./admin-pages/SelectMechanic";
import AddAdmin from "./admin-pages/AddAdmin";
import AllAdmins from "./admin-pages/AllAdmins";

function App() {
  const userType = localStorage.getItem("userType");
  console.log("From app file userType : " + userType);

  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>

        <Routes>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/userType" element={<SelectUserType />} />
          <Route path="/OAuthCallback" element={<OAuthCallback />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mechanic-dashboard" element={<MechanicDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/addVehicle" element={<AddVehiclePage />} />
          <Route path="/AllVehicles" element={<AllVehicles />} />
          <Route path="/SelectVehicle" element={<SelectVehicle />} />
          <Route path="/AddDescription" element={<AddDescription />} />
          <Route path="/AllYourRequest" element={<AllYourRequest />} />
          <Route path="/AdminAllRequests" element={<AdminAllRequests />} />
          <Route path="/AllMechanics" element={<AllMechanics />} />
          <Route path="/SelectMechanic" element={<SelectMechanic />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/AddAdmin" element={<AddAdmin/>}/>
          <Route path="/AllAdmins" element={<AllAdmins/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
