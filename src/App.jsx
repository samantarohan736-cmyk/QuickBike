import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelectRide from "./pages/SelectRide";
import ConfirmRide from "./pages/ConfirmRide";
import Payment from "./pages/Payment";
import RideTracking from "./pages/RideTracking";
import DriverRegister from "./pages/DriverRegister";
import Account from "./pages/Account";
import Activity from "./pages/Activity";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <div className="">
      <Navbar />
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<SelectRide />} />
          <Route path="/confirm" element={<ConfirmRide />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/tracking" element={<RideTracking />} />
          <Route path="/driver" element={<DriverRegister />} />
          <Route path="/account" element={<Account />} />
          <Route path="/activity" element={<Activity />} />
        </Routes>
      </div>


    </div>
      
    </>
  );
}

export default App;
