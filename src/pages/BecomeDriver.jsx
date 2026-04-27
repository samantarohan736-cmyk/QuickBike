import { useNavigate } from 'react-router-dom';
import { HandCoins, ArrowRight, Clock3, ShieldCheck } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
    <Icon className="text-[#E67E22] w-8 h-8 mb-4" />
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const BecomeDriver = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="flex justify-center py-6 px-4 md:py-10 md:px-10">
        <div className="w-full md:w-[95%] bg-white md:rounded-[50px] p-8 md:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-[#D35400] px-6 py-3 rounded-full font-bold text-sm uppercase mb-10 z-10 relative">
            <HandCoins className="w-5 h-5" /> OPEN FOR REGISTRATION
          </div>
          
          <div className="space-y-6 mb-12 z-10 relative">
            <h1 className="text-[40px] md:text-[64px] font-black leading-[1.1] text-[#1f1f1f]">
              Become a <span className="text-[#E67E22]">QuickBike</span> Rider
            </h1>
            <p className="text-gray-600 text-xl md:text-2xl leading-relaxed max-w-2xl">
              Earn on your own schedule. Start by completing your registration. Join the fastest-growing fleet in the city.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 z-10 relative">
            <FeatureCard icon={Clock3} title="Flexible Hours" description="Be your own boss and ride whenever you want." />
            <FeatureCard icon={HandCoins} title="Quick Payouts" description="Get your earnings deposited daily into your wallet." />
            <FeatureCard icon={ShieldCheck} title="Insured Rides" description="Safety first. All trips are fully insured by us." />
          </div>

          <button onClick={() => navigate('/registration')} className="bg-[#E67E22] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d35400] transition-all flex items-center gap-2 z-10 relative">
            Start Registration <ArrowRight className="w-8 h-8" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default BecomeDriver;