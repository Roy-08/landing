"use client";

import { useState } from "react";

export default function ObtainPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const GOOGLE_SHEET_URL =
        "https://script.google.com/macros/s/AKfycbwxpW_GAnB0p9SyBpWmIw46r3_yt_xYLQFv5pH2X3r65TGiT-ILWHUHbp71nQIs9nAuMg/exec";

      const isConfigured = !GOOGLE_SHEET_URL.includes("YOUR_GOOGLE_SCRIPT_ID");

      if (isConfigured) {
        await fetch(GOOGLE_SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            city: formData.city,
            timestamp: new Date().toISOString(),
          }),
        });
      }

      setSubmitted(true);
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitted(true);
      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-1 py-1 relative overflow-hidden"
      style={{ background: "#faf6ef" }}
    >
      {/* Background Organic Blobs */}
      <div
        className="absolute -left-20 top-1/4 w-80 h-80 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #f0d98c 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute -right-20 bottom-1/4 w-96 h-96 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, #b5c99a 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />

      {/* Decorative: Leafy sprig - Top Left */}
      <svg
        className="absolute top-6 left-8 w-16 h-24 opacity-70"
        viewBox="0 0 60 100"
        fill="none"
      >
        <path
          d="M30 95 C30 95 8 70 12 45 C16 20 30 10 30 10"
          stroke="#6b8e5a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M30 25 C22 18 14 22 14 22 C14 22 18 14 30 18"
          fill="#8aad6e"
          opacity="0.8"
        />
        <path
          d="M30 40 C38 33 46 37 46 37 C46 37 42 29 30 33"
          fill="#8aad6e"
          opacity="0.8"
        />
        <path
          d="M30 55 C22 48 14 52 14 52 C14 52 18 44 30 48"
          fill="#8aad6e"
          opacity="0.8"
        />
        <path
          d="M30 70 C38 63 46 67 46 67 C46 67 42 59 30 63"
          fill="#8aad6e"
          opacity="0.7"
        />
      </svg>

      {/* Decorative: Sun with clouds - Top Right */}
      <svg
        className="absolute top-6 right-8 w-24 h-24 opacity-60"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle cx="65" cy="35" r="14" fill="#e8c55a" opacity="0.8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={65 + 18 * Math.cos((angle * Math.PI) / 180)}
            y1={35 + 18 * Math.sin((angle * Math.PI) / 180)}
            x2={65 + 26 * Math.cos((angle * Math.PI) / 180)}
            y2={35 + 26 * Math.sin((angle * Math.PI) / 180)}
            stroke="#e8c55a"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        <ellipse cx="40" cy="50" rx="18" ry="8" fill="white" opacity="0.7" />
        <ellipse cx="55" cy="48" rx="14" ry="7" fill="white" opacity="0.8" />
        <ellipse cx="30" cy="55" rx="12" ry="6" fill="white" opacity="0.5" />
      </svg>

      {/* Decorative: Potted plant - Bottom Left */}
      <svg
        className="absolute bottom-8 left-10 w-20 h-28 opacity-60"
        viewBox="0 0 80 120"
        fill="none"
      >
        <path
          d="M25 80 L22 110 C22 114 58 114 58 110 L55 80Z"
          fill="#f5f0e6"
          stroke="#c5b89a"
          strokeWidth="1.5"
        />
        <ellipse cx="40" cy="80" rx="16" ry="4" fill="#f5f0e6" stroke="#c5b89a" strokeWidth="1.5" />
        <path d="M40 78 C40 60 30 45 25 35" stroke="#6b8e5a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M40 78 C40 55 50 40 55 30" stroke="#6b8e5a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M40 78 C40 50 40 35 40 25" stroke="#6b8e5a" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="22" cy="33" rx="10" ry="6" fill="#8aad6e" opacity="0.7" transform="rotate(-30 22 33)" />
        <ellipse cx="58" cy="28" rx="10" ry="6" fill="#8aad6e" opacity="0.7" transform="rotate(30 58 28)" />
        <ellipse cx="40" cy="22" rx="7" ry="10" fill="#8aad6e" opacity="0.8" />
      </svg>

      {/* Decorative: Dot grid - Right side */}
      <div className="absolute right-12 top-1/2 grid grid-cols-3 gap-2 opacity-30">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#6b8e5a]" />
        ))}
      </div>

      {/* Main Content */}
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* UPLIFT Heading */}
        <h1
          className="text-5xl md:text-6xl font-bold tracking-wide text-center mb-2"
          style={{ color: "#2d4a2d", fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          UPLIFT
        </h1>

        {/* SECTION 1: "If you are a founder..." - Bordered box */}
        <div
          className="rounded-2xl p-6 mb-5 text-center"
          style={{
            background: "#f8f3e8",
            border: "1.5px solid #c5b89a",
          }}
        >
          {/* Heart circle icon */}
          <div className="flex justify-center mb-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "#8aad6e" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
          </div>

          <p className="text-[#3d3d3d] text-base leading-relaxed mb-2">
            If you are a{" "}
            <span className="font-bold text-[#2d4a2d]">founder, Doctor, CXOs, CEO</span> of
            your life.
          </p>
          <p
            className="text-[#2d4a2d] text-lg"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic" }}
          >
            This page is for you.
          </p>
        </div>

        {/* SECTION 2: "We help people resolve..." - Different style, no border box */}
        <div className="text-center mb-8 px-2">
          <p className="text-[#3d3d3d] text-base leading-relaxed mb-1">
            We help people resolve <span className="font-bold text-[#2d4a2d]">Burnout</span>{" "}
            and <span className="font-bold text-[#2d4a2d]">manifest</span> their{" "}
            <span className="font-bold text-[#2d4a2d]">dream life</span>.
          </p>

          <p
            className="text-[#c8963e] text-base mb-1"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: "italic" }}
          >
            Risk free program.
          </p>

          {/* Gold heart */}
          
          <p className="text-[#2d4a2d] font-semibold text-base">
            Money Back Guarantee.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name Field */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#8aad6e" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
            </span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-4 py-3 rounded-xl text-[#2d4a2d] placeholder-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8aad6e] transition-all"
              style={{
                background: "#faf8f2",
                border: "1.5px solid #c5b89a",
              }}
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#8aad6e" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
            </span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-4 py-3 rounded-xl text-[#2d4a2d] placeholder-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8aad6e] transition-all"
              style={{
                background: "#faf8f2",
                border: "1.5px solid #c5b89a",
              }}
            />
          </div>

          {/* Mobile Field */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#8aad6e" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
              </div>
            </span>
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile no."
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-4 py-3 rounded-xl text-[#2d4a2d] placeholder-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8aad6e] transition-all"
              style={{
                background: "#faf8f2",
                border: "1.5px solid #c5b89a",
              }}
            />
          </div>

          {/* City Field */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#8aad6e" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
            </span>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full pl-14 pr-4 py-3 rounded-xl text-[#2d4a2d] placeholder-[#b0b0a8] focus:outline-none focus:ring-2 focus:ring-[#8aad6e] transition-all"
              style={{
                background: "#faf8f2",
                border: "1.5px solid #c5b89a",
              }}
            />
          </div>

          {/* Sparkle lines above button */}
          <div className="flex justify-end pr-4 -mb-1 pt-2">
            <svg width="30" height="20" viewBox="0 0 30 20" fill="none" opacity="0.6">
              <line x1="10" y1="10" x2="4" y2="4" stroke="#e8c55a" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="15" y1="8" x2="15" y2="2" stroke="#e8c55a" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="20" y1="10" x2="26" y2="4" stroke="#e8c55a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          {/* Submit Button with outer border effect */}
          <div
            className="rounded-2xl p-2"
            style={{ background: "#dce8d0" }}
          >
            <button
              type="submit"
              disabled={isSubmitting || submitted}
              className="w-full text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: "#2d4a2d" }}
            >
              {submitted ? (
                <span>✓ Submitted! Redirecting...</span>
              ) : isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <span>Book a Clarity Call</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}