import React from 'react'

export default function Team() {
  return (
    <>
      {/* Team — DESKTOP */}
      <div className="hidden lg:block ml-[900px] mr-40 mt-12">
        <h1 className="text-white text-5xl">Leading a Top Investment</h1>
        <h1 className="text-white text-5xl">Management Team</h1>
        <p className="text-white mt-6 text-2xl">
          At PrimeEdge Solution Advisory Services, we use a clear and
          well-planned approach to guide traders and investors. Our goal is to
          help you make smart and profitable financial decisions. We focus on
          keeping everything accurate, transparent, and easy to understand at
          every step.
        </p>
      </div>
      {/* Team — MOBILE */}
      <div className="lg:hidden px-6 mt-10">
        <h1 className="text-white text-2xl font-bold">
          Leading a Top Investment Management Team
        </h1>
        <p className="text-white mt-4 text-base">
          At PrimeEdge Solution Advisory Services, we use a clear and
          well-planned approach to guide traders and investors. Our goal is to
          help you make smart and profitable financial decisions. We focus on
          keeping everything accurate, transparent, and easy to understand at
          every step.
        </p>
      </div>
    </>
  );
}
