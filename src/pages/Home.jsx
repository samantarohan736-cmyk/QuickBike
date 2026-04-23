import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BottomNav from "../components/BottomNav";
import { History } from 'lucide-react';
import { Ellipsis } from 'lucide-react';
import { Clock, ChevronRight, MoreHorizontal } from "lucide-react";
const Home = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  
  const recentPlaces = [
    {
      title: "Orchard Central",
      address: "181 Orchard Rd, Singapore",
    },
    {
      title: "Marina Bay Sands",
      address: "10 Bayfront Ave, Singapore",
    },
  ];

  return (
    <>
      <div className="p-5 bg-blue-100 m-7.5 rounded-3xl">

        {/* TITLE */}
        <h2 className="text-4xl font-extrabold mb-4">Where to?</h2>

        {/* INPUT */}
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full p-3 border rounded-xl"
          placeholder="Enter destination"
        />

        {/* ⭐ QUICK SELECT SECTION */}
        <div className="flex gap-3 mt-4">

          <button
            onClick={() => setDestination("Home Address")}
            className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium hover:bg-gray-100"
          >
            🏠 Home
          </button>

          <button
            onClick={() => setDestination("Work Address")}
            className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium hover:bg-gray-100"
          >
            💼 Work
          </button>

        </div>

        {/* MAIN BUTTON */}
        <Button
          text="Search Ride"
          onClick={() => {
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
          }}

          className="w-full bg-orange-500 text-white mt-5 py-3"
        />

      </div>

      {/*Next Section*/}

      <div className="p-5 bg-blue-100 m-7.5 rounded-3xl">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Recents</h2>
          <MoreHorizontal className="text-gray-600 cursor-pointer" />
        </div>

        {/* LIST */}
        <div className="space-y-4">
          {recentPlaces.map((place, index) => (

            <div
              key={index}
              onClick={() => setDestination(place.title)}
              className="flex items-center justify-between cursor-pointer"
            >

              {/* LEFT SIDE */}
              <div className="flex items-center gap-3">

                {/* ICON CIRCLE */}
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="text-orange-500" size={18} />
                </div>

                {/* TEXT */}
                <div>
                  <p className="font-medium">{place.title}</p>
                  <p className="text-sm text-gray-500">{place.address}</p>
                </div>

              </div>

              {/* RIGHT ARROW */}
              <ChevronRight className="text-gray-400" />

            </div>
          ))}
        </div>

      </div>

      <section className="bg-orange-100"></section>

      <BottomNav />

    </>
  );
};

export default Home;