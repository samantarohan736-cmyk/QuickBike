import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function ConfirmRide() {
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <h2 className="text-xl mb-4">Ride Summary</h2>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Distance: 10km</p>
        <p>Time: 20min</p>
        <p className="font-bold">Total: ₹120</p>
      </div>

      <Button text="Proceed to Payment" onClick={() => navigate("/payment")} />
    </div>
  );
}

export default ConfirmRide;