import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import RideCard from "../components/RideCard";
import {
  Bike,
  Car,
  CarTaxiFront,
  CreditCard,
  MapPin,
  Navigation,
  ShieldCheck,
  Edit2,
} from "lucide-react";

function SelectRide() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRide, setSelectedRide] = useState(null);
  const [pickupAddress, setPickupAddress] = useState("Fetching location...");

  // SelectRide-এ আসা অরিজিনাল কোঅর্ডিনেটগুলো রিভল্ভ করা
  const pickup = location.state?.pickup;
  const drop = location.state?.drop;

  const rides = [
    { id: 1, type: "Bike Taxi", price: 120, time: "2 mins away", description: "Fastest in traffic", icon: Bike },
    { id: 2, type: "Quick Auto", price: 180, time: "5 mins away", description: "Best for 2 people", icon: CarTaxiFront },
    { id: 3, type: "Mini Cab", price: 250, time: "8 mins away", description: "Comfort & A/C", icon: Car },
  ];

  useEffect(() => {
    const fetchAddress = async () => {
      if (typeof pickup === "string") {
        setPickupAddress(pickup);
        return;
      }
      if (pickup?.lat && pickup?.lng) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pickup.lat}&lon=${pickup.lng}&accept-language=en`
          );
          const data = await response.json();
          const name = data.display_name.split(",")[0];
          setPickupAddress(name || "Pin Location");
        } catch (error) {
          setPickupAddress(`Lat: ${pickup.lat.toFixed(4)}, Lng: ${pickup.lng.toFixed(4)}`);
        }
      } else {
        setPickupAddress("Current Location");
      }
    };
    fetchAddress();
  }, [pickup]);

  const formatDropPlace = (place) => {
    if (typeof place === "string") return place;
    if (place?.lat !== undefined && place?.lng !== undefined) {
      return `Lat: ${place.lat.toFixed(4)}, Lng: ${place.lng.toFixed(4)}`;
    }
    return "Selected Location";
  };

  // এই ফাংশনটা এখন Tracking পেজে সব ডেটা পাঠাবে
  const handleConfirmRide = () => {
    if (selectedRide && pickup && drop) {
      navigate("/tracking", {
        state: {
          pickup: pickup,        // Lat, Lng অবজেক্ট পাঠাচ্ছি
          drop: drop,            // Lat, Lng অবজেক্ট পাঠাচ্ছি
          price: selectedRide.price,
          rideType: selectedRide.type
        }
      });
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-[420px_1fr]">
        
        {/* Left Section: Trip Summary */}
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">Your trip</p>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-950 sm:text-4xl">Choose your ride</h1>
            </div>
            <div className="hidden rounded-full bg-orange-100 p-3 text-orange-600 sm:block">
              <Navigation size={24} />
            </div>
          </div>

          <div className="mt-7 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <div className="grid gap-5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-4 min-w-0">
                  <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-orange-500" />
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Pick-up point</p>
                    <p className="mt-1 truncate text-base font-semibold text-gray-900">{pickupAddress}</p>
                  </div>
                </div>
                <button onClick={() => navigate(-1)} className="flex items-center gap-1 shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-orange-600 shadow-sm ring-1 ring-orange-200 transition hover:bg-orange-50">
                  <Edit2 size={12} /> Edit
                </button>
              </div>
              <div className="ml-1 h-8 w-px bg-slate-300" />
              <div className="flex gap-4">
                <MapPin className="shrink-0 text-gray-500" size={20} />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Drop-off point</p>
                  <p className="mt-1 truncate text-base font-semibold text-gray-900">{formatDropPlace(drop)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl bg-gray-950 p-4 text-white">
              <p className="text-sm text-white/60">Fastest pickup</p>
              <p className="mt-1 text-2xl font-bold">{selectedRide?.time || "2 mins away"}</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-orange-900 ring-1 ring-orange-100">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} />
                <p className="text-sm font-semibold">Verified drivers</p>
              </div>
              <p className="mt-2 text-sm text-orange-800/70">Live tracking and secure ride details included.</p>
            </div>
          </div>
        </section>

        {/* Right Section: Ride Options */}
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">Available now</p>
              <h2 className="mt-1 text-2xl font-extrabold text-gray-950">Pick a vehicle</h2>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className={`rounded-2xl transition ${
                  selectedRide?.id === ride.id ? "bg-orange-500/10 ring-2 ring-orange-500" : "ring-1 ring-transparent"
                }`}
              >
                <RideCard
                  type={ride.type}
                  price={ride.price}
                  time={ride.time}
                  description={ride.description}
                  icon={ride.icon}
                  isSelected={selectedRide?.id === ride.id}
                  onClick={() => setSelectedRide(ride)}
                />
              </div>
            ))}
          </div>

          {/* Main Booking Button */}
          <button
            disabled={!selectedRide}
            onClick={handleConfirmRide}
            className="mt-6 w-full rounded-full bg-orange-500 py-4 text-lg font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
          >
            Confirm Ride - {selectedRide ? `Rs. ${selectedRide.price}` : "Select a ride"}
          </button>
        </section>
      </div>
    </main>
  );
}

export default SelectRide;