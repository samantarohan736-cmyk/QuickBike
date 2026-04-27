import { useEffect, useState } from "react";
import { MapPin, ArrowUpDown } from "lucide-react";

// Helper function to format pickup location
const formatPickup = (pickup) => {
  if (!pickup) return "Fetching location...";
  if (typeof pickup === "string") return pickup;
  if (pickup.lat && pickup.lng) {
    return `Lat: ${pickup.lat.toFixed(4)}, Lng: ${pickup.lng.toFixed(4)}`;
  }
  return "Fetching location...";
};

export default function LocationSelector({ pickup: propPickup, drop: propDrop }) {
  const [pickup, setPickup] = useState(formatPickup(propPickup));
  const [drop, setDrop] = useState(propDrop || "Empire State Building, NY");

  // 📍 Get user's current location
  useEffect(() => {
    // If pickup location is passed as prop, use it
    if (propPickup) {
      setPickup(formatPickup(propPickup));
      return;
    }

    if (!navigator.geolocation) {
      setPickup("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setPickup(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
      },
      () => {
        setPickup("Location permission denied");
      }
    );
  }, [propPickup]);

  // 🔄 Swap function
  const handleSwap = () => {
    setPickup(drop);
    setDrop(pickup);
  };

  // Update drop location from props
  useEffect(() => {
    if (propDrop) {
      setDrop(typeof propDrop === "string" ? propDrop : JSON.stringify(propDrop));
    }
  }, [propDrop]);

  return (
    <div className="w-full max-w-full mx-auto bg-gray-100 m-4 ml-4 mr-4 p-4 rounded-xl flex items-center justify-between">
      
      {/* LEFT SECTION */}
      <div className="flex gap-3">
        
        {/* ICON + LINE */}
        <div className="flex flex-col items-center">
          {/* Orange Circle */}
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>

          {/* Line */}
          <div className="w-[2px] h-8 bg-gray-400"></div>

          {/* Map Icon */}
          <MapPin className="text-gray-600" size={16} />
        </div>

        {/* TEXT */}
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-xs text-gray-500">PICK-UP POINT</p>
            <p className="font-semibold text-gray-800">{pickup}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">DROP-OFF POINT</p>
            <p className="font-semibold text-gray-800">{drop}</p>
          </div>
        </div>
      </div>

      {/* RIGHT SWAP BUTTON */}
      <button
        onClick={handleSwap}
        className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition"
      >
        <ArrowUpDown size={18} />
      </button>
    </div>
  );
}