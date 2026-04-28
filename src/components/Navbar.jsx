import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserRound, Menu, ArrowLeft } from 'lucide-react';
import { useState } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname || "";
  const isDriverRelated = path.startsWith('/driver') || path === '/registration' || path === '/identity' || path === '/veichleInfo' || path === '/finalStep' || path === '/confirm'|| path === '/select';
  const showBackButton = isDriverRelated;

  return (
    <div className="shadow p-4 flex justify-between items-center bg-white sticky top-0 z-50">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)} 
            className="text-gray-600 hover:text-black transition-colors p-1"
          >
            <ArrowLeft size={24} />
          </button>
        )}
        
        <h1 className={`font-bold text-2xl ${isDriverRelated ? 'text-[#1f1f1f]' : 'text-[#E67E22]-500'}`}>
          QuickBike {isDriverRelated && <span className="text-orange-500">Driver</span>}
        </h1>
      </div>

      {!showBackButton && (
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-black hover:text-orange-600 font-bold">Home</Link>
            <Link to="/driver" className="text-black hover:text-orange-600 font-bold">Become Driver</Link>
            <Link to="/account" className="w-9 h-9 rounded-full bg-orange-200 flex items-center justify-center text-white font-bold">
              <UserRound />
            </Link>
          </div>
          <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            <Menu />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {!showBackButton && menuOpen && (
        <div className="absolute right-0 top-16 mr-7 w-60 bg-white shadow-xl border border-gray-100 rounded-lg flex flex-col p-4 gap-4 z-50">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/driver" onClick={() => setMenuOpen(false)}>Become Driver</Link>
          <Link to="/account" onClick={() => setMenuOpen(false)}>Profile</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
