import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet"; // ম্যাপের জন্য
import "leaflet/dist/leaflet.css"; // ম্যাপের স্টাইল
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";
import { Clock, ChevronRight, MoreHorizontal } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const recentPlaces = [
    {
      title: "Orchard Central",
      address: "181 Orchard Rd, Singapore",
    },
    {
      title: "Marina Bay Sands",
      address: "10 Bayfront Ave, Singapore",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      
      {/* ⬇️ BACKGROUND MAP SECTION */}
      <div className="fixed inset-0 z-0">
        <MapContainer 
          center={[22.5726, 88.3639]} // কলকাতা/ইন্ডিয়া সেন্টারেড
          zoom={13} 
          scrollWheelZoom={false}
          zoomControl={false} // ক্লিন লুকের জন্য কন্ট্রোল অফ
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
        </MapContainer>
        {/* ম্যাপের ওপর হালকা সাদা আভা দেওয়ার জন্য (অপশনাল) */}
        <div className="absolute inset-0 bg-white/10 pointer-events-none"></div>
      </div>

      {/* ⬆️ FOREGROUND COMPONENTS (Floating on Map) */}
      <div className="relative z-10">
        
        {/* WHERE TO SECTION */}
        <div className="p-5 bg-white/90 backdrop-blur-md m-5.5 rounded-3xl shadow-xl border border-white/20">
          <h2 className="text-4xl font-extrabold mb-4">Where to?</h2>
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 border rounded-xl bg-white"
            placeholder="Enter destination"
          />
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setDestination("Home Address")}
              className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium hover:bg-gray-100 border border-gray-100"
            >
              🏠 Home
            </button>
            <button
              onClick={() => setDestination("Work Address")}
              className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium hover:bg-gray-100 border border-gray-100"
            >
              💼 Work
            </button>
          </div>
          <Button
            text="Search Ride"
            onClick={() => {
              if (!destination) {
                alert("Please enter destination");
                return;
              }
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const pickup = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                  };
                  navigate("/select", {
                    state: { pickup, drop: destination },
                  });
                },
                () => alert("Location permission denied")
              );
            }}
            className="w-full bg-orange-500 text-white mt-5 py-3"
          />
        </div>

        {/* RECENTS SECTION */}
        <div className="p-5 bg-white/90 backdrop-blur-md m-5.5 rounded-3xl shadow-lg border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Recents</h2>
            <MoreHorizontal className="text-gray-600 cursor-pointer" />
          </div>
          <div className="space-y-4">
            {recentPlaces.map((place, index) => (
              <div
                key={index}
                onClick={() => setDestination(place.title)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Clock className="text-orange-500" size={18} />
                  </div>
                  <div>
                    <p className="font-medium">{place.title}</p>
                    <p className="text-sm text-gray-500">{place.address}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* QUICK BOOK SECTION */}
        <div className="mx-5 mb-5">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">ACTIVE DEAL</span>
                <h3 className="text-2xl font-bold text-gray-900">QuickBike Pro</h3>
                <p className="text-sm text-gray-500 mt-1">Available nearby • 3 min away</p>
              </div>
              <p className="text-3xl font-bold text-orange-500">$4.50</p>
            </div>
            <button className="w-full bg-orange-500 text-gray-900 py-4 rounded-full font-bold text-lg hover:bg-orange-600 transition">
              Quick Book
            </button>
          </div>
        </div>

        {/* WEEKLY STREAK SECTION */}
        <div className="mx-5 mb-32">
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-orange-400 rounded-full opacity-10"></div>
            <p className="text-sm font-bold text-yellow-400 mb-2">WEEKLY STREAK</p>
            <h3 className="text-2xl font-bold mb-4">Get 30% off your next ride!</h3>
            <div className="relative z-10">
              <span className="text-4xl">🔥</span>
            </div>
          </div>
        </div>

        <BottomNav currentPage="ride" />
      </div>
    </div>
  );
};

export default Home;