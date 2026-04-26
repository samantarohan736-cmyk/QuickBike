import { useNavigate } from 'react-router-dom';
import { Upload, Bike } from 'lucide-react';
// Make sure car_front.png exists in src/assets/
import carImage from '../assets/car_front.png'; 

const VehiclePage = () => {
  const navigate = useNavigate();
  const totalSteps = 4;
  const currentStep = 3;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:py-10 md:px-10">
      <div className="w-full md:w-[95%] mx-auto bg-white md:rounded-[50px] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
        
        {/* Step progress indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-extrabold text-[#9A5F1C] uppercase tracking-wide">
              Step 3 of 4
            </p>
            <div className="flex items-center gap-1.5">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className={`h-2 rounded-full transition-all duration-300 ${index + 1 === currentStep ? 'w-10 bg-[#E67E22]' : 'w-2 bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold mb-8">Vehicle Information</h1>

        {/* Vehicle visual placeholder */}
        <div className="relative rounded-3xl overflow-hidden mb-10 h-60 bg-gray-100 flex items-center justify-center">
          <img 
            src={carImage} 
            alt="Ride visual" 
            className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-80"
          />
          <div className="absolute inset-0 bg-black/30 flex items-end p-6">
            <h2 className="text-3xl font-bold text-white leading-tight">
              Tell us about your ride
            </h2>
          </div>
        </div>

        {/* Form fields */}
        <div className="space-y-6">
          {/* Vehicle number input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Vehicle Number</label>
            <div className="relative">
              <input type="text" placeholder="e.g. KA 01 AB 1234" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200" />
              <Bike className="absolute right-4 top-4 text-gray-400" />
            </div>
          </div>

          {/* Model input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Model</label>
            <input type="text" placeholder="e.g. Honda Activa" className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200" />
          </div>

          {/* Year select */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Year</label>
            <select className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200">
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>

          {/* RC Document upload */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">RC (Registration Certificate)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center bg-gray-50 hover:border-[#E67E22] transition-colors cursor-pointer group">
              <Upload className="mx-auto mb-2 text-[#E67E22] group-hover:scale-110 transition-transform" />
              <p className="font-bold">Upload Image or PDF</p>
              <p className="text-xs text-gray-400">Max size 5MB (JPG, PNG, PDF)</p>
            </div>
          </div>
        </div>

        {/* Help text */}
        <div className="mt-8 bg-orange-50 p-5 rounded-2xl text-sm text-gray-600 flex gap-3 border border-orange-100">
          <span className="text-orange-500 text-xl">ℹ️</span>
          <p>Ensure the vehicle number and owner name are clearly visible in the RC document to speed up verification.</p>
        </div>

        {/* Navigation button */}
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => navigate('/finalStep')} 
            className="bg-[#E67E22] text-white py-4 px-8 rounded-full font-bold text-lg hover:bg-[#d35400] hover:shadow-xl transition-all w-full md:w-80 shadow-lg"
          >
            Continue to Final Step
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehiclePage;