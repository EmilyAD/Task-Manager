import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validators";
import { useApp } from "../context/AppContext"; 

const plantOptions = [
  {
    id: "daisy",
    icon: "🌼",
    name: "Daisy",
    description: "Cheerful and easy to grow",
  },
  {
    id: "cactus",
    icon: "🌵",
    name: "Cactus",
    description: "Low maintenance, resilient",
  },
  {
    id: "bamboo",
    icon: "🌱",
    name: "Bamboo",
    description: "Fast-growing and strong",
  },
];

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { updateProfile } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    starterPlant: "daisy",
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handlePlantSelect(plantId) {
    setFormData((prev) => ({
      ...prev,
      starterPlant: plantId,
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmError = validateConfirmPassword(
      formData.password,
      formData.confirmPassword
    );
    if (confirmError) newErrors.confirmPassword = confirmError;

    if (!formData.starterPlant) {
      newErrors.starterPlant = "Please choose a starter plant.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
  e.preventDefault();

  if (!validateForm()) return;

  updateProfile({
    name: formData.name,
    email: formData.email,
    joinDate: new Date().toISOString(),
  });

  navigate("/Profile"); 
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
          Join Bloomly
        </h1>

        <p className="mt-4 text-center text-[1rem] md:text-[1.1rem] 
text-[#6d7187] dark:text-[#b9c2b0]">
          Start your productivity garden today
        </p>

        <form
          className="w-full max-w-[640px] flex flex-col mt-10"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="text-sm font-bold text-[#23311f] dark:text-white mt-6">
            Name
          </label>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border-0 border-b border-gray-300 dark:border-gray-600 bg-transparent text-[#23311f] dark:text-white placeholder:text-[#7a7f95] dark:placeholder:text-[#9aa59a] py-3 outline-none focus:border-[#43A047] transition-colors duration-300" />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}

          <label className="text-sm font-bold text-[#23311f] dark:text-white mt-6">
            Email
          </label>
          <input
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
             className="w-full border-0 border-b border-gray-300 dark:border-gray-600 
             bg-transparent 
             text-[#6d7187] dark:text-white 
             placeholder:text-[#7a7f95] dark:placeholder:text-[#9aa59a] 
             py-3 outline-none focus:border-[#43A047] 
             transition-colors duration-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}

          <label className="text-sm font-bold text-[#23311f] dark:text-white mt-6">
            Password
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

          <div className="mt-10">
            <h2 className="text-[1.05rem] font-bold text-[#23311f] dark:text-white">
              Choose Your Starter Plant
            </h2>
            <p className="text-sm font-bold text-[#23311f] dark:text-white mt-6">
              Pick the plant that will start your Bloomly journey.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              {plantOptions.map((plant) => {
                const selected = formData.starterPlant === plant.id;

                return (
                 <button
            
                  key={plant.id}
                  type="button"
                  onClick={() => handlePlantSelect(plant.id)}
                  className={`rounded-2xl border p-5 text-center transition 
                  hover:-translate-y-1 cursor-pointer
                  ${
                    selected
                      ? "border-[#43A047] bg-[#f7fbf5] dark:bg-[#2a3d2a] shadow-[0_4px_14px_rgba(115,152,106,0.12)]"
                      : "border-[#dfe4dc] bg-white dark:bg-[#10151c]"
                  }`}
                >
                  <div className="text-[2.3rem]">{plant.icon}</div>
                    <div className="mt-3 text-[1rem] font-bold text-[#23311f] dark:text-white">
                      {plant.name}
                    </div>
                    <div className="mt-2 text-sm text-[#6d7187] dark:text-[#b9c2b0] leading-5">
                      {plant.description}
                    </div>
                  
                  </button>
                );
              })}
            </div>

            {errors.starterPlant && (
              <p className="text-red-500 text-sm mt-3">{errors.starterPlant}</p>
            )}
          </div>

          <button
            type="submit"
            
           className="mt-10 w-full 
            bg-[#43A047] dark:bg-[#8fbf7a] 
            text-white dark:text-[#010513] 
            py-4 rounded-xl font-bold 
            hover:opacity-90 transition"
>
          
            Create Account
          </button>
        </form>

        <p className="mt-10 text-gray-500 dark:text-[#b9c2b0] text-center">
          Already have an account?{" "}
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