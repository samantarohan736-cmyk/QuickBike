import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock } from 'lucide-react';

const FinalPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Controls success popup visibility
  const totalSteps = 4;
  const currentStep = 4;

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:py-10 md:px-10">
      <div className="w-full md:w-[95%] mx-auto bg-white md:rounded-[50px] p-8 md:p-12 shadow-2xl border border-gray-100">
        
        {/* Step progress indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-extrabold text-[#9A5F1C] uppercase tracking-wide">
              Step 4 of 4
            </p>
            <div className="flex items-center gap-1.5">
              {[...Array(totalSteps)].map((_, index) => (
                <div key={index} className={`h-2 rounded-full transition-all duration-300 ${index + 1 === currentStep ? 'w-10 bg-[#E67E22]' : 'w-2 bg-gray-200'}`} />
              ))}
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold mb-2">Review & Submit</h1>
        <p className="text-gray-500 mb-8">Please confirm your details before submitting your application.</p>

        {/* Review list of completed steps */}
        <div className="space-y-6 mb-10">
          {['Driver\'s License', 'Vehicle Info', 'National ID'].map((item) => (
            <div key={item} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-[#E67E22] font-bold">
                  {item[0]}
                </div>
                <div>
                  <p className="font-bold">{item}</p>
                  <p className="text-xs text-gray-400">Completed</p>
                </div>
              </div>
              <button className="text-[#E67E22] font-bold text-sm">Edit</button>
            </div>
          ))}
        </div>

        {/* Submission agreement */}
        <div className="flex gap-4 mb-8 p-4">
          <input type="checkbox" className="w-6 h-6 accent-[#E67E22]" />
          <p className="text-sm text-gray-600">
            I agree to the QuickBike Partner Agreement and certify all information is accurate.
          </p>
        </div>

        {/* Submit button */}
        <div className="flex flex-col items-center gap-4">
          <button 
            onClick={() => setShowModal(true)} 
            className="bg-[#E67E22] text-white py-4 px-12 rounded-full font-bold text-lg hover:bg-[#d35400] transition-all w-full md:w-80 shadow-lg"
          >
            Submit Application
          </button>
          <p className="flex items-center gap-2 text-xs text-gray-400">
            <Clock size={14} /> Verification usually takes 24-48 hours.
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[30px] p-8 text-center max-w-sm w-full shadow-2xl">
            <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-3">Application Submitted!</h2>
            <p className="text-gray-600 mb-8">The procedure will take 2-3 Working Days.</p>
            
            <button 
              onClick={() => navigate('/')} 
              className="w-full bg-[#1f1f1f] text-white py-3 rounded-full font-bold hover:bg-[#333] transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalPage;