import Button from "../components/Button";

function DriverRegister() {
  return (
    <div className="p-5">
      <h2 className="text-xl mb-4">Become a Driver</h2>

      <input
        className="w-full p-3 border rounded-xl mb-3"
        placeholder="Full Name"
      />

      <input
        className="w-full p-3 border rounded-xl mb-3"
        placeholder="Phone Number"
      />

      <input
        className="w-full p-3 border rounded-xl mb-3"
        placeholder="Vehicle Number"
      />

      <Button text="Submit Application" />
    </div>
  );
}

export default DriverRegister;