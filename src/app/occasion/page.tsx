"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopAppBar from "@/components/TopAppBar";
import ProgressStepper from "@/components/ProgressStepper";
import { useGiftFlow } from "@/lib/GiftFlowContext";

const OCCASIONS = [
  { emoji: "🎂", label: "Birthday" },
  { emoji: "🎊", label: "Festival" },
  { emoji: "🎉", label: "Promotion" },
  { emoji: "💛", label: "Just Because" },
];

const RELATIONSHIPS = ["Acquaintance", "Friendly", "Close", "Very Close"];

export default function OccasionPage() {
  const router = useRouter();
  const flow = useGiftFlow();
  const [budget, setBudget] = useState(flow.budgetMax);

  const formatBudget = (v: number) =>
    `₹${v.toLocaleString("en-IN")}`;

  return (
    <div className="max-w-[390px] min-h-screen mx-auto bg-background relative overflow-x-hidden pb-40">
      <TopAppBar />

      <main className="px-6 pt-6">
        <ProgressStepper currentStep={1} />

        {/* Hero */}
        <div className="mb-10">
          <h2 className="text-[28px] font-extrabold tracking-tight text-on-background leading-tight mb-3">
            Who are you gifting today?
          </h2>
          <p className="text-[15px] leading-relaxed text-on-surface-variant font-normal">
            Tell us the occasion and who you&apos;re gifting — this shapes everything.
          </p>
        </div>

        {/* Occasion Section */}
        <section className="mb-10">
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-primary block mb-4">
            OCCASION
          </label>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map((o) => (
              <button
                key={o.label}
                onClick={() => flow.setOccasion(o.label)}
                className={`px-4 py-2.5 rounded-full text-[14px] font-bold flex items-center gap-1.5 active:scale-95 transition-all ${
                  flow.occasion === o.label
                    ? "bg-primary-container text-white shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {o.emoji} {o.label}
              </button>
            ))}
            <button className="border-2 border-dashed border-outline-variant text-outline px-4 py-2.5 rounded-full text-[14px] font-bold flex items-center gap-1.5 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-[18px]">add</span> Add
            </button>
          </div>
        </section>

        {/* Recipient Section */}
        <section className="mb-10">
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-primary block mb-4">
            RECIPIENT
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined">person</span>
            </div>
            <input
              className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-4 text-[15px] font-bold text-on-surface focus:ring-2 focus:ring-secondary-container/50 focus:bg-surface transition-all outline-none"
              placeholder="Enter name..."
              type="text"
              value={flow.recipientName}
              onChange={(e) => flow.setRecipientName(e.target.value)}
            />
          </div>
        </section>

        {/* Relationship Section */}
        <section className="mb-10">
          <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-primary block mb-4">
            YOUR RELATIONSHIP
          </label>
          <div className="grid grid-cols-2 gap-3">
            {RELATIONSHIPS.map((r) => (
              <button
                key={r}
                onClick={() => flow.setRelationship(r)}
                className={`p-3 rounded-xl text-[13px] font-bold active:scale-95 transition-all ${
                  flow.relationship === r
                    ? "bg-primary-container text-white shadow-md"
                    : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </section>

        {/* Budget Section */}
        <section className="mb-10">
          <div className="flex justify-between items-center mb-6">
            <label className="text-[11px] font-bold uppercase tracking-[0.05em] text-primary">
              YOUR BUDGET
            </label>
            <span className="text-[16px] font-bold text-primary-container bg-primary-fixed px-3 py-1 rounded-full">
              {formatBudget(flow.budgetMin)} – {formatBudget(budget)}
            </span>
          </div>
          <div className="relative py-4">
            <div className="absolute top-1/2 left-0 w-full h-2 -translate-y-1/2 bg-surface-container-highest rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-container/20"
                style={{ width: `${((budget - 500) / 9500) * 100}%` }}
              />
            </div>
            <input
              className="relative w-full h-2 bg-transparent appearance-none cursor-pointer z-10"
              max="10000"
              min="500"
              step="100"
              type="range"
              value={budget}
              onChange={(e) => {
                const v = Number(e.target.value);
                setBudget(v);
                flow.setBudgetMax(v);
              }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-bold text-outline uppercase tracking-wider mt-2">
            <span>Min</span>
            <span>Max</span>
          </div>
        </section>
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-2xl px-6 pt-6 pb-10 z-[60]">
        <button
          onClick={() => router.push("/profiling")}
          className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-5 rounded-[20px] font-bold text-[16px] shadow-lg shadow-primary/20 flex justify-center items-center gap-2 active:scale-95 transition-all"
        >
          Build Recipient Profile
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}
