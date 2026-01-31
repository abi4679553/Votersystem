import React, { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    aadhar: "",
    phone: "",
    district: "",
    state: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!/^\d{12}$/.test(formData.aadhar))
      newErrors.aadhar = "Aadhar must be 12 digits";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.district) newErrors.district = "District is required";
    if (!formData.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Form submitted successfully!");
      // You can add your submit logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-pink-200 p-8 rounded-xl shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-800 animate-bounce">
          Login
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 text-pink-700 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>

        {/* Aadhar */}
        <div className="mb-4">
          <label className="block mb-1 text-pink-700 font-semibold">Aadhar Number</label>
          <input
            type="text"
            name="aadhar"
            value={formData.aadhar}
            onChange={handleChange}
            maxLength="12"
            className="w-full p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.aadhar && <p className="text-red-600 text-sm">{errors.aadhar}</p>}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block mb-1 text-pink-700 font-semibold">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            maxLength="10"
            className="w-full p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
        </div>

        {/* District */}
        <div className="mb-4">
          <label className="block mb-1 text-pink-700 font-semibold">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.district && <p className="text-red-600 text-sm">{errors.district}</p>}
        </div>

        {/* State */}
        <div className="mb-6">
          <label className="block mb-1 text-pink-700 font-semibold">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full p-2 rounded border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          {errors.state && <p className="text-red-600 text-sm">{errors.state}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
