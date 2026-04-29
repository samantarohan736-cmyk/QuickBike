import React from "react";
import BottomNav from "../components/BottomNav";
import { Clock, MapPin, DollarSign, Star } from "lucide-react";

const Activity = () => {
  // Mock ride history data
  const rideHistory = [
    {
      id: 1,
      destination: "Marina Bay Sands",
      date: "Today • 2:30 PM",
      fare: "₹1,038",
      rating: 5,
      rideType: "Bike Taxi"
    },
    {
      id: 2,
      destination: "Orchard Central",
      date: "Yesterday • 5:15 PM",
      fare: "₹726",
      rating: 4,
      rideType: "Quick Auto"
    },
    {
      id: 3,
      destination: "Gardens by the Bay",
      date: "2 days ago • 10:00 AM",
      fare: "₹1,262",
      rating: 5,
      rideType: "Mini Cab"
    },
    {
      id: 4,
      destination: "Singapore Flyer",
      date: "3 days ago • 7:45 PM",
      fare: "₹954",
      rating: 4,
      rideType: "Bike Taxi"
    },
  ];

  return (
    <div className="pb-24">
      {/* HEADER */}
      <div className="bg-blue-100 p-5 mx-5 mt-5 rounded-3xl">
        <h2 className="text-3xl font-bold mb-2">Your Rides</h2>
        <p className="text-gray-600 text-sm">View your ride history and details</p>
      </div>

      {/* RIDES LIST */}
      <div className="px-5 mt-6">
        <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {rideHistory.map((ride) => (
            <div key={ride.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              
              {/* TOP ROW */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{ride.destination}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <Clock size={14} />
                    <span>{ride.date}</span>
                  </div>
                </div>
                <p className="font-bold text-orange-500 text-lg">{ride.fare}</p>
              </div>

              {/* BOTTOM ROW */}
              <div className="flex justify-between items-center">
                <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                  {ride.rideType}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium">{ride.rating}</span>
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav currentPage="activity" />
    </div>
  );
};

export default Activity;
