import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SelectRide from "./pages/SelectRide";
import Payment from "./pages/Payments";
import Tracking from "./pages/Tracking";
import Account from "./pages/Account";
import Activity from "./pages/Activity";
import Navbar from "./components/Navbar";
import RegistrationPage from "./pages/RegistrationPage";
import BecomeDriver from "./pages/BecomeDriver";
import IdentityPage from "./pages/IdentityPage";
import Veichle from "./pages/Veichle";
import FinalPage from "./pages/FinalPage";

function App() {
  return (
    <>
    <div className="">
      <Navbar />
      <div >
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/select" element={<SelectRide />} />
          <Route path="/confirm" element={<Payment />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/identity" element={<IdentityPage />} />
          <Route path="/driver" element={<BecomeDriver />} />
          <Route path="/veichleInfo" element={<Veichle />} />

          
          <Route path="/account" element={<Account />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/finalStep" element={<FinalPage/>}/>
        </Routes>
      </div>


    </div>
      
    </>
  );
}

export default App;
