import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/upload");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

        <input className="input" placeholder="Name" required />
        <input className="input" placeholder="Aadhaar Number" required />
        <input className="input" placeholder="District" required />
        <input className="input" placeholder="Taluk" required />
        <input className="input" placeholder="State" required />

        <button className="btn mt-4">Login</button>
      </form>
    </div>
  );
}
