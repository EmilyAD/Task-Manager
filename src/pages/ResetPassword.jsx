import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  validatePassword,
  validateConfirmPassword,
} from "../utils/validators";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmError) newErrors.confirmPassword = confirmError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) return;

    alert("Password updated successfully.");
    navigate("/login");
  }

  return (
    <section className="min-h-screen bg-[#f4f4f1] dark:bg-[#010513] 
          flex items-center justify-center px-4 py-8 
          transition-colors duration-300">
      <div className="w-full max-w-[760px] 
          bg-white dark:bg-[#10151C] 
          rounded-[20px] 
          shadow-[0_12px_40px_rgba(0,0,0,0.08)] 
          px-6 py-10 md:px-12 md:py-12 
          flex flex-col items-center 
          transition-colors duration-300">
        <div className="w-24 h-24 rounded-full bg-[#43A047] flex items-center justify-center text-[2.6rem] mb-6">
          🌱
        </div>

        <h1 className="text-center text-[2rem] md:text-[2.8rem] 
    font-extrabold text-[#23311f] dark:text-white">
          Reset Your Password
        </h1>

       <p className="mt-4 text-center text-[1rem] md:text-[1.1rem] 
          text-[#6d7187] dark:text-[#b9c2b0]">
          Enter a new password to continue growing your garden
        </p>

        <div className="flex gap-6 md:gap-8 my-10 md:my-14 text-[2.5rem] md:text-[3rem]">
          <span className="plant-icon">🌱</span>
          <span className="plant-icon">🌸</span>
          <span className="plant-icon">🌻</span>
        </div>

        <form
          className="w-full max-w-[580px] flex flex-col"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="text-sm font-bold text-[#23311f] dark:text-white mt-6">
            New Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
             className="w-full border-0 border-b border-gray-300 dark:border-gray-600 
             bg-transparent 
             text-[#6d7187] dark:text-white 
             placeholder:text-[#7a7f95] dark:placeholder:text-[#9aa59a] 
             py-3 outline-none focus:border-[#43A047] 
             transition-colors duration-300"
          />

          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}

          <label className="text-sm font-bold text-[#23311f] dark:text-white mt-6">
            Confirm Password
          </label>

          <input
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
             className="w-full border-0 border-b border-gray-300 dark:border-gray-600 
             bg-transparent 
             text-[#6d7187] dark:text-white 
             placeholder:text-[#7a7f95] dark:placeholder:text-[#9aa59a] 
             py-3 outline-none focus:border-[#43A047] 
             transition-colors duration-300"
          />

          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}

          <button
            type="submit"
            className="mt-10 w-full 
              bg-[#43A047] dark:bg-[#8fbf7a] 
              text-white dark:text-[#010513] 
              py-4 rounded-xl font-bold 
              hover:opacity-90 transition"
          >
            Update Password
          </button>
        </form>

        <p className="mt-10 text-gray-500 dark:text-[#b9c2b0] text-center">
          Remember your password?{" "}
          <Link to="/login" className="text-[#43A047] font-bold">
            Login
          </Link>
        </p>

        <p className="mt-3 text-center">
          <Link
            to="/"
            
            className="text-[#43A047] dark:text-[#8fbf7a] 
            font-bold hover:underline"
          >
          
            Back to Home
          </Link>
        </p>
      </div>
    </section>
  );
}