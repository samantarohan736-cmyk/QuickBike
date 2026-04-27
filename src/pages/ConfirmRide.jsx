import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  MapPinCheckInside,
  Star,
  WalletCards,
} from "lucide-react";
import LocationSelector from "../components/LocationSelector";

function ConfirmRide() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPayment, setSelectedPayment] = useState("wallet");

  const fareBreakdown = [
    { label: "Base Fare", value: "$5.00" },
    { label: "Distance (12.4 km)", value: "$16.20" },
    { label: "Taxes & Fees", value: "$3.30" },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_0.9fr]">
        <section className="space-y-5">
          <div className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5 sm:p-8">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg shadow-orange-600/20">
              <MapPinCheckInside size={30} />
            </div>
            <h1 className="mt-4 text-2xl font-extrabold text-gray-950 sm:text-3xl">
              Ride Completed
            </h1>
            <p className="mt-2 text-sm text-gray-600 sm:text-base">
              Thank you for riding with QuickBike today.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-orange-500">
              Total Fare
            </p>

            <div className="mt-2 flex items-end gap-2">
              <h2 className="text-4xl font-extrabold text-gray-950 sm:text-5xl">
                $24.50
              </h2>
              <span className="mb-1 text-sm font-semibold text-gray-500">USD</span>
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-600">
              {fareBreakdown.map((item) => (
                <div key={item.label} className="flex justify-between gap-4">
                  <span>{item.label}</span>
                  <span className="font-semibold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Duration
                  </p>
                  <p className="text-xl font-extrabold text-gray-950">28 mins</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    Distance
                  </p>
                  <p className="text-xl font-extrabold text-gray-950">12.4 km</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5">
            <LocationSelector pickup={location.state?.pickup} drop={location.state?.drop} />
          </div>
        </section>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-orange-500 text-2xl font-extrabold text-white">
                M
                <span className="absolute -bottom-1 -right-1 rounded-full bg-orange-700 px-2 py-0.5 text-[10px] font-extrabold text-white ring-2 ring-white">
                  PRO
                </span>
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-extrabold text-gray-950">Rate Marcus</h2>
                <p className="text-sm leading-5 text-gray-500">
                  How was your trip with QuickBike Pro?
                </p>
                <div className="mt-2 flex gap-1 text-orange-700">
                  {[1, 2, 3, 4].map((star) => (
                    <Star key={star} size={20} fill="currentColor" />
                  ))}
                  <Star size={20} className="text-gray-300" />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 sm:p-6">
            <h2 className="text-lg font-extrabold text-gray-950">Payment Method</h2>

            <div className="mt-4 space-y-3">
              <button
                onClick={() => setSelectedPayment("wallet")}
                className={`flex w-full items-center justify-between gap-4 rounded-3xl p-4 text-left transition ${
                  selectedPayment === "wallet"
                    ? "border-2 border-orange-700 bg-orange-50/40 hover:bg-orange-50"
                    : "border-2 border-transparent bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      selectedPayment === "wallet"
                        ? "bg-orange-700 text-white"
                        : "bg-slate-200 text-gray-700"
                    }`}
                  >
                    <WalletCards size={22} />
                  </span>
                  <span>
                    <span className="block font-extrabold text-gray-900">
                      QuickBike Wallet
                    </span>
                    <span className="text-xs text-gray-500">Balance: $42.10</span>
                  </span>
                </div>
                {selectedPayment === "wallet" ? (
                  <CheckCircle2 className="shrink-0 text-orange-700" size={22} />
                ) : (
                  <span className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300" />
                )}
              </button>

              <button
                onClick={() => setSelectedPayment("visa")}
                className={`flex w-full items-center justify-between gap-4 rounded-3xl p-4 text-left transition ${
                  selectedPayment === "visa"
                    ? "border-2 border-orange-700 bg-orange-50/40 hover:bg-orange-50"
                    : "border-2 border-transparent bg-slate-50 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      selectedPayment === "visa"
                        ? "bg-orange-700 text-white"
                        : "bg-slate-200 text-gray-700"
                    }`}
                  >
                    <CreditCard size={22} />
                  </span>
                  <span>
                    <span className="block font-extrabold text-gray-900">
                      Visa .... 4242
                    </span>
                    <span className="text-xs text-gray-500">Expires 12/26</span>
                  </span>
                </div>
                {selectedPayment === "visa" ? (
                  <CheckCircle2 className="shrink-0 text-orange-700" size={22} />
                ) : (
                  <span className="h-5 w-5 shrink-0 rounded-full border-2 border-gray-300" />
                )}
              </button>
            </div>

            <button
              onClick={() => navigate("/payment")}
              className="mt-8 w-full rounded-full bg-gradient-to-r from-orange-700 to-orange-500 py-4 text-base font-extrabold text-gray-950 shadow-xl shadow-orange-500/20 transition hover:from-orange-800 hover:to-orange-500 sm:text-lg"
            >
              Pay $24.50 with {selectedPayment === "wallet" ? "Wallet" : "Visa"}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              By clicking Pay Now, you agree to our{" "}
              <span className="underline">Terms of Service.</span>
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default ConfirmRide;
