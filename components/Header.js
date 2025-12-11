'use client'
import React, { useState, useEffect } from "react";
export default function Header() {
    const [userName, setUserName] = useState("User");
   useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUserName(data?.name || "User");
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);
  

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-gray-900">ticktock</h1>
          <nav className="flex items-center gap-4">
            <a
              href="/timesheets"
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Timesheets
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{userName}</span>
          <button className="text-gray-600 hover:text-gray-900">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
