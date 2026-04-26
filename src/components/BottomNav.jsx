import { Bike, Clock, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BottomNav = ({ currentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active page from location if currentPage not provided
  const activePage = currentPage || 
    (location.pathname === "/" ? "ride" : 
     location.pathname === "/activity" ? "activity" : 
     location.pathname === "/account" ? "account" : "ride");

  const handleNavigation = (page) => {
    if (page === "ride") navigate("/");
    else if (page === "activity") navigate("/activity");
    else if (page === "account") navigate("/account");
  };

  return (
    <div className="fixed bottom-0 w-full px-4 pb-4">
      <div className="bg-white rounded-3xl shadow-lg flex justify-around items-center py-3">
        
        {/* RIDE TAB */}
        <button
          onClick={() => handleNavigation("ride")}
          className="flex flex-col items-center focus:outline-none transition-colors"
        >
          <div className={`p-2 rounded-full ${activePage === "ride" ? "bg-orange-100" : ""}`}>
            <Bike size={20} className={activePage === "ride" ? "text-orange-500" : "text-gray-500"} />
          </div>
          <span className={`text-sm mt-1 ${activePage === "ride" ? "text-orange-500 font-medium" : "text-gray-500"}`}>
            Ride
          </span>
        </button>

        {/* ACTIVITY TAB */}
        <button
          onClick={() => handleNavigation("activity")}
          className="flex flex-col items-center focus:outline-none transition-colors"
        >
          <div className={`p-2 rounded-full ${activePage === "activity" ? "bg-orange-100" : ""}`}>
            <Clock size={20} className={activePage === "activity" ? "text-orange-500" : "text-gray-500"} />
          </div>
          <span className={`text-sm mt-1 ${activePage === "activity" ? "text-orange-500 font-medium" : "text-gray-500"}`}>
            Activity
          </span>
        </button>

        {/* ACCOUNT TAB */}
        <button
          onClick={() => handleNavigation("account")}
          className="flex flex-col items-center focus:outline-none transition-colors"
        >
          <div className={`p-2 rounded-full ${activePage === "account" ? "bg-orange-100" : ""}`}>
            <User size={20} className={activePage === "account" ? "text-orange-500" : "text-gray-500"} />
          </div>
          <span className={`text-sm mt-1 ${activePage === "account" ? "text-orange-500 font-medium" : "text-gray-500"}`}>
            Account
          </span>
        </button>

      </div>
    </div>
  );
};

export default BottomNav;