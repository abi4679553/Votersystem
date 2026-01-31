import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaceScan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    // Check if voter ID image is uploaded
    if (!localStorage.getItem("voterIdImage")) {
      alert("❌ Upload Voter ID first");
      navigate("/");
      return;
    }

    // Access camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera access denied"));
  }, [navigate]);

  const captureFace = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 animate-fadeIn p-4">
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-full max-w-lg md:max-w-2xl border border-pink-200">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-pink-600 animate-pulse text-center">
          Face Scan
        </h2>

        {/* Video Container */}
        <div className="relative w-full h-[280px] md:h-[360px] mb-6 rounded-2xl overflow-hidden border-4 border-pink-300 shadow-inner">
          <video
            ref={videoRef}
            autoPlay
            className={`w-full h-full object-cover rounded-2xl transition-all ${
              captured ? "opacity-60" : "opacity-100"
            }`}
          />
          {captured && (
            <div className="absolute inset-0 flex items-center justify-center bg-pink-200/40 text-pink-600 font-bold text-3xl md:text-4xl animate-pulse rounded-2xl">
              ✅ Face Captured
            </div>
          )}
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {/* Buttons */}
        <button
          onClick={captureFace}
          className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 md:py-4 rounded-xl font-semibold shadow-md mb-4 hover:scale-105 active:scale-95 transition-all hover:shadow-pink-300/70"
        >
          Capture Face
        </button>

        <button
          onClick={verifyFace}
          className="w-full bg-gradient-to-r from-pink-300 to-pink-400 text-white py-3 md:py-4 rounded-xl font-semibold shadow-md hover:scale-105 active:scale-95 transition-all hover:shadow-pink-300/70"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
