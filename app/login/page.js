"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* LEFT SECTION - Login Form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6 sm:px-10 lg:px-16 py-12 text-black">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Login</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-4 py-2 
                  border rounded-lg 
                  focus:outline-none 
                  focus:ring-2 focus:ring-blue-600
                "
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  w-full px-4 py-2 
                  border rounded-lg 
                  focus:outline-none 
                  focus:ring-2 focus:ring-blue-600
                "
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {message && (
              <p className="text-red-600 text-sm text-left">{message}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              className="
                w-full py-2 mt-2 
                bg-blue-600 text-white 
                font-semibold rounded-lg
                hover:bg-blue-700  
                transition
              "
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - Branding */}
      <div className="flex-1 bg-blue-600 text-white flex items-center justify-center px-10 lg:px-16 py-16 text-center lg:text-left">
        <div className="max-w-md">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            ticktock
          </h1>

          <p className="text-sm sm:text-base leading-relaxed opacity-90">
            Introducing ticktock, our cutting-edge timesheet web application 
            designed to revolutionize how you manage employee work hours.  
            Effortlessly track and monitor attendance and productivity from 
            anywhere using any internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}
