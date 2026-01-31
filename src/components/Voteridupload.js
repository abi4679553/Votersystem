import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function UploadVoterID() {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      localStorage.setItem("voterIdImage", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    if (!localStorage.getItem("voterIdImage")) {
      alert("❌ Please upload Voter ID photo");
      return;
    }
    navigate("/facescan");
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-pink-100 to-pink-200 animate-fadeIn">

      <div className="bg-white/90 backdrop-blur p-8 rounded-2xl 
        shadow-xl w-96 border border-pink-200 transform transition-all
        hover:-translate-y-2 hover:shadow-2xl">
        
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600 animate-pulse">
           Upload Voter ID
        </h2>

        <label className="w-full flex flex-col items-center px-4 py-6
          bg-pink-50 border-2 border-dashed border-pink-300
          rounded-lg cursor-pointer hover:bg-pink-100 transition
          text-pink-600 mb-4 text-center">
          {fileName ? `✅ ${fileName} selected` : "Click or Drag to Upload"}
          <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </label>

        <button
          onClick={handleNext}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500
            text-white py-2 rounded-lg font-semibold shadow-md
            hover:scale-105 active:scale-95 transition-all
            hover:shadow-pink-300/70"
        >
          Next 
        </button>
      </div>
    </div>
  );
}
