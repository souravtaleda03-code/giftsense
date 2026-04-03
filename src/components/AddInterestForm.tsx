"use client";

import { useState } from "react";
import type { Interest } from "./InterestCard";

const INTENSITY_OPTIONS: Interest["intensity"][] = [
  "Strong interest",
  "Sometimes",
  "Mild interest",
];

const COLORS = ["#0EA5E9", "#818CF8", "#F472B6", "#34D399", "#FBBF24", "#F87171"];

interface AddInterestFormProps {
  onAdd: (interest: Interest) => void;
}

export default function AddInterestForm({ onAdd }: AddInterestFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [intensity, setIntensity] = useState<Interest["intensity"]>("Sometimes");

  const handleSubmit = () => {
    if (!name.trim()) return;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    onAdd({ name: name.trim(), intensity, color });
    setName("");
    setIntensity("Sometimes");
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center w-full p-4 border-2 border-dashed border-outline-variant/30 rounded-2xl cursor-pointer hover:bg-surface-container-low transition-colors"
      >
        <span className="text-sm font-bold text-primary-container">
          + Add another interest
        </span>
      </button>
    );
  }

  return (
    <div className="p-4 bg-surface-container-lowest rounded-2xl space-y-3">
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Interest name..."
        className="w-full h-12 px-4 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary-container/30 focus:bg-surface transition-all border-none outline-none"
      />
      <div className="flex flex-wrap gap-2">
        {INTENSITY_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setIntensity(opt)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              intensity === opt
                ? "bg-primary-container text-on-primary"
                : "bg-surface-container-low text-on-surface-variant"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="flex-1 h-10 bg-primary-container text-on-primary rounded-xl text-sm font-bold active:scale-95 duration-200"
        >
          Add
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="h-10 px-4 text-on-surface-variant text-sm font-medium rounded-xl hover:bg-surface-container-low transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
