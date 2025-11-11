import Head from 'next/head';
import { useState } from 'react';
import { 
  FaShoppingCart, FaHome, FaBuilding, FaHandshake,
  FaMoneyBillWave, FaExchangeAlt, FaBars, FaTimes
} from 'react-icons/fa';

export default function Landing() {
  const [activeModal, setActiveModal] = useState(null);
  const [cartCount] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);

  const floatingButtons = [
    { id: 'why-ondrive', label: 'Why OneDrive Realty', color: '#8B5CF6', position: { top: '25%', left: '10%' } },
    { id: 'halal-funding', label: 'Halal Funding', color: '#7C3AED', position: { top: '37%', left: '8%' } },
    { id: 'build-2-suit', label: 'Build 2 Suit', color: '#D4AF37', position: { top: '52%', left: '12%' } },
    { id: 'list-property', label: 'List Your Property', color: '#DC2626', position: { bottom: '30%', left: '18%' } },
    { id: 'agent-commission', label: 'Agent 100% Commission', color: '#1F2937', position: { bottom: '10%', left: '41%' } },
    { id: 'cap-ror-reo', label: 'CAP-ROR-REO', color: '#DC2626', position: { top: '25%', right: '10%' } },
    { id: 're-blogs', label: 'R/E BLOGS', color: '#7F1D1D', position: { top: '37%', right: '8%' } },
    { id: '1031-exchange', label: '1031 Exchange', color: '#EC4899', position: { top: '52%', right: '12%' } },
    { id: 'api-leads', label: 'API-LEADS-DFLX', color: '#DB2777', position: { bottom: '30%', right: '15%' } },
  ];

  const products = [
    { title: 'RESIDENTIAL', color: 'border-red-500', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
    { title: 'MARINA', color: 'border-green-500', image: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&q=80' },
    { title: 'AGRICULTURE', color: 'border-blue-600', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80' },
    { title: 'MIX-USE DEVELOPMENT', color: 'border-green-400', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80' },
    { title: 'HIGHRISE BUILDING', color: 'border-blue-400', image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80' },
  ];

  const footerLinks = [
    { label: 'Partners', color: '#8B5CF6' },
    { label: 'Board Members', color: '#166534' },
    { label: 'We Support GF', color: '#1E3A8A' },
    { label: 'Connect With Us', color: '#991B1B' },
    { label: 'License Regulators', color: '#6B21A8' },
    { label: 'Terms & Condition', color: '#92400E' },
    { label: 'Obtain Real Estate', color: '#BE185D' },
  ];

  return (
    <>
      <Head>
        <title>OneDrive Realty - Interactive Hub</title>
      </Head>
      <div className="fixed top-6 right-6 z-50 flex gap-4">
        <button className="relative bg-white rounded-lg p-3 shadow-xl hover:scale-110 transition">
          <FaShoppingCart size={24} className="text-red-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">02</span>
        </button>
        <button onClick={() => setMenuOpen(!menuOpen)} className="bg-white rounded-lg p-3 shadow-xl hover:scale-110 transition">
          <FaBars size={24} className="text-[#1E3A8A]" />
        </button>
      </div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{backgroundImage: "url('/assets/backgrounds/backgrorund.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-300/20 to-blue-500/30"></div>
        {floatingButtons.map((btn) => (
          <button key={btn.id} onClick={() => setActiveModal(btn.id)} className="absolute px-8 py-3 text-white font-bold shadow-2xl hover:scale-110 transition-all duration-300 text-sm whitespace-nowrap" style={{backgroundColor: btn.color, ...btn.position, zIndex: 10, borderRadius: '25px'}}>{btn.label}</button>
        ))}
        <div className="relative z-20">
          {/* Central Logo Image */}
          <div className="flex items-center justify-center">
            <img 
              src="/assets/logos/logomain.png" 
              alt="OneDriveRealty Hub" 
              className="w-[400px] h-auto "
            />
          </div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex items-center gap-12 w-[600px]">
            <div className="text-6xl"></div>
            {/* <div className="bg-white px-8 py-2 rounded-full shadow-lg flex-1 text-center">
              <span className="text-[#1E3A8A] font-bold text-xl">OneDrive</span>
              <span className="text-[#FFD700] font-bold text-xl">Realty</span>
              <span className="text-orange-500 font-bold text-xl">.com</span>
            </div> */}
            <div className="text-6xl"></div>
          </div>
          {/* <div className="relative w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FFD700] p-6 shadow-2xl">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-[#1E3A8A] to-[#2D4A9E] relative flex items-center justify-center overflow-visible">
              <div className="absolute inset-[60px] rounded-full bg-gradient-to-br from-[#E8D5C4] to-[#D4C4B0] shadow-inner"></div>
              <div className="absolute inset-0">
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 bg-white shadow-2xl px-10 py-6 border-4 border-[#1E3A8A] flex flex-col items-center cursor-pointer hover:scale-105 transition" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} onClick={() => setActiveModal('buy')}>
                  <FaHome className="text-[#1E3A8A] text-3xl mb-1" />
                  <span className="text-sm font-bold text-[#1E3A8A]">Buy</span>
                  <span className="text-[10px] text-green-600 font-semibold">Halal Funding</span>
                </div>
                <div className="absolute top-[25%] right-[12%] bg-white shadow-2xl px-10 py-6 border-4 border-[#1E3A8A] flex flex-col items-center cursor-pointer hover:scale-105 transition" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} onClick={() => setActiveModal('lease')}>
                  <FaHandshake className="text-[#1E3A8A] text-3xl mb-1" />
                  <span className="text-sm font-bold text-[#1E3A8A]">Lease</span>
                  <span className="text-[10px] text-blue-600 font-semibold">Data Leads</span>
                </div>
                <div className="absolute right-[8%] top-1/2 -translate-y-1/2 bg-white shadow-2xl px-10 py-6 border-4 border-[#1E3A8A] flex flex-col items-center cursor-pointer hover:scale-105 transition" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} onClick={() => setActiveModal('sell')}>
                  <FaMoneyBillWave className="text-[#1E3A8A] text-3xl mb-1" />
                  <span className="text-sm font-bold text-[#1E3A8A]">Sell</span>
                  <span className="text-[10px] text-red-600 font-semibold">Size for USA</span>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl px-10 py-6 border-4 border-[#1E3A8A] flex flex-col items-center cursor-pointer hover:scale-105 transition z-10" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} onClick={() => setActiveModal('trade')}>
                  <FaExchangeAlt className="text-[#1E3A8A] text-3xl mb-1" />
                  <span className="text-sm font-bold text-[#1E3A8A]">Trade</span>
                  <span className="text-[10px] text-orange-600 font-semibold">Agent License</span>
                </div>
                <div className="absolute left-[8%] top-1/2 -translate-y-1/2 bg-white shadow-2xl px-10 py-6 border-4 border-[#1E3A8A] flex flex-col items-center cursor-pointer hover:scale-105 transition" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} onClick={() => setActiveModal('list')}>
                  <FaBuilding className="text-[#1E3A8A] text-3xl mb-1" />
                  <span className="text-sm font-bold text-[#1E3A8A]">List</span>
                  <span className="text-[10px] text-green-700 font-semibold">Kosher Funding</span>
                </div>
              </div>
              <div className="absolute top-[8%] left-[20%] w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#FFD700] cursor-pointer hover:scale-110 transition"><span className="text-2xl"></span></div>
              <div className="absolute top-[8%] right-[20%] w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#FFD700] cursor-pointer hover:scale-110 transition"><span className="text-2xl"></span></div>
              <div className="absolute bottom-[8%] left-[25%] w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#FFD700] cursor-pointer hover:scale-110 transition"><span className="text-2xl"></span></div>
              <div className="absolute bottom-[8%] right-[25%] w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-[#FFD700] cursor-pointer hover:scale-110 transition"><span className="text-2xl"></span></div>
            </div>
          </div> */}
          {/* <div className="absolute -top-16 left-12 w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white"><div className="w-full h-full flex items-center justify-center text-3xl bg-green-600"></div></div> */}
          {/* <div className="absolute -top-16 right-12 w-16 h-16 rounded-full overflow-hidden shadow-lg border-4 border-white"><div className="w-full h-full flex items-center justify-center text-3xl"></div></div> */}
          {/* <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-lg shadow-xl flex items-center justify-center border-4 border-[#FFD700] cursor-pointer hover:scale-110 transition"><span className="text-4xl"></span></div> */}
        </div>
        <div className="absolute bottom-20 left-20 text-6xl opacity-60"></div>
      </section>
      <section className="py-8 relative min-h-screen flex items-center" style={{ background: 'linear-gradient(135deg, #FFC0CB 0%, #FFB6C1 50%, #FFA0B0 100%)' }}>
        <div className="max-w-6xl mx-auto px-4 w-full">
          {/* Our Products Title */}
          <div className="flex justify-center mb-6">
            <div className="relative bg-[#9B59B6] text-white px-12 py-2 shadow-lg" style={{ borderRadius: '80px' }}>
              <span className="text-xl font-bold">Our Products</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0" style={{ 
                borderLeft: '15px solid transparent',
                borderRight: '15px solid transparent',
                borderTop: '15px solid #9B59B6'
              }}></div>
            </div>
          </div>

          {/* Grid Layout - 3 columns with special structure */}
          <div className="grid grid-cols-3 gap-3">
            {/* Column 1 & 2 Container */}
            <div className="col-span-2 grid gap-3">
              
              {/* Row 1 - Two cards side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-2 shadow-lg border-3 border-red-500 hover:scale-105 transition cursor-pointer">
                  <div className="h-24 rounded-lg mb-1 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={products[0].image} alt="RESIDENTIAL" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-center text-sm font-bold text-[#00AEEF]">RESIDENTIAL</h3>
                </div>

                <div className="bg-white rounded-lg p-2 shadow-lg border-3 border-green-500 hover:scale-105 transition cursor-pointer">
                  <div className="h-24 rounded-lg mb-1 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={products[1].image} alt="MARINA" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-center text-sm font-bold text-[#00AEEF]">MARINA</h3>
                </div>
              </div>

              {/* Row 2 - One wide card (bigger) with left and right padding */}
              <div className="px-6">
                <div className="bg-white rounded-lg p-3 shadow-lg border-3 border-blue-600 hover:scale-105 transition cursor-pointer">
                  <div className="h-28 rounded-lg mb-1 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={products[2].image} alt="AGRICULTURE" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-center text-base font-bold text-[#00AEEF]">AGRICULTURE</h3>
                </div>
              </div>

              {/* Row 3 - Two cards side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white rounded-lg p-2 shadow-lg border-3 border-green-500 hover:scale-105 transition cursor-pointer">
                  <div className="h-24 rounded-lg mb-1 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={products[3].image} alt="MIX-USE DEVELOPMENT" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-center text-xs font-bold text-[#00AEEF] leading-tight">MIX-USE DEVELOPMENT</h3>
                </div>

                <div className="bg-white rounded-lg p-2 shadow-lg border-3 border-gray-400 hover:scale-105 transition cursor-pointer">
                  <div className="h-24 rounded-lg mb-1 overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={products[4].image} alt="HIGHRISE BUILDING" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-center text-xs font-bold text-[#00AEEF] leading-tight">HIGHRISE BUILDING</h3>
                </div>
              </div>
            </div>

            {/* Column 3 - Image with blue text card below */}
            <div className="flex flex-col gap-3">
              <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80" 
                alt="Luxury Homes" 
                className="w-full h-[280px] object-cover rounded-lg shadow-lg"
              />
              
              {/* Blue Text Card */}
              <div className="bg-[#1E5BA8] rounded-lg p-3 shadow-lg text-center">
                <h3 className="text-base font-bold text-[#FFD700] leading-tight">Luxury Homes Exclusive Marketing</h3>
                <p className="text-xs text-white mt-1">&</p>
                <p className="text-base font-bold text-[#FFD700]">Build 2 Suite Plans</p>
              </div>
            </div>
          </div>

          {/* Home Button - Bottom Right */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            className="fixed bottom-8 right-8 w-20 h-20 bg-blue-700 rounded-xl flex items-center justify-center shadow-2xl hover:bg-blue-800 hover:scale-110 transition z-40" 
            aria-label="Scroll to top"
          >
            <FaHome className="text-white text-4xl" />
          </button>
        </div>
      </section>
      <footer className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 py-12 relative">
        <div className="absolute top-8 right-8 text-white text-2xl bg-blue-600 px-6 py-3 rounded-lg shadow-lg">لا إله إلا ٱلله محمد رسول ٱلله</div>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center mb-8"><div className="text-center"><div className="text-white text-sm mb-2">OneDriveRealty.com</div><div className="w-40 h-40 mx-auto bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#FFD700]"><div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#234290] to-[#1E3A8A] rounded-full overflow-hidden"><div className="absolute top-0 w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#439539' }}><span className="text-3xl"></span></div><div className="absolute bottom-0 w-20 h-20 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D12E34' }}><span className="text-3xl text-white"></span></div><div className="absolute top-4 right-4 text-3xl" style={{ color: '#EFBB49' }}></div><div className="absolute bottom-4 left-4 text-2xl text-white"></div><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-12 h-12 flex items-center justify-center z-20 shadow-lg"><span className="text-[#1E3A8A] font-bold text-xl">GF</span></div></div></div></div></div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">{footerLinks.map((link, index) => (<button key={index} className="px-4 py-3 rounded-full text-white font-semibold shadow-lg hover:scale-105 transition text-sm" style={{ backgroundColor: link.color }}>{link.label}</button>))}</div>
          <div className="text-center"><div className="inline-block bg-red-600 text-white px-8 py-4 rounded-full shadow-lg relative"><p className="font-bold">2024 Copyrights OneDriveRealty</p><p className="text-sm">All Rights Reserved</p><div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[15px] border-l-transparent border-r-transparent border-b-red-600"></div></div></div>
        </div>
      </footer>
      {activeModal && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setActiveModal(null)}><div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-fadeIn" onClick={(e) => e.stopPropagation()}><div className="flex justify-between items-center mb-6"><h2 className="text-3xl font-bold text-[#1E3A8A] capitalize">{activeModal.replace(/-/g, ' ')}</h2><button onClick={() => setActiveModal(null)} className="text-gray-500 hover:text-gray-700 transition"><FaTimes size={24} /></button></div><div className="text-gray-700"><p>Content for {activeModal} will be displayed here.</p><p className="mt-4">This modal will contain detailed information about this section.</p></div></div></div>)}
    </>
  );
}
