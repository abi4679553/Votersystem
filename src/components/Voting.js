import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Voting() {
  const navigate = useNavigate();
  const [vote, setVote] = useState("");

  useEffect(() => {
    const phone = localStorage.getItem("currentPhone");
    if (!phone) {
      alert("Unauthorized access");
      navigate("/");
      return;
    }

    const votes = JSON.parse(localStorage.getItem("votes") || "{}");
    if (votes[phone]) {
      alert("❌ This phone number has already voted");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = () => {
    const phone = localStorage.getItem("currentPhone");
    if (!vote) {
      alert("❌ Please select a party");
      return;
    }

    // Save vote keyed by phone number
    const votes = JSON.parse(localStorage.getItem("votes") || "{}");
    votes[phone] = vote;
    localStorage.setItem("votes", JSON.stringify(votes));

    alert("✅ Vote submitted successfully");

    // Clear session phone
    localStorage.removeItem("currentPhone");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-pink-100 to-pink-200 animate-fadeIn">

      <div className="bg-white/90 backdrop-blur p-8 rounded-2xl 
        shadow-xl w-96 border border-pink-200 text-center">

        <h2 className="text-2xl font-bold mb-6 text-pink-600 animate-pulse">
          🗳️ Voting Page
        </h2>

        <div className="flex flex-col items-start mb-4">
          <label className="flex items-center mb-3 cursor-pointer">
            <input type="radio" name="vote" value="Party A" onChange={(e) => setVote(e.target.value)} className="mr-2 accent-pink-400" />
            Party A
          </label>

          <label className="flex items-center mb-3 cursor-pointer">
            <input type="radio" name="vote" value="Party B" onChange={(e) => setVote(e.target.value)} className="mr-2 accent-pink-400" />
            Party B
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 rounded-lg font-semibold"
        >
          Submit Vote 
        </button>
      </div>
    </div>
  );
}
