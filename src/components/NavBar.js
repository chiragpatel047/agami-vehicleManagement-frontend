import { BrowserRouter as Router,Routes,Route,useLocation,} from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const hideNavbarRoutes = ["/", "/signup", "/userType", "/OAuthCallback"];

  if (hideNavbarRoutes.includes(location.pathname)) {
    return null; 
  }

  const logout = async (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex px-8 py-8 bg-gray-800 shadow-md flex-row justify-between items-center">
      <div className="flex flex-row">
        <img
          src="/images/main_small_logo.png"
          className="w-10 h-10"
          alt="Logo"
        />
        <h1 className="text-3xl text-gray-200 font-bold ml-3">RAPID REPAIR</h1>
      </div>

      <div className="flex flex-row items-center justify-items-center">
        <div className="bg-slate-700 hover:bg-slate-600 cursor-pointer rounded-full p-3" onClick={()=> {navigate("/Notification")}}>
          <img
            src="/images/notification-bell.png"
            className="w-6 h-6"
            alt="Logo"
          />
        
        </div>

        <div className="">
        <button onClick={logout} class="bg-red-600 text-gray-100 ml-3 px-5 py-3 rounded-full hover:bg-red-400" >Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
