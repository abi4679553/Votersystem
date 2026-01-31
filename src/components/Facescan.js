import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FaceScan() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  const [captured, setCaptured] = useState(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch(() => alert("Camera access denied"));
  }, []);

  const captureFace = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const image = canvas.toDataURL("image/png");
    setCaptured(image);
    localStorage.setItem("faceImage", image);
  };

  const verifyFace = () => {
    const voterId = localStorage.getItem("voterIdImage");
    const face = localStorage.getItem("faceImage");

    if (voterId && face) {
      // 👉 Dummy match success
      navigate("/vote");
    } else {
      alert("❌ Face not matched. Voting not allowed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-96 text-center">
        <h2 className="font-bold mb-4">Face Scan</h2>

        <video
          ref={videoRef}
          autoPlay
          className="w-full h-64 bg-black rounded mb-2"
        />

        <canvas ref={canvasRef} className="hidden" />

        <button onClick={captureFace} className="btn mb-2">
          Capture Face
        </button>

        {captured && (
          <img src={captured} alt="Captured" className="mb-2 rounded" />
        )}

        <button onClick={verifyFace} className="btn">
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
