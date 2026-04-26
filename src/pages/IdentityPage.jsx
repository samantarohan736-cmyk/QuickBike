import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ImagePlusIcon, MoveRight } from 'lucide-react';

const IdentityPage = () => {
  const navigate = useNavigate();
  const totalSteps = 4;
  const currentStep = 2; 

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:py-10 md:px-10">
      <div className="w-full md:w-[95%] mx-auto bg-white md:rounded-[50px] p-8 md:p-16 shadow-2xl border border-gray-100">
        
        {/* Step progress indicator */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-extrabold text-[#9A5F1C] uppercase tracking-wide">
              Step 2 of 4
            </p>
            
            {/* Dots navigation */}
            <div className="flex items-center gap-1.5">
              {[...Array(totalSteps)].map((_, index) => (
                <div 
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index + 1 === currentStep 
                      ? 'w-10 bg-[#E67E22]' 
                      : 'w-2 bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Title and subtitle */}
        <h1 className="text-4xl font-[900] leading-tight text-[#1f1f1f] mb-2 max-w-lg">
          Upload your ID card
        </h1>
        <p className="text-[#6B7280] text-lg mb-10 max-w-xl">
          To verify your identity, please upload a clear photo of your Aadhar or Voter ID card.
        </p>

        {/* Upload boxes */}
        <div className="space-y-6">
          {['ID Front', 'ID Back'].map((label) => (
            <div key={label} className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center bg-white hover:border-[#E67E22] transition-colors cursor-pointer group">
              <ImagePlusIcon className="mx-auto mb-2 text-gray-300 group-hover:text-[#E67E22]" size={36} />
              <p className="font-bold text-[#1f1f1f]">{label}</p>
              <p className="text-xs text-gray-400 mt-1 uppercase font-medium">TAP TO UPLOAD</p>
            </div>
          ))}
        </div>

        {/* Action button */}
        <div className="flex justify-center mt-10">
            <button 
              onClick={() => navigate('/veichleInfo')} 
              className="bg-[#E67E22] text-white py-4 rounded-full font-bold text-lg hover:bg-[#d35400] transition-all shadow-lg w-full md:w-80 flex items-center justify-center gap-2"
            >
              Continue 
            </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityPage;