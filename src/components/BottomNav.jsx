import { Bike, Clock, User } from "lucide-react";

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 w-full  px-4 pb-4">
      
      <div className="bg-white rounded-3xl shadow-lg flex justify-around items-center py-3">
        
        {/* ACTIVE TAB */}
        <div className="flex flex-col items-center text-orange-500">
          <div className="bg-orange-100 p-2 rounded-full">
            <Bike size={20} />
          </div>
          <span className="text-sm mt-1">Ride</span>
        </div>

        {/* NORMAL TAB */}
        <div className="flex flex-col items-center text-gray-500">
          <Clock size={20} />
          <span className="text-sm mt-1">Activity</span>
        </div>

        {/* NORMAL TAB */}
        <div className="flex flex-col items-center text-gray-500">
          <User size={20} />
          <span className="text-sm mt-1">Account</span>
        </div>

      </div>
    </div>
  );
};

export default BottomNav;