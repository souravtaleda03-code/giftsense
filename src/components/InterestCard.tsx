"use client";

export interface Interest {
  name: string;
  intensity: string;
  color: string;
}

const INTENSITY_STYLES: Record<string, { text: string; bg: string }> = {
  "Strong interest": { text: "text-[#0EA5E9]", bg: "bg-[#0EA5E9]/10" },
  Sometimes: { text: "text-[#818CF8]", bg: "bg-[#818CF8]/10" },
  "Mild interest": { text: "text-[#F472B6]", bg: "bg-[#F472B6]/10" },
};

interface InterestCardProps {
  interest: Interest;
  onRemove: () => void;
}

export default function InterestCard({ interest, onRemove }: InterestCardProps) {
  const style = INTENSITY_STYLES[interest.intensity];
  return (
    <div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-2xl group">
      <div className="flex items-center gap-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: interest.color }}
        />
        <span className="font-bold text-on-surface">{interest.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`text-[11px] font-bold uppercase tracking-wider ${style.text} ${style.bg} px-2 py-1 rounded-md`}
        >
          {interest.intensity}
        </span>
        <button
          onClick={onRemove}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-on-surface-variant hover:text-error"
          aria-label={`Remove ${interest.name}`}
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
}
