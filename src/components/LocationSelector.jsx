import { useEffect, useState } from "react";
import { MapPin, ArrowUpDown } from "lucide-react";
import { resolvePlace } from "../utils/location";

// Helper function to format pickup location
const formatPickup = (pickup) => {
  if (!pickup) return "Fetching location...";
  if (typeof pickup === "string") return pickup;
  return "Fetching location...";
};

export default function LocationSelector({ pickup: propPickup, drop: propDrop, className = "" }) {
  const [pickup, setPickup] = useState(formatPickup(propPickup));
  const [drop, setDrop] = useState(propDrop || "Empire State Building, NY");

  // 📍 Get user's current location
  useEffect(() => {
    // If pickup location is passed as prop, use it
    if (propPickup) {
      resolvePlace(propPickup, "Fetching location...").then(setPickup);
      return;
    }

    if (!navigator.geolocation) {
      setPickup("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolvePlace({ lat: latitude, lng: longitude }, "Current location").then(setPickup);
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
      resolvePlace(propDrop, "Drop-off point").then(setDrop);
    }
  }, [propDrop]);

  return (
    <div className={`w-full rounded-2xl bg-gray-100 p-4 ${className}`}>
      <div className="flex items-center justify-between gap-4">
      
      {/* LEFT SECTION */}
      <div className="flex min-w-0 gap-3">
        
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
        <div className="flex min-w-0 flex-col gap-3">
          <div>
            <p className="text-xs text-gray-500">PICK-UP POINT</p>
            <p className="truncate font-semibold text-gray-800">{pickup}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500">DROP-OFF POINT</p>
            <p className="truncate font-semibold text-gray-800">{drop}</p>
          </div>
        </div>
      </div>

      {/* RIGHT SWAP BUTTON */}
      <button
        onClick={handleSwap}
        className="shrink-0 rounded-full bg-gray-200 p-2 transition hover:bg-gray-300"
      >
        <ArrowUpDown size={18} />
      </button>
      </div>
    </div>
  );
}
