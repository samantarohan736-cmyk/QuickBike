import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import { Settings, LogOut, CreditCard, MapPin, Phone, Mail, Award } from "lucide-react";

const Account = () => {
  const navigate = useNavigate();

  // Mock user data
  const user = {
    name: "Marcus Johnson",
    id: "QB-2024-8512",
    age: 28,
    phone: "+65 9876 5432",
    email: "marcus.johnson@email.com",
    joinDate: "Joined since 2023",
    rating: 4.8,
    rides: 156,
    avatar: "👤",
    paymentMethod: "Visa •••• 4242",
    savedAddresses: {
      home: "123 Home Street, Singapore",
      work: "456 Work Avenue, Singapore"
    }
  };

  return (
    <div className="pb-24">
      {/* PROFILE HEADER */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-4xl shadow-lg">
            {user.avatar}
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-sm text-orange-100">{user.id}</p>
            <p className="text-sm text-orange-100">{user.joinDate}</p>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-3 gap-3 px-5 -mt-6 mb-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">{user.rating}</p>
          <p className="text-xs text-gray-600">Rating</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">{user.rides}</p>
          <p className="text-xs text-gray-600">Rides</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-4 text-center">
          <p className="text-2xl font-bold text-orange-500">{user.age}</p>
          <p className="text-xs text-gray-600">Age</p>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="px-5 mb-6">
        <h3 className="text-lg font-bold mb-4">Personal Information</h3>
        
        <div className="space-y-3">
          {/* PHONE */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
            <Phone className="text-orange-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
            <Mail className="text-orange-500" size={20} />
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
            <CreditCard className="text-orange-500" size={20} />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Payment Method</p>
              <p className="font-medium">{user.paymentMethod}</p>
            </div>
            <button className="text-orange-500 text-sm font-semibold">Change</button>
          </div>
        </div>
      </div>

      {/* SAVED ADDRESSES */}
      <div className="px-5 mb-6">
        <h3 className="text-lg font-bold mb-4">Saved Addresses</h3>
        
        <div className="space-y-3">
          {/* HOME */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
            <MapPin className="text-orange-500" size={20} />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Home</p>
              <p className="font-medium text-sm">{user.savedAddresses.home}</p>
            </div>
          </div>

          {/* WORK */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm">
            <MapPin className="text-orange-500" size={20} />
            <div className="flex-1">
              <p className="text-xs text-gray-500">Work</p>
              <p className="font-medium text-sm">{user.savedAddresses.work}</p>
            </div>
          </div>
        </div>
      </div>

      {/* SETTINGS & LOGOUT */}
      <div className="px-5 space-y-3 mb-6">
        <button className="w-full flex items-center gap-3 bg-white p-4 rounded-2xl shadow-sm hover:bg-gray-50">
          <Settings className="text-orange-500" size={20} />
          <span className="font-medium">Settings</span>
        </button>

        <button 
          onClick={() => {
            // Handle logout
            navigate("/");
          }}
          className="w-full flex items-center gap-3 bg-red-50 p-4 rounded-2xl hover:bg-red-100 transition"
        >
          <LogOut className="text-red-500" size={20} />
          <span className="font-medium text-red-500">Logout</span>
        </button>
      </div>

      <BottomNav currentPage="account" />
    </div>
  );
};

export default Account;
