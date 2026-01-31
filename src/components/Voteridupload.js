import { useNavigate } from "react-router-dom";

export default function UploadVoterID() {
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 shadow rounded w-96">
        <h2 className="font-bold mb-4">Upload Voter ID</h2>

        <input type="file" accept="image/*" onChange={handleFile} />

        <button onClick={handleNext} className="btn mt-4">
          Next
        </button>
      </div>
    </div>
  );
}
