import React from "react";
import finalyearimage from "../assets/finalyearimage.jpg";

export default function Hero() {
  return (
    <>
      {/* ── Hero Section — DESKTOP ── */}
      <div className="relative hidden lg:block">
        <img src={finalyearimage} alt="hero" className="w-full" />

        <div className="absolute inset-0 flex items-center justify-center mb-[400px] mr-[800px]">
          <div className="text-white text-2xl p-4 text-center rounded-lg shadow-lg">
            {/* ✅ FIX 3: 'text-2lg' is not valid Tailwind — changed to 'text-2xl' */}
            <h1 className="text-4xl font-bold ml-12">
              INVEST SMART.GROW STRONG
            </h1>
            <h2 className="mt-2 text-2xl font-semibold">
              Welcome To Primeedge Capital Solution
            </h2>
            <p className="mt-3 text-3xl">
              We help you make smarter investment decisions with expert guidance
              and trusted strategies.
            </p>
            <button className="mt-4 px-6 py-2 bg-black text-white rounded">
              Learn More
            </button>
          </div>
        </div>

        <div className="absolute flex justify-center inset-0 mr-[1250px] mt-[550px]">
          <div className="h-[150px] w-[500px] border-black space-y-3">
            <h1 className="text-3xl text-white">
              ✔ Trusted Investment Experts
            </h1>
            <h1 className="text-3xl text-white">✔ Registered Advisors</h1>
            <h1 className="text-3xl text-white">✔ 10,000+ Happy Client</h1>
            <h1 className="text-3xl text-white">✔ SEBI Registered Advisors</h1>
          </div>
        </div>

        <div className="absolute flex flex-col justify-center inset-0 mt-[780px] ml-[400px]">
          <h1 className="text-4xl text-white">10K+ Clients</h1>
          <h1 className="text-2xl text-white">Active Clients</h1>
        </div>
        <div className="absolute flex flex-col justify-center inset-0 mt-[780px] ml-[700px]">
          <h1 className="text-4xl text-white">100 Cr+</h1>
          <h1 className="text-white text-2xl">managed</h1>
        </div>
        <div className="absolute flex flex-col justify-center text-white inset-0 mt-[780px] ml-[950px]">
          <h1 className="text-4xl text-white">12+ Years</h1>
          <h1 className="text-2xl">Experience</h1>
        </div>
        <div className="absolute flex flex-col justify-center text-white inset-0 mt-[780px] ml-[1250px]">
          <h1 className="text-4xl text-white">100+ Expert</h1>
          <h1 className="text-2xl">Advisors</h1>
        </div>

        <div className="absolute inset-0 flex items-center justify-end pr-20">
          <form className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-[600px] mb-[150px]">
            <h1 className="text-black text-4xl">Get in Touch</h1>
            <br />
            <label className="text-xl">Name:</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="w-full border p-2 mb-3 rounded text-black font-bold bg-white/50"
            />
            <label className="text-xl">Email:</label>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full border p-2 mb-3 rounded text-black font-bold bg-white/50"
            />
            <label className="text-xl">Phone:</label>
            <input
              type="number"
              placeholder="Enter Phone Number"
              className="w-full border p-2 mb-3 rounded text-black font-bold bg-white/50"
            />
            <label className="text-xl">Requirement:</label>
            {/* ✅ FIX 2: Removed the stray extra <textarea /> that was after the closing tag */}
            <textarea
              rows="3"
              placeholder="Drop Your Message"
              className="w-full border p-2 mb-6 rounded text-black font-bold bg-white/50"
            />
            <button className="w-full p-2 border rounded text-black font-bold bg-white/60 hover:bg-white transition">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
