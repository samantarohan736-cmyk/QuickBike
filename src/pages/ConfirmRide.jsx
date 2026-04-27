import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import { Check } from 'lucide-react';
import { MapPinCheckInside } from 'lucide-react';
import { Clock, MapPin } from "lucide-react";
import LocationSelector from "../components/LocationSelector";

function ConfirmRide() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
    <div className="flex items-center justify-center flex-col">
      <div className="mt-2 ">
        <MapPinCheckInside className="h-12.5 w-13 p-1.5 bg-amber-600 rounded-full font-bold text-2xl"/>
      </div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-2xl font-extrabold mt-1.5 ">Ride Completed</h1>
        <p className="text-gray-700">Thank for Riding With QuickBike Today</p>
      </div>
    </div>



    <div className=" m-4 flex items-center justify-center bg-white">
      <div className="bg-gray-100 rounded-2xl p-6 w-full shadow-sm  ">
        {/* Header */}
        <div className>
          <p className="text-xs font-semibold text-orange-500 tracking-wide">
          TOTAL FARE
        </p>

        {/* Price */}
        <div className="flex items-end gap-2 mt-2">
          <h1 className="text-4xl font-bold text-gray-900">$24.50</h1>
          <span className="text-sm text-gray-500 mb-1">USD</span>
        </div>

        </div>
        

        {/* Breakdown */}
        <div className="mt-6 space-y-3 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Base Fare</span>
            <span className="text-gray-800 font-medium">$5.00</span>
          </div>

          <div className="flex justify-between">
            <span>Distance (12.4 km)</span>
            <span className="text-gray-800 font-medium">$16.20</span>
          </div>

          <div className="flex justify-between">
            <span>Taxes & Fees</span>
            <span className="text-gray-800 font-medium">$3.30</span>
          </div>
        </div>
      </div>
    </div>







    <div className="w-full flex gap-4">
      
      {/* Duration Card */}
      <div className="flex-1 ml-4 bg-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center gap-3">
        <div className="text-orange-600">
          <Clock size={20} />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold tracking-wide">
            DURATION
          </p>
          <p className="text-lg font-bold text-gray-900">
            28 mins
          </p>
        </div>
      </div>

      {/* Distance Card */}
      <div className="flex-1 mr-4 bg-gray-100 rounded-2xl p-4 flex flex-col justify-center items-center gap-3 ">
        <div className="text-orange-600">
          <MapPin size={20} />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-semibold tracking-wide">
            DISTANCE
          </p>
          <p className="text-lg font-bold text-gray-900">
            12.4 km
          </p>
        </div>
      </div>

    </div>

    <LocationSelector 
      pickup={location.state?.pickup} 
      drop={location.state?.drop}
      className="mt-4" 
    />






    <div className="p-5">
      <h2 className="text-xl mb-4">Ride Summary</h2>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Distance: 10km</p>
        <p>Time: 20min</p>
        <p className="font-bold">Total: ₹120</p>
      </div>

      <Button text="Proceed to Payment" onClick={() => navigate("/payment")} />
    </div>
    </>
    
  );
}

export default ConfirmRide;