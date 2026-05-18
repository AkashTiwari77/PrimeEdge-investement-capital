import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import AboutUs from "./AboutUs";
import Helppage from "./Helppage.jsx";
import Requirment from "./Requirment.jsx"
import Askexpert from "./Askexpert.jsx";
import ContactUs from "./Contactus.jsx";
import FreeConsultationPage from "./FreeConsultation.jsx";
import Learnmore from "./learnmore.jsx";
import Begineer  from "./begineer.jsx";
import Middle from "./middle.jsx";
import Pro from "./pro.jsx"
import AdminDashboard from "./AdminDashboard.jsx"
import Navbar from "./components/Navbar.jsx";

function AppRoutes() {
  const location = useLocation();
  const showGlobalNavbar = location.pathname !== "/";

  return (
    <>
      {showGlobalNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/help" element={<Helppage />} />
        <Route path="/requirment" element={<Requirment />} />
        <Route path="/Requirment" element={<Requirment />} />
        <Route path="/askexpert" element={<Askexpert />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/freeconsulantent" element={<FreeConsultationPage />} />
        <Route path="/learnmore" element={<Learnmore />} />
        <Route path="/begineer" element={<Begineer />} />
        <Route path="/middle" element={<Middle />} />
        <Route path="/pro" element={<Pro/>} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
