import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import RideCard from "../components/RideCard";
import {
  Bike,
  Car,
  CarTaxiFront,
  CreditCard,
  Info,
  MapPin,
  Navigation,
  ShieldCheck,
} from "lucide-react";

function SelectRide() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRide, setSelectedRide] = useState(null);

  const rides = [
    {
      id: 1,
      type: "Bike Taxi",
      price: 120,
      time: "2 mins away",
      description: "Fastest in traffic",
      icon: Bike,
    },
    {
      id: 2,
      type: "Quick Auto",
      price: 180,
      time: "5 mins away",
      description: "Best for 2 people",
      icon: CarTaxiFront,
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

  const pickup = location.state?.pickup || "Current location";
  const drop = location.state?.drop || "Select destination";

  const formatPlace = (place) => {
    if (typeof place === "string") return place;
    if (place?.lat !== undefined && place?.lng !== undefined) {
      return `Lat: ${place.lat.toFixed(4)}, Lng: ${place.lng.toFixed(4)}`;
    }
    return "Current location";
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr] xl:grid-cols-[420px_1fr]">
        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6 lg:sticky lg:top-24 lg:self-start">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
                Your trip
              </p>
              <h1 className="mt-2 text-3xl font-extrabold text-gray-950 sm:text-4xl">
                Choose your ride
              </h1>
            </div>
            <div className="hidden rounded-full bg-orange-100 p-3 text-orange-600 sm:block">
              <Navigation size={24} />
            </div>
          </div>

          <div className="mt-7 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
            <div className="grid gap-5">
              <div className="flex gap-4">
                <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-orange-500" />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Pick-up point
                  </p>
                  <p className="mt-1 truncate text-base font-semibold text-gray-900">
                    {formatPlace(pickup)}
                  </p>
                </div>
              </div>

              <div className="ml-1 h-8 w-px bg-slate-300" />

              <div className="flex gap-4">
                <MapPin className="shrink-0 text-gray-500" size={20} />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Drop-off point
                  </p>
                  <p className="mt-1 truncate text-base font-semibold text-gray-900">
                    {formatPlace(drop)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl bg-gray-950 p-4 text-white">
              <p className="text-sm text-white/60">Fastest pickup</p>
              <p className="mt-1 text-2xl font-bold">
                {selectedRide?.time || "2 mins away"}
              </p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-orange-900 ring-1 ring-orange-100">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} />
                <p className="text-sm font-semibold">Verified drivers</p>
              </div>
              <p className="mt-2 text-sm text-orange-800/70">
                Live tracking and secure ride details included.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-gray-400">
                Available now
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-gray-950">
                Pick a vehicle
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              Prices include estimated taxes and fees.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className={`rounded-2xl transition ${
                  selectedRide?.id === ride.id
                    ? "bg-orange-500/10 ring-2 ring-orange-500"
                    : "ring-1 ring-transparent"
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

          <div className="mt-5 flex gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white">
              <Info size={20} />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-950">
                Kinetic Precision Pricing
              </h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Fares are higher than usual because of peak morning traffic.
                Quick Bikes remain 40% faster than cabs in this zone.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-700 shadow-sm">
                <CreditCard size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment method</p>
                <p className="font-semibold text-gray-900">Visa .... 4242</p>
              </div>
            </div>
            <button className="self-start rounded-full px-4 py-2 text-sm font-bold text-orange-600 transition hover:bg-orange-100 sm:self-auto">
              Change
            </button>
          </div>

          <button
            disabled={!selectedRide}
            onClick={() => navigate("/confirm", { state: location.state })}
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
