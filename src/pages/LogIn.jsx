import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail, validatePassword } from "../utils/validators";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
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

    navigate("/tasks");
  }

  return (
<section className="min-h-screen bg-[#f4f4f1] dark:bg-[#010513] flex items-center justify-center px-4 py-8 transition-colors duration-300">
      <div className="w-full max-w-[760px] bg-white dark:bg-[#10151C] rounded-[20px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] px-6 py-10 md:px-12 md:py-12 flex flex-col items-center transition-colors duration-300">
        {/* Logo */}
        <div className="w-24 h-24 rounded-full bg-[#43A047] flex items-center justify-center text-[2.6rem] mb-6">
          🌱
        </div>

        {/* Title */}
        <h1 className="text-center text-[2rem] md:text-[2.8rem] font-extrabold text-[#23311f] dark:text-white">
          Welcome Back to Bloomly
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-center text-[1rem] md:text-[1.1rem] text-[#6d7187] dark:text-[#b9c2b0]">
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
          <label className="text-sm font-bold text-[#23311f] dark:text-white mt-2">
            Email
          </label>

          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            className="border-0 border-b border-gray-300 dark:border-gray-600 py-3 outline-none focus:border-[#43A047] bg-transparent text-[#6d7187] dark:text-white placeholder:text-[#7a7f95] dark:placeholder:text-[#9aa59a]" 
          />

          {errors.email && (
            <p className="mt-10 text-gray-500 dark:text-[#b9c2b0] text-center"/>
          )}

          {/* Password */}
          <label className="text-sm font-bold text-[#23311f] dark:text-white mt-2">
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-0 border-b border-gray-300 dark:border-gray-600 
             bg-transparent dark:bg-transparent
             text-[#6d7187] dark:text-white
             placeholder:text-[#7a7f95] dark:placeholder:text-[#9aa59a]
             py-3 outline-none focus:border-[#43A047]"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          <p className="mt-4 text-right">
         <Link to="/forgot-password" className="text-[#43A047] font-semibold hover:underline">
          Forgot Password?
         </Link>
        </p>

          {/* Button */}
          <button
            type="submit"
            className="mt-10 bg-[#43A047] text-white py-4 rounded-xl font-bold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="mt-10 text-gray-500 text-center">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#43A047] font-bold"
          >
            Sign up
          </Link>
        </p>

        <p className="mt-3 text-center">
          <Link to="/"  className="text-[#43A047] dark:text-[#8fbf7a] 
            font-bold hover:underline">
            Back to Home
          </Link>
        </p>

      </div>
    </section>
  );
}