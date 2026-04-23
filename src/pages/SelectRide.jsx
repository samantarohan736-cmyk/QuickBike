import { useNavigate , useLocation} from "react-router-dom";
import { useState } from "react";
import GeoLocation from "../components/GeoLocation";
import RideCard from "../components/RideCard";

function SelectRide() {
const location = useLocation();
const state = location.state || {};

  const [pickup, setPickup] = useState(state?.pickup || null);
  const [drop, setDrop] = useState(state?.drop ||"No destination");

  

  const handleSwap = () => {
    setPickup(drop);
    setDrop(pickup);
  };

  const navigate = useNavigate();

  const [selectedRide, setSelectedRide] = useState(null);

  const rides = [
  {
    type: "Bike Taxi",
    price: 120,
    time: "2 mins away",
    description: "Fastest in traffic",
  },
  {
    type: "Quick Auto",
    price: 180,
    time: "5 mins away",
    description: "Best for 2 people",
  },
  {
    type: "Mini Cab",
    price: 250,
    time: "8 mins away",
    description: "Comfort & A/C",
  },
];

  return (

<>

    <div className="p-5">

      {/* LOCATION UI */}
      <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">

        <div className="space-y-3">

          {/* PICKUP */}
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 bg-orange-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-400 text-xs">PICK-UP POINT</p>
              <h2 className="font-semibold">
                Current Location: <GeoLocation />
              </h2>
            </div>
          </div>

          {/* LINE */}
          <div className="ml-1 h-6 border-l-2 border-gray-300"></div>

          {/* DROP */}
          <div className="flex items-start gap-3">
            <div className="w-3 h-3 border-2 border-gray-500 rounded-full mt-2"></div>
            <div>
              <p className="text-gray-400 text-xs">DROP-OFF POINT</p>
              <h2 className="font-semibold">{drop}</h2>
            </div>
          </div>

        </div>

        {/* SWAP BUTTON */}
        <button
          onClick={handleSwap}
          className="bg-gray-200 p-3 rounded-full"
        >
          ↕
        </button>

      </div>

    </div>
    <div className="p-5 min-h-screen bg-gray-100">

      {/* TITLE */}
      <h2 className="mb-4 text-4xl font-extrabold">Choose your ride</h2>

      {/* RIDE LIST */}
      <div className="space-y-4">
        {rides.map((ride) => (
          <RideCard
            key={ride.id}
            type={ride.type}
            price={ride.price}
            time={ride.time}
            isSelected={selectedRide?.id === ride.id}
            onClick={() => setSelectedRide(ride)}
          />
        ))}
      </div>

      {/* PAYMENT */}
      <div className="mt-6 flex justify-between items-center">
        <p className="text-gray-600">Visa •••• 4242</p>
        <button className="text-orange-500">Change</button>
      </div>

      {/* CONFIRM BUTTON */}
      <button
        disabled={!selectedRide}
        onClick={() => navigate("/confirm")}
        className="w-full mt-6 bg-orange-500 text-white py-4 rounded-full text-lg disabled:bg-gray-300"
      >
        Confirm Ride →
      </button>

    </div>
    </>
  );
}

export default SelectRide;