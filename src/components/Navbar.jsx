import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Help", to: "/help" },
    { label: "Requirement", to: "/requirment" },
    { label: "AskExpert", to: "/askexpert" },
    { label: "Contact Us", to: "/contactus" },
  ];

  return (
    <div className="sticky top-0 z-40 flex flex-col items-center justify-between gap-3 bg-gradient-to-r from-[#000c40] to-[#607d8b] px-6 py-2 shadow-lg lg:flex-row lg:gap-0">
      <Link to="/" className="bg-gray-500 text-black px-6 py-3 rounded-full">
        <h1 className="text-lg font-semibold">PrimeEdge Capital</h1>
        <p className="text-sm ml-2">Grow With Strategy</p>
      </Link>

      <nav>
        <ul className="flex flex-wrap justify-center gap-2 text-sm font-semibold lg:gap-3 lg:text-lg">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`block cursor-pointer rounded border px-3 py-1 text-black transition-all duration-300 hover:border-black hover:bg-gray-400 hover:shadow-[2px_2px_0px_black] lg:px-6 ${
                  location.pathname === item.to
                    ? "border-black bg-gray-500 shadow-[2px_2px_0px_black]"
                    : "border-transparent"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
