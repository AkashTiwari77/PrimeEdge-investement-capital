import React from 'react'
import Calllogo from "../assets/Calllogo.png";
import Response from "../assets/Response.png";
import Wealth from "../assets/wealth.png";


export default function Feature() {
  return (
   <>
        {/* ── Feature Cards — DESKTOP ── */}
         <div className="hidden lg:block">
           <div className="bg-gradient-to-r from-[#000c40] to-[#607d8b] h-[300px] relative">
             <div className="absolute inset-0 mt-[25px] ml-[420px]">
               <div className="h-[250px] w-[460px] bg-white/20 backdrop-blur-md rounded-2xl transition-all duration-500 bg-transparent relative overflow-hidden hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-300/30">
                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-300/20 opacity-0 hover:opacity-100 transition duration-500"></div>
                 <img
                   src={Calllogo}
                   alt="call logo"
                   className="w-[100px] mt-1 ml-52 transition-all duration-500 hover:scale-110 hover:rotate-3"
                 />
                 <h1 className="text-2xl ml-40 mt-3 text-white">Avaliable 24/7</h1>
                 <p className="text-white ml-8 font-bold">
                   we're here round-the-clock reach out anytime, any day.
                 </p>
                 <br />
                 <button className="text-white ml-44 mb-3 mt-4 border bg-gray-800 rounded py-1 px-2 font-bold transition-all duration-300 relative overflow-hidden hover:bg-gray-400 hover:text-black hover:shadow-[8px_8px_15px_rgba(0,0,0,0.7)]">
                   <span className="relative z-10">Tap here to call</span>
                 </button>
               </div>
             </div>
             <div className="absolute inset-0 mt-[25px] ml-[910px]">
               <div className="h-[250px] w-[470px] bg-white/20 backdrop-blur-md rounded-2xl transition-all duration-500 bg-transparent relative overflow-hidden hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-300/30">
                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition duration-500"></div>
                 <img
                   src={Response}
                   alt="response"
                   className="w-[100px] pt-4 ml-46 transition-all duration-500 hover:scale-110 hover:rotate-3"
                 />
                 <h1 className="text-2xl ml-32 mt-3 text-white">
                   Immedate Response
                 </h1>
                 <p className="text-white ml-2 font-bold">
                   Count on us for fast replies, No Delay! - Just prompt Support
                 </p>
                 <button className="text-white ml-44 mb-3 mt-6 border bg-gray-800 rounded py-1 px-2 font-bold transition-all duration-300 relative overflow-hidden hover:bg-gray-400 hover:text-black hover:shadow-[8px_8px_15px_rgba(0,0,0,0.7)]">
                   <span className="relative z-10">Tap here to chat</span>
                 </button>
               </div>
             </div>
             <div className="absolute inset-0 mt-[25px] ml-[1400px]">
               <div className="h-[250px] w-[470px] bg-white/20 backdrop-blur-md rounded-2xl transition-all duration-500 bg-transparent hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-300/30 relative overflow-hidden">
                 <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-yellow-300/20 opacity-0 hover:opacity-100 transition duration-500"></div>
                 <img
                   src={Wealth}
                   alt="wealth"
                   className="w-[100px] ml-48 transition-all duration-500 hover:scale-110 hover:rotate-3"
                 />
                 <h1 className="text-2xl ml-28 text-white font-bold">
                   Your Wealth Partners
                 </h1>
                 <p className="text-white text-xl ml-16 mt-2 font-semibold">
                   Helping you invest smarter every day.
                 </p>
                 <button className="text-white ml-44 mb-3 mt-11 border bg-gray-800 rounded py-1 px-2 font-bold transition-all duration-300 relative overflow-hidden hover:bg-gray-400 hover:text-black hover:shadow-[8px_8px_15px_rgba(0,0,0,0.7)]">
                   <span className="relative z-10">call partaner's</span>
                 </button>
               </div>
             </div>
           </div>
         </div>
   
         {/* ── Feature Cards — MOBILE ── */}
         <div className="lg:hidden bg-gradient-to-r from-[#000c40] to-[#607d8b] py-8 px-4 flex flex-col gap-6">
           {[
             {
               img: Calllogo,
               alt: "call logo",
               title: "Avaliable 24/7",
               desc: "we're here round-the-clock reach out anytime, any day.",
               btn: "Tap here to call",
               shadow: "hover:shadow-green-300/30",
               grad: "from-green-400/20 to-emerald-300/20",
             },
             {
               img: Response,
               alt: "response",
               title: "Immedate Response",
               desc: "Count on us for fast replies, No Delay! - Just prompt Support",
               btn: "Tap here to chat",
               shadow: "hover:shadow-blue-300/30",
               grad: "from-blue-400/20 to-purple-400/20",
             },
             {
               img: Wealth,
               alt: "wealth",
               title: "Your Wealth Partners",
               desc: "Helping you invest smarter every day.",
               btn: "call partaner's",
               shadow: "hover:shadow-green-300/30",
               grad: "from-green-400/20 to-yellow-300/20",
             },
           ].map(({ img, alt, title, desc, btn, shadow, grad }) => (
             <div
               key={title}
               className={`bg-white/20 backdrop-blur-md rounded-2xl relative overflow-hidden hover:scale-105 hover:-translate-y-2 hover:shadow-2xl ${shadow} transition-all duration-500 p-5 flex flex-col items-center`}
             >
               <div
                 className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${grad} opacity-0 hover:opacity-100 transition duration-500`}
               ></div>
               <img src={img} alt={alt} className="w-20 mb-3" />
               <h1 className="text-xl text-white font-bold text-center">
                 {title}
               </h1>
               <p className="text-white text-sm text-center mt-2 font-bold">
                 {desc}
               </p>
               <button className="text-white mt-4 border bg-gray-800 rounded py-1 px-3 font-bold hover:bg-gray-400 hover:text-black hover:shadow-[8px_8px_15px_rgba(0,0,0,0.7)] transition-all duration-300 relative z-10">
                 {btn}
               </button>
             </div>
           ))}
         </div>
   </>
  )
}
