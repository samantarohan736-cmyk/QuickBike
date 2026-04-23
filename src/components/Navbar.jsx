import { Link } from "react-router-dom";
import { UserRound , Menu} from 'lucide-react';
import { useState } from "react";


function Navbar() {
  const [menuOpen,setMenuOpen] = useState(false);
  return (
    <div className="shadow p-4 flex justify-between">
      <h1 className="font-bold text-orange-500 text-2xl">QuickBike</h1>

      <div className="hidden md:flex items-center gap-4 flex-nowrap">
        <Link to="/" className="text-black hover:text-orange-600 font-bold">Home</Link>
        <Link to="/driver" className="text-black hover:text-orange-600 font-bold">Become Driver</Link>
        <Link to = "/profile" className="w-9.5 h-9.5 rounded-full bg-orange-200 flex items-center justify-center text-white  font-bold" >
         <UserRound/>       
        </Link >

      </div>
      
      <button className="md:hidden text-2xl relative bg-white/20 backdrop-blur-md"
      onClick={()=>setMenuOpen(!menuOpen)}
      ><Menu />
      </button>

      {menuOpen && (
        <div className="absolute right-0 mt-10 mr-7 items-center w-60 h-40 bg-gray-900/70 backdrop-blur-3xl text-white rounded-lg shadow-lg flex flex-col p-3 gap-3 justify-between">
          
          <Link to="/"  onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <Link to="/driver" onClick={() => setMenuOpen(false)}>
            Become Driver
          </Link>

          <Link to="/profile" onClick={() => setMenuOpen(false)}>
            Profile
          </Link>

        </div>
      )}
    </div>
  );
}

export default Navbar;