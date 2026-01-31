import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Voting() {
  const navigate = useNavigate();
  const [vote, setVote] = useState("");

  useEffect(() => {
    // 🔒 Page protection
    if (localStorage.getItem("verified") !== "true") {
      alert("Unauthorized access");
      navigate("/");
    }

    // 🛑 One-time voting check
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

    // ✅ Save vote (demo)
    localStorage.setItem("voted", "true");
    localStorage.setItem("selectedParty", vote);

    alert("✅ Vote submitted successfully");

    // Cleanup (optional)
    localStorage.removeItem("verified");
    localStorage.removeItem("faceImage");
    localStorage.removeItem("voterIdImage");

    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 shadow rounded w-96">
        <h2 className="font-bold mb-4 text-center">Voting Page</h2>

        <label className="block mb-2">
          <input
            type="radio"
            name="vote"
            value="Party A"
            onChange={(e) => setVote(e.target.value)}
          />{" "}
          Party A
        </label>

        <label className="block mb-2">
          <input
            type="radio"
            name="vote"
            value="Party B"
            onChange={(e) => setVote(e.target.value)}
          />{" "}
          Party B
        </label>

        <button onClick={handleSubmit} className="btn mt-4">
          Submit Vote
        </button>
      </div>
    </div>
  );
}
