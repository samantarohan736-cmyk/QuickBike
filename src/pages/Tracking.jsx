import { createElement, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import {
  Bike,
  CalendarClock,
  CircleUserRound,
  MessageSquare,
  Phone,
  ShieldAlert,
} from "lucide-react";

// Leaflet Marker Icon Fix
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function RoutingLayer({ from, to }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !from || !to) return;
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(from.lat, from.lng), L.latLng(to.lat, to.lng)],
      lineOptions: {
        styles: [{ color: "#FF0000", weight: 6, opacity: 0.9 }], 
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
    }).addTo(map);

    const bounds = L.latLngBounds([[from.lat, from.lng], [to.lat, to.lng]]);
    map.fitBounds(bounds, { padding: [50, 50] });

    return () => map.removeControl(routingControl);
  }, [map, from, to]);
  return null;
}

function Tracking() {
  const navigate = useNavigate();
  const location = useLocation();

  const pickupData = location.state?.pickup;
  const price = location.state?.price || "150";
  const source = pickupData?.lat ? pickupData : { lat: 22.5851, lng: 88.4907 }; 
  const destination = { lat: 22.5726, lng: 88.3639 }; 

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-10 flex items-center justify-center font-sans">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl bg-white rounded-[40px] shadow-2xl overflow-hidden ring-1 ring-black/5 min-h-[85vh]">
        
        {/* LEFT: MAP SECTION (Cleaned - Box removed) */}
        <section className="relative flex-1 min-h-[400px] lg:min-h-0 border-b lg:border-b-0 lg:border-r border-slate-100">
          <div className="absolute inset-0 z-0">
            <MapContainer 
              center={[source.lat, source.lng]} 
              zoom={14} 
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
              <RoutingLayer from={source} to={destination} />
              <Marker position={[source.lat, source.lng]} />
              <Marker position={[destination.lat, destination.lng]} />
            </MapContainer>
          </div>

          {/* Arriving Info Overlay */}
          <div className="absolute left-6 top-6 z-10 flex w-[calc(100%-3rem)] max-w-sm items-center justify-between rounded-3xl bg-white/95 px-6 py-5 shadow-xl backdrop-blur-sm">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">Your Trip</p>
              <h2 className="text-xl font-black text-gray-950">Arriving in 4 mins</h2>
            </div>
            <div className="text-right border-l pl-4 border-slate-200">
              <p className="text-2xl font-black text-orange-700">₹{price}</p>
            </div>
          </div>
        </section>

        {/* RIGHT: SIDEBAR */}
        <aside className="w-full lg:w-[420px] bg-white flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            <div className="mb-6">
              <h3 className="text-2xl font-black text-gray-950 tracking-tight">Active Ride</h3>
              <p className="text-sm font-bold text-gray-400">On the way to drop-off</p>
            </div>

            <div className="rounded-[32px] bg-white lg:bg-slate-50 lg:p-6 ring-1 ring-black/5 lg:ring-0 shadow-sm lg:shadow-none">
              <RideDetails />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {/* TARGET changed to DESTINATION */}
              <div className="rounded-3xl bg-cyan-50/50 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Destination</p>
                <p className="mt-1 font-black text-gray-950">Kolkata</p>
              </div>
              <div className="rounded-3xl bg-orange-50/50 p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Fare</p>
                <p className="mt-1 font-black text-orange-700">₹{price}</p>
              </div>
            </div>
          </div>

          <nav className="p-6 bg-cyan-50/30 border-t border-slate-50 grid grid-cols-3 gap-2">
            <NavItem active icon={Bike} label="Ride" onClick={() => navigate("/")} />
            <NavItem icon={CalendarClock} label="Activity" />
            <NavItem icon={CircleUserRound} label="Account" />
          </nav>
        </aside>

      </div>
    </main>
  );
}

function RideDetails() {
  return (
    <div className="flex flex-col gap-6">
      {/* Updated Driver Info: Vikram Das & Honda Shine */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-orange-400 text-2xl font-black text-white shadow-md">
            V
          </div>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-orange-600 px-2.5 py-0.5 text-[10px] font-black text-white ring-2 ring-white">
            4.9
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-2xl font-black text-gray-900 leading-tight">Vikram Das</h3>
          <p className="text-sm font-bold text-gray-400">Honda Shine SP • WB 02 XY 1234</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600">
            <div className="h-4 w-4 rounded-full border-2 border-white/60" />
          </div>
          <span className="text-[9px] font-black uppercase tracking-tighter text-gray-400 text-center mt-1">PRO<br/>DRIVER</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 rounded-full bg-slate-100 py-5 text-base font-bold text-slate-800 transition-all active:scale-95">
          <Phone size={20} className="stroke-[2.5px]" /> Call Driver
        </button>
        <button className="flex items-center justify-center gap-2 rounded-full bg-slate-100 py-5 text-base font-bold text-slate-800 transition-all active:scale-95">
          <MessageSquare size={20} className="stroke-[2.5px]" /> Message
        </button>
      </div>

      <button className="flex w-full items-center justify-center gap-3 rounded-full bg-orange-600 py-5 text-lg font-black text-white shadow-lg shadow-orange-200 transition-all active:scale-[0.98]">
        <ShieldAlert size={22} className="stroke-[2.5px]" /> Safety Center & SOS
      </button>
    </div>
  );
}

function NavItem({ active = false, icon, label, onClick }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-2 transition-all ${active ? "text-orange-600" : "text-gray-400"}`}>
      <div className={`flex h-14 w-14 items-center justify-center rounded-full transition-all ${active ? "bg-white shadow-md ring-1 ring-slate-100" : ""}`}>
        {createElement(icon, { size: 26, className: active ? "stroke-[2.5px]" : "stroke-[2px]" })}
      </div>
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
}

export default Tracking;