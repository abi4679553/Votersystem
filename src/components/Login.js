import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [aadhaar, setAadhaar] = useState("");
  const [error, setError] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const districtsByState = {
    TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Salem", "Erode"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!/^\d{12}$/.test(aadhaar)) {
      setError("❌ Aadhaar number must be 12 digits");
      return;
    }

    setError("");

    localStorage.removeItem("voterIdImage");
    localStorage.removeItem("faceImage");
    localStorage.removeItem("verified");

    navigate("/upload");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-pink-100 to-pink-200 animate-fadeIn">

      <form
        onSubmit={handleLogin}
        className="bg-white/90 backdrop-blur p-8 rounded-2xl
        shadow-xl w-96 border border-pink-200
        transform transition-all duration-500
        hover:-translate-y-2 hover:shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-pink-600 animate-pulse">
          🌸 Welcome Back
        </h2>

        {error && (
          <div className="mb-4 text-sm text-pink-700 bg-pink-100 border border-pink-300 
            rounded-lg px-3 py-2 animate-pulse">
            {error}
          </div>
        )}

        <input
          className="w-full mb-3 px-4 py-2 rounded-lg border border-pink-300
            focus:outline-none focus:ring-2 focus:ring-pink-400 focus:shadow-pink-200/50
            transition duration-300 focus:scale-[1.02]"
          placeholder="Name"
          required
        />

        <input
          value={aadhaar}
          onChange={(e) => setAadhaar(e.target.value)}
          maxLength={12}
          className="w-full mb-3 px-4 py-2 rounded-lg border border-pink-300
            focus:outline-none focus:ring-2 focus:ring-pink-400 focus:shadow-pink-200/50
            transition duration-300 focus:scale-[1.02]"
          placeholder="Aadhaar Number"
          required
        />

        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setDistrict("");
          }}
          className="w-full mb-3 px-4 py-2 rounded-lg border border-pink-300
            focus:ring-2 focus:ring-pink-400 focus:shadow-pink-200/50 bg-white transition"
          required
        >
          <option value="">Select State</option>
          <option value="TamilNadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="w-full mb-3 px-4 py-2 rounded-lg border border-pink-300
            focus:ring-2 focus:ring-pink-400 focus:shadow-pink-200/50 bg-white transition"
          required
          disabled={!state}
        >
          <option value="">Select District</option>
          {state &&
            districtsByState[state].map((dist) => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
        </select>

        <input
          className="w-full mb-5 px-4 py-2 rounded-lg border border-pink-300
            focus:outline-none focus:ring-2 focus:ring-pink-400 focus:shadow-pink-200/50
            transition duration-300 focus:scale-[1.02]"
          placeholder="Taluk"
          required
        />

        <button
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500
            text-white py-2 rounded-lg font-semibold
            shadow-md hover:scale-105 active:scale-95 transition-all
            hover:shadow-pink-300/70"
        >
          Login 
        </button>
      </form>
    </div>
  );
}
