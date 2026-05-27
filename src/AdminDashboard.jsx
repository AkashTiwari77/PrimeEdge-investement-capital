import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const API_BASE_URL = "https://primeedge-investement-capital.onrender.com";
  const ADMIN_PASSWORD = "admin123"; // ⚠️ Change this to a strong password!

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError("");
      fetchLeads();
    } else {
      setAuthError("Invalid password");
      setPassword("");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`);
      const result = await response.json();
      if (result.success) {
        setLeads(result.leads || []);
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Admin Dashboard
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>
            {authError && (
              <p className="text-red-600 font-bold text-center bg-red-100 p-2 rounded">
                {authError}
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
            >
              Login
            </button>
          </form>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 text-blue-600 hover:text-blue-800 font-bold py-2"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">View all contact form submissions</p>
          </div>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword("");
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-bold">Total Submissions</p>
            <p className="text-4xl font-bold text-blue-600 mt-2">{leads.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 text-sm font-bold">Last Updated</p>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={fetchLeads}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 text-lg">Loading submissions...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow text-center">
            <p className="text-gray-600 text-lg">No submissions yet</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-left font-bold text-gray-800">Name</th>
                  <th className="p-4 text-left font-bold text-gray-800">Email</th>
                  <th className="p-4 text-left font-bold text-gray-800">Phone</th>
                  <th className="p-4 text-left font-bold text-gray-800">Requirement</th>
                  <th className="p-4 text-left font-bold text-gray-800">Date</th>
                  <th className="p-4 text-left font-bold text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 transition">
                    <td className="p-4 font-bold text-gray-800">{lead.name}</td>
                    <td className="p-4 text-gray-700">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lead.email}
                      </a>
                    </td>
                    <td className="p-4 text-gray-700">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-blue-600 hover:underline"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="p-4 text-gray-700 max-w-xs truncate">
                      {lead.requirement || "—"}
                    </td>
                    <td className="p-4 text-gray-700 text-sm">
                      {new Date(lead.createdAt).toLocaleDateString()}{" "}
                      {new Date(lead.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="p-4">
                      <span className="bg-green-100 text-green-800 font-bold py-1 px-3 rounded-full text-sm">
                        ✓ New
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 font-bold py-2"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
