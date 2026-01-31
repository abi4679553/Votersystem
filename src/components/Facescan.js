import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaceScan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("voterIdImage")) {
      alert("❌ Upload Voter ID first");
      navigate("/");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch(() => alert("Camera access denied"));
  }, [navigate]);

  const captureFace = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    localStorage.setItem("faceImage", image);
    setCaptured(true);
  };

  const verifyFace = () => {
    if (!captured) {
      alert("❌ Please capture face first");
      return;
    }

    localStorage.setItem("verified", "true");
    navigate("/vote");
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-pink-100 to-pink-200 animate-fadeIn">

      <div className="bg-white/90 backdrop-blur p-8 rounded-2xl 
        shadow-xl w-96 border border-pink-200 transform transition-all
        hover:-translate-y-2 hover:shadow-2xl text-center">

        <h2 className="text-2xl font-bold mb-6 text-pink-600 animate-pulse">
           Face Scan
        </h2>

        <div className="relative w-full h-64 mb-4 rounded overflow-hidden border-2 border-pink-300 shadow-inner">
          <video
            ref={videoRef}
            autoPlay
            className={`w-full h-full object-cover rounded transition-all
              ${captured ? "opacity-60" : "opacity-100"}`}
          />
          {captured && (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-200/30 text-pink-600 font-semibold text-lg animate-pulse rounded">
              ✅ Face Captured
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        <button
          onClick={captureFace}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500 
            text-white py-2 rounded-lg font-semibold shadow-md mb-3
            hover:scale-105 active:scale-95 transition-all
            hover:shadow-pink-300/70"
        >
          Capture Face
        </button>

        <button
          onClick={verifyFace}
          className="w-full bg-gradient-to-r from-pink-300 to-pink-400 
            text-white py-2 rounded-lg font-semibold shadow-md
            hover:scale-105 active:scale-95 transition-all
            hover:shadow-pink-300/70"
        >
          Verify & Continue 
        </button>
      </div>
    </div>
  );
}
