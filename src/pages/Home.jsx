import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";
import {
  Bike,
  BriefcaseBusiness,
  ChevronRight,
  Clock,
  Home as HomeIcon,
  MapPin,
  Navigation,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const mapBackground = {
  backgroundImage: `
    radial-gradient(circle at 14% 20%, rgba(236, 72, 153, 0.16), transparent 18%),
    radial-gradient(circle at 82% 18%, rgba(6, 182, 212, 0.22), transparent 24%),
    radial-gradient(circle at 52% 72%, rgba(249, 115, 22, 0.16), transparent 28%),
    linear-gradient(118deg, transparent 0 12%, rgba(255,255,255,0.78) 12% 13.1%, transparent 13.1% 100%),
    linear-gradient(28deg, transparent 0 24%, rgba(255,255,255,0.9) 24% 25.2%, transparent 25.2% 100%),
    linear-gradient(153deg, transparent 0 34%, rgba(251,146,60,0.3) 34% 35%, transparent 35% 100%),
    linear-gradient(65deg, transparent 0 56%, rgba(14,165,233,0.18) 56% 57%, transparent 57% 100%),
    linear-gradient(90deg, rgba(15,23,42,0.052) 1px, transparent 1px),
    linear-gradient(rgba(15,23,42,0.052) 1px, transparent 1px),
    linear-gradient(135deg, #e8fbff 0%, #fff7ed 48%, #f8fafc 100%)
  `,
  backgroundSize: "auto, auto, auto, auto, auto, auto, auto, 46px 46px, 46px 46px, auto",
};

const recentPlaces = [
  {
    title: "Orchard Central",
    address: "181 Orchard Rd, Singapore",
    eta: "8 min",
  },
  {
    title: "Marina Bay Sands",
    address: "10 Bayfront Ave, Singapore",
    eta: "14 min",
  },
];

const quickPlaces = [
  {
    label: "Home",
    value: "Home Address",
    icon: HomeIcon,
  },
  {
    label: "Work",
    value: "Work Address",
    icon: BriefcaseBusiness,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");

  const handleSearchRide = () => {
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
          state: {
            pickup,
            drop: destination,
          },
        });
      },
      () => {
        alert("Location permission denied");
      }
    );
  };

  return (
    <main className="relative min-h-screen overflow-hidden pb-32 text-slate-950" style={mapBackground}>
      <div className="absolute -left-20 top-28 h-56 w-56 rounded-full bg-orange-300/25 blur-3xl" />
      <div className="absolute -right-24 top-8 h-72 w-72 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-20 h-144 w-64 rotate-18 rounded-[4rem] border-34 border-pink-200/90 border-r-transparent border-b-transparent" />
      <div className="pointer-events-none absolute -right-16 top-36 h-136 w-56 rotate-[-14deg] rounded-[4rem] border-30 border-fuchsia-200/85 border-l-transparent border-t-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-[54%] h-8 rotate-[-24deg] bg-orange-200/55 shadow-[0_0_0_10px_rgba(255,255,255,0.52)]" />
      <div className="pointer-events-none absolute left-[15%] top-0 h-[120%] w-5 rotate-35 rounded-full bg-white/62" />
      <div className="pointer-events-none absolute right-[22%] top-0 h-[120%] w-4 rotate-[-31deg] rounded-full bg-white/52" />

      <section className="relative mx-auto flex w-full max-w-330 flex-col gap-11 px-5 pt-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:px-3 xl:px-2">
        <div className="overflow-hidden rounded-4xl border border-white/70 bg-white/80 p-5 shadow-2xl shadow-cyan-900/10 backdrop-blur md:p-7 lg:min-h-107.5 lg:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-orange-700">
                <Navigation size={14} />
                Quick pickup nearby
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight text-slate-950 md:text-6xl">
                Where to?
              </h1>
            </div>
            <div className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-slate-950 text-orange-400 shadow-xl md:flex">
              <Bike size={42} />
            </div>
          </div>

          <div className="mt-7 rounded-[1.55rem] bg-slate-950 p-1 shadow-inner">
            <div className="flex items-center gap-3 rounded-[1.35rem] bg-white px-4 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                <MapPin size={22} />
              </span>
              <input
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base font-bold text-slate-900 outline-none placeholder:text-slate-400"
                placeholder="Enter destination"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {quickPlaces.map((place) => (
              <button
                key={place.label}
                onClick={() => setDestination(place.value)}
                className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-extrabold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-orange-50 hover:text-orange-700"
              >
                <place.icon size={17} />
                {place.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleSearchRide}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-orange-600 to-orange-400 py-4 text-lg font-black text-slate-950 shadow-xl shadow-orange-500/25 transition hover:-translate-y-0.5 hover:from-orange-700 hover:to-orange-400"
          >
            Search Ride
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="grid gap-5">
          <div className="rounded-4xl border border-white/70 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-900/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-orange-400 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-950">
                  <Sparkles size={14} />
                  Active deal
                </span>
                <h2 className="mt-4 text-3xl font-black">QuickBike Pro</h2>
                <p className="mt-2 text-sm font-semibold text-white/60">
                  Available nearby, estimated pickup in 3 min.
                </p>
              </div>
              <p className="rounded-2xl bg-white px-4 py-3 text-2xl font-black text-orange-600">
                ₹4.50
              </p>
            </div>

            <button
              onClick={() => setDestination("Nearest QuickBike Pro pickup")}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-black text-slate-950 transition hover:bg-orange-100"
            >
              Quick Book
              <Bike size={19} />
            </button>
          </div>

          <div className="rounded-4xl border border-white/70 bg-white/82 p-5 shadow-xl shadow-cyan-900/10 backdrop-blur">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-orange-600">
                  Recent routes
                </p>
                <h2 className="text-xl font-black text-slate-950">Pick up where you left off</h2>
              </div>
              <Clock className="text-slate-400" size={22} />
            </div>

            <div className="space-y-3">
              {recentPlaces.map((place) => (
                <button
                  key={place.title}
                  onClick={() => setDestination(place.title)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:ring-orange-200"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <Clock size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-black text-slate-900">
                        {place.title}
                      </span>
                      <span className="block truncate text-sm font-medium text-slate-500">
                        {place.address}
                      </span>
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-cyan-50 px-3 py-1 text-xs font-black text-cyan-700">
                    {place.eta}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-4xl bg-linear-to-br from-orange-500 via-orange-400 to-amber-300 p-5 text-slate-950 shadow-xl shadow-orange-500/20">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80">
                <ShieldCheck size={24} />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-800/70">
                  Weekly streak
                </p>
                <h3 className="text-2xl font-black">Get 30% off your next ride</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <BottomNav currentPage="ride" />
    </main>
  );
};

export default Home;
