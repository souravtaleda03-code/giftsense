"use client";

import { use } from "react";
import Link from "next/link";
import { useGiftFlow } from "@/lib/GiftFlowContext";

export default function RationalePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const flow = useGiftFlow();
  const index = parseInt(id, 10);
  const direction = flow.directions[index];

  if (!direction) {
    return (
      <div className="w-[390px] mx-auto min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-on-surface-variant mb-4">Direction not found.</p>
          <Link href="/directions" className="text-primary font-bold">
            ← Back to directions
          </Link>
        </div>
      </div>
    );
  }

  const circumference = 2 * Math.PI * 56;
  const offset = circumference - (direction.confidenceScore / 100) * circumference;

  // Generate rationale points based on direction data
  const rationales = [
    `${flow.interests[0]?.name || "Their top interest"} is ${flow.recipientName}'s strongest interest — directly on-theme`,
    `${Array.from(flow.personalityTypes)[0] || "Their"} personality type — values experiences over objects`,
    `No similar gifts previously — feels fresh and non-repetitive`,
    `Budget of ₹${flow.budgetMin.toLocaleString("en-IN")}–₹${flow.budgetMax.toLocaleString("en-IN")} fits comfortably`,
  ];

  return (
    <main className="w-[390px] mx-auto min-h-screen bg-background relative flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center w-full px-6 py-4">
          <Link href="/directions" className="w-10 h-10 flex items-center justify-start text-slate-500 active:scale-95 duration-200">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="text-slate-500 font-bold">Rationale Card</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Content */}
      <section className="flex-1 px-5 py-6 flex flex-col gap-6">
        {/* Elevated Card */}
        <div className="bg-surface-container-lowest rounded-[24px] shadow-[0_8px_32px_rgba(90,40,200,0.12)] p-6 flex flex-col items-center">
          {/* Icon & Title */}
          <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center text-4xl mb-4">
            {direction.emoji}
          </div>
          <h2 className="text-[22px] font-bold text-center leading-tight mb-6">
            {direction.name}
          </h2>

          {/* Confidence Gauge */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 -rotate-90">
                <circle cx="64" cy="64" r="56" fill="transparent" stroke="#F3F4F6" strokeWidth="8" />
                <circle
                  cx="64"
                  cy="64"
                  r="56"
                  fill="transparent"
                  stroke="url(#gradient-success)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={offset}
                />
                <defs>
                  <linearGradient id="gradient-success" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: "#059669", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "#0EA5E9", stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute text-[48px] font-black text-success tracking-tighter">
                {direction.confidenceScore}%
              </span>
            </div>
            <p className="text-[13px] text-slate-500 font-medium mt-2">
              {direction.confidenceLabel} for {flow.recipientName}
            </p>
          </div>

          {/* Why Box */}
          <div className="w-full bg-[#F5F3FF] rounded-[16px] p-5 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="material-symbols-outlined text-primary text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                psychology
              </span>
              <h3 className="text-[13px] font-bold text-primary uppercase tracking-[0.05em]">
                Why GiftSense is confident
              </h3>
            </div>
            <div className="space-y-4">
              {rationales.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="material-symbols-outlined text-success text-[20px] mt-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <p className="text-[14px] leading-[1.4] text-on-surface-variant">{r}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Action Area */}
      <footer className="p-6 flex flex-col gap-4 pb-12">
        <Link
          href="/home"
          className="w-full py-4 bg-success text-white font-bold rounded-[14px] shadow-[0_4px_16px_rgba(5,150,105,0.25)] active:scale-[0.98] transition-all text-center"
        >
          Save this direction
        </Link>
        <button className="w-full py-4 bg-transparent border-2 border-outline-variant/20 text-on-surface-variant font-bold rounded-[14px] active:scale-[0.98] transition-all">
          Log outcome after gifting
        </button>
        <Link
          href="/directions"
          className="flex items-center justify-center gap-2 text-primary font-bold text-[14px] mt-2 active:opacity-70 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Explore other directions
        </Link>
      </footer>
    </main>
  );
}
