import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Voting() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("faceImage")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 shadow rounded w-96">
        <h2 className="font-bold mb-4 text-center">Voting Page</h2>

        <label className="block mb-2">
          <input type="radio" name="vote" /> Party A
        </label>
        <label className="block mb-2">
          <input type="radio" name="vote" /> Party B
        </label>

        <button className="btn mt-4">Submit Vote</button>
      </div>
    </div>
  );
}
