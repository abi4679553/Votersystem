import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Voting() {
  const navigate = useNavigate();
  const [vote, setVote] = useState("");

  useEffect(() => {
    if (localStorage.getItem("verified") !== "true") {
      alert("Unauthorized access");
      navigate("/");
    }

    if (localStorage.getItem("voted") === "true") {
      alert("You have already voted");
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = () => {
    if (!vote) {
      alert("❌ Please select a party");
      return;
    }

    localStorage.setItem("voted", "true");
    localStorage.setItem("selectedParty", vote);

    alert("✅ Vote submitted successfully");

    localStorage.removeItem("verified");
    localStorage.removeItem("faceImage");
    localStorage.removeItem("voterIdImage");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-br from-pink-100 to-pink-200 animate-fadeIn">

      <div className="bg-white/90 backdrop-blur p-8 rounded-2xl 
        shadow-xl w-96 border border-pink-200 transform transition-all
        hover:-translate-y-2 hover:shadow-2xl text-center">

        <h2 className="text-2xl font-bold mb-6 text-pink-600 animate-pulse">
          🗳️ Voting Page
        </h2>

        <div className="flex flex-col items-start mb-4">
          <label className="flex items-center mb-3 cursor-pointer
            transition hover:text-pink-600">
            <input
              type="radio"
              name="vote"
              value="Party A"
              onChange={(e) => setVote(e.target.value)}
              className="mr-2 accent-pink-400"
            />
            Party A
          </label>

          <label className="flex items-center mb-3 cursor-pointer
            transition hover:text-pink-600">
            <input
              type="radio"
              name="vote"
              value="Party B"
              onChange={(e) => setVote(e.target.value)}
              className="mr-2 accent-pink-400"
            />
            Party B
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500
            text-white py-2 rounded-lg font-semibold shadow-md
            hover:scale-105 active:scale-95 transition-all
            hover:shadow-pink-300/70"
        >
          Submit Vote 
        </button>
      </div>
    </div>
  );
}
