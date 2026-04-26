import { Bike } from 'lucide-react';


function RideCard({ type, price, time, description, onClick , icon: Icon }) {
  return (
    <div
      onClick={onClick}
      className="group relative flex items-center justify-between overflow-hidden p-4 rounded-2xl shadow cursor-pointer transition bg-white hover:bg-gray-50"
    >
      {/* ORANGE STRIP (ONLY ON HOVER) */}
      <div className="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-l-xl 
                      scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>

      {/* LEFT SECTION */}
      <div className="flex items-center gap-4">
        {/* ICON */}
        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">
          <Icon />
        </div>

        {/* TEXT */}
        <div>
          <h3 className="font-semibold text-lg">{type}</h3>
          <p className="text-sm text-gray-500">
            {description} • {time}
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="text-right">
        <h3 className="font-bold text-lg">₹{price}</h3>

        {type === "Bike Taxi" && (
          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            RECOMMENDED
          </span>
        )}
      </div>
    </div>
  );
}

export default RideCard;