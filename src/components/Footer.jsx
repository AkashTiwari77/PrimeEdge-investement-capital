import React from 'react'

export default function Footer() {
  return (
    <>
      {/* ── Footer ── */}
      <footer className="bg-[#3f4a5a] text-gray-300 py-12 px-6 lg:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">
              PrimeEdge Capital Solution
            </h2>
            <p className="text-sm mt-4 leading-6">
              We have a team of highly motivated research analysts who are keen
              to deliver profit driven strategies and safety trading tips for
              customers as per their financial investment needs.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">| Our Services</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Intraday Cash",
                "Premium Cash",
                "Index Future",
                "Index Option Premium",
                "Index Option",
                "Index Future",
                "Premium Option",
                "Intraday Option",
                "Premium Future",
              ].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">| Important Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                "Home",
                "About us",
                "Services",
                "Pricing",
                "Blogs",
                "Ask An Expert",
                "Contact us",
                "Complaint Board",
                "Investor Charter for Research Analyst",
              ].map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">| Official info:</h3>
            <ul className="space-y-4 text-sm">
              <li>plot.No 159 Manish Nagar,Besa Nagpur-440037</li>
              <li>📞 +91 9607176340</li>
              <li>✉️ akashtiwari7117@gmail.com</li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-400 mt-10 border-t border-gray-600 pt-4">
          Copyright © 2025 PrimeEdge capital Solutions. All Rights Reserved
        </div>
      </footer>
    </>
  );
}
