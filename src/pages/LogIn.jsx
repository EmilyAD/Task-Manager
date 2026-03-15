import { useState } from "react";
import { Link } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validators";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    const newErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    alert("Login submitted successfully.");
  }

  return (
    <section className="min-h-screen bg-[#f4f4f1] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-[760px] bg-white rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] px-6 py-10 md:px-12 md:py-12 flex flex-col items-center">

        {/* Logo */}
        <div className="w-24 h-24 rounded-full bg-[#73986a] flex items-center justify-center text-[2.6rem] mb-6">
          🌱
        </div>

        {/* Title */}
        <h1 className="text-center text-[2rem] md:text-[2.8rem] font-extrabold text-[#23311f] whitespace-nowrap">
          Welcome Back to Bloomly
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-center text-[1rem] md:text-[1.1rem] text-[#6d7187]">
          Login to continue growing your garden
        </p>

        {/* Floating icons */}
        <div className="flex gap-6 md:gap-8 my-10 md:my-14 text-[2.5rem] md:text-[3rem]">
          <span className="plant-icon">🌱</span>
          <span className="plant-icon">🌸</span>
          <span className="plant-icon">🌻</span>
        </div>

        {/* Form */}
        <form
          className="w-full max-w-[580px] flex flex-col"
          onSubmit={handleSubmit}
          noValidate
        >

          {/* Email */}
          <label className="text-sm font-bold text-[#23311f] mt-2">
            Email
          </label>

          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="border-0 border-b border-gray-300 py-3 outline-none focus:border-[#73986a]"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          {/* Password */}
          <label className="text-sm font-bold text-[#23311f] mt-6">
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="border-0 border-b border-gray-300 py-3 outline-none focus:border-[#73986a]"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="mt-10 bg-[#73986a] text-white py-4 rounded-xl font-bold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-10 text-gray-500 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#73986a] font-bold"
          >
            Sign up
          </Link>
        </p>

        <p className="mt-3 text-center">
          <Link
            to="/"
            className="font-semibold text-[#23311f] hover:underline"
          >
            Back to Home
          </Link>
        </p>

      </div>
    </section>
  );
}