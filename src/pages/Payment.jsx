import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Payment() {
  const navigate = useNavigate();

  return (
    <div className="p-5">
      <h2 className="text-xl mb-4">Payment</h2>

      <div className="bg-white p-4 rounded-xl shadow">
        <p>Select Payment Method</p>

        <div className="mt-3 space-y-2">
          <p>💳 Card</p>
          <p>📱 UPI</p>
          <p>💼 Wallet</p>
        </div>
      </div>

      <Button text="Pay Now" onClick={() => navigate("/tracking")} />
    </div>
  );
}

export default Payment;