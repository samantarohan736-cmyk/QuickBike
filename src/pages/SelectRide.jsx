import { useNavigate , useLocation} from "react-router-dom";
import { useState } from "react";
import RideCard from "../components/RideCard";
import LocationSelector from "../components/LocationSelector"
import { Info } from 'lucide-react';
import { Bike, Car, CarTaxiFront } from "lucide-react";

function SelectRide() {

  const navigate = useNavigate();

  const [selectedRide, setSelectedRide] = useState(null);

  const rides = [
  {
    id: 1,
    type: "Bike Taxi",
    price: 120,
    time: "2 mins away",
    description: "Fastest in traffic",
    icon: Bike ,
  },
  {
    id: 2,
    type: "Quick Auto",
    price: 180,
    time: "5 mins away",
    description: "Best for 2 people",
    icon: CarTaxiFront ,
  },
  {
    id: 3,
    type: "Mini Cab",
    price: 250,
    time: "8 mins away",
    description: "Comfort & A/C",
    icon: Car,
  },
];

  return (

<>
    <LocationSelector />


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
            description={ride.description}   // ✅ ADD
            icon={ride.icon}
            isSelected={selectedRide?.id === ride.id}
            onClick={() => setSelectedRide(ride)}
          />
        ))}
      </div>
      {/* Kinetic Precision Pricing */}
      <div className="bg-orange-50 border-2 rounded-2xl border-amber-600 p-5 mt-4 flex flex-row gap-5">
        <div>
          <Info className="bg-amber-600 rounded-full flex items-center justify-center text-white  font-bol" />

        </div>
        <div>
           <h1 className="text-1xl font-extrabold">Kinetic Precision Pricing</h1>
           <p className="text-gray-400 ">fares are higher than usual due to peak morning traffic.Quick Bikes remain 40% faster than cabs in this zone </p>
        </div>
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