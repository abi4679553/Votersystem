import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaceScan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    // ❌ If VoterID missing, kick out
    if (!localStorage.getItem("voterIdImage")) {
      alert("Upload Voter ID first");
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

    // ✅ FINAL VERIFY FLAG
    localStorage.setItem("verified", "true");
    navigate("/vote");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96 text-center">
        <h2 className="font-bold mb-4">Face Scan</h2>

        <video ref={videoRef} autoPlay className="w-full h-64 bg-black rounded" />
        <canvas ref={canvasRef} className="hidden" />

        <button onClick={captureFace} className="btn mt-3">
          Capture Face
        </button>

        <button onClick={verifyFace} className="btn mt-2">
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
