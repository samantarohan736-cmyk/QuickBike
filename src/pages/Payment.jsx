import { createElement } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bike,
  CalendarClock,
  CheckCircle,
  CircleUserRound,
  Menu,
  MessageSquare,
  Phone,
  ShieldAlert,
  UserRound,
} from "lucide-react";

const MAP_API_KEY = ""; // Put your map API key here.

function Payment() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-100 px-3 py-4 sm:px-6 lg:px-10">
      <div
        data-map-key-ready={MAP_API_KEY ? "true" : "false"}
        className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-md flex-col overflow-hidden rounded-4xl bg-cyan-50 shadow-2xl ring-1 ring-black/10 lg:min-h-195 lg:max-w-7xl"
      >
        <header className="flex items-center justify-between bg-cyan-100 px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="rounded-full p-2 text-gray-700 transition hover:bg-white/70">
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-extrabold text-gray-950 lg:text-2xl">
              QuickBike
            </h1>
          </div>

          <div className="hidden items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-gray-700 lg:flex">
            <Bike size={18} className="text-orange-500" />
            Live Ride Tracking
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
            <UserRound className="text-gray-700" size={24} />
          </div>
        </header>

        <section className="grid flex-1 lg:grid-cols-[minmax(0,1fr)_390px]">
          <div className="relative min-h-135 overflow-hidden bg-cyan-200 sm:min-h-155 lg:min-h-0">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.55)_2px,transparent_2px),linear-gradient(rgba(255,255,255,.55)_2px,transparent_2px)] bg-size-[48px_48px] lg:bg-size-[64px_64px]" />
            <div className="absolute inset-0 opacity-70 bg-[linear-gradient(30deg,transparent_0_34%,rgba(255,255,255,.75)_35%_38%,transparent_39%_100%),linear-gradient(145deg,transparent_0_44%,rgba(255,255,255,.75)_45%_48%,transparent_49%_100%)]" />

            <div className="absolute left-1/2 top-5 z-10 flex w-[86%] -translate-x-1/2 items-center justify-between rounded-3xl bg-white/95 px-5 py-4 shadow-xl lg:left-8 lg:top-8 lg:w-90 lg:translate-x-0">
              <div>
                <h2 className="text-lg font-extrabold text-gray-950">
                  Arriving in 4 mins
                </h2>
                <p className="text-sm text-gray-500">2.1 km to your destination</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-orange-700">$12.50</p>
                <p className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                  Fixed Fare
                </p>
              </div>
            </div>

            <div className="absolute left-[7%] top-[27%] h-2 w-[61%] rounded-full bg-orange-500 lg:left-[10%] lg:top-[30%] lg:w-[58%]" />
            <div className="absolute left-[67%] top-[27%] h-[28%] w-[24%] rounded-br-[4rem] rounded-tr-[4rem] border-r-10 border-t-10 border-orange-400 lg:left-[68%] lg:top-[30%] lg:h-[34%] lg:w-[20%] lg:border-r-14 lg:border-t-14" />
            <div className="absolute left-[38%] top-[32%] h-[34%] border-l-[6px] border-dashed border-orange-500 lg:left-[44%] lg:top-[36%] lg:h-[42%] lg:border-l-8" />

            <div className="absolute left-[53%] top-[48%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-gray-950 shadow-lg ring-4 ring-white lg:left-[62%] lg:top-[54%] lg:h-16 lg:w-16">
              <Bike size={26} />
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 rounded-t-4xl bg-white px-6 pb-5 pt-6 shadow-2xl lg:hidden">
              <RideDetails />
            </div>
          </div>

          <aside className="hidden bg-white p-6 shadow-2xl lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-orange-600">
                Driver details
              </p>
              <div className="mt-5 rounded-3xl bg-slate-50 p-5 ring-1 ring-black/5">
                <RideDetails />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-3xl bg-cyan-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Pickup
                  </p>
                  <p className="mt-1 font-extrabold text-gray-950">4 mins</p>
                </div>
                <div className="rounded-3xl bg-orange-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Fare
                  </p>
                  <p className="mt-1 font-extrabold text-orange-700">$12.50</p>
                </div>
              </div>
            </div>

            <nav className="mt-6 grid grid-cols-3 rounded-3xl bg-cyan-50 p-3">
              <NavItem active icon={Bike} label="Ride" onClick={() => navigate("/")} />
              <NavItem
                icon={CalendarClock}
                label="Activity"
                onClick={() => navigate("/activity")}
              />
              <NavItem
                icon={CircleUserRound}
                label="Account"
                onClick={() => navigate("/account")}
              />
            </nav>
          </aside>
        </section>

        <nav className="grid grid-cols-3 bg-cyan-50 px-6 pb-5 pt-4 lg:hidden">
          <NavItem active icon={Bike} label="Ride" onClick={() => navigate("/")} />
          <NavItem
            icon={CalendarClock}
            label="Activity"
            onClick={() => navigate("/activity")}
          />
          <NavItem
            icon={CircleUserRound}
            label="Account"
            onClick={() => navigate("/account")}
          />
        </nav>
      </div>
    </main>
  );
}

function RideDetails() {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-700 to-orange-400 text-2xl font-extrabold text-white">
          BS
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-white">
            4.9
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xl font-extrabold text-gray-950">
            Budi Santoso
          </h3>
          <p className="truncate text-sm text-gray-500">
            Honda Vario - B 4932 KLP
          </p>
        </div>

        <div className="text-center">
          <CheckCircle className="mx-auto fill-orange-500 text-orange-500" size={24} />
          <p className="mt-1 text-[10px] font-bold uppercase leading-3 text-gray-500">
            Pro
            <br />
            Driver
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 rounded-full bg-gray-200 px-4 py-4 font-bold text-gray-800 transition hover:bg-gray-300">
          <Phone size={19} />
          Call Driver
        </button>
        <button className="flex items-center justify-center gap-2 rounded-full bg-gray-200 px-4 py-4 font-bold text-gray-800 transition hover:bg-gray-300">
          <MessageSquare size={19} />
          Message
        </button>
      </div>

      <button
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-3 rounded-full bg-linear-to-r from-orange-700 to-orange-500 px-5 py-4 text-base font-extrabold text-gray-950 shadow-xl shadow-orange-500/20 transition hover:from-orange-800 hover:to-orange-500"
      >
        <ShieldAlert size={20} />
        Safety Center & SOS
      </button>
    </>
  );
}

function NavItem({ active = false, icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${
        active ? "text-orange-500" : "text-gray-400"
      }`}
    >
      <span className={`${active ? "rounded-full bg-white shadow-sm" : ""} p-3`}>
        {createElement(icon, { size: 20 })}
      </span>
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

export default Payment;
