"use client";

export interface GiftSuggestion {
  name: string;
  description: string;
  priceRange: string;
  confidenceScore: number;
}

interface GiftSuggestionCardProps {
  suggestion: GiftSuggestion;
}

function ConfidenceGauge({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="#e7e8ea"
          strokeWidth="3"
        />
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-on-surface">
        {score}
      </span>
    </div>
  );
}

export default function GiftSuggestionCard({
  suggestion,
}: GiftSuggestionCardProps) {
  return (
    <div className="p-5 bg-surface-container-lowest rounded-xl">
      <div className="flex items-start gap-4">
        <ConfidenceGauge score={suggestion.confidenceScore} />
        <div className="flex-1 min-w-0 space-y-1.5">
          <h4 className="text-[16px] font-bold text-on-surface leading-tight">
            {suggestion.name}
          </h4>
          <p className="text-[13px] text-on-surface-variant leading-relaxed">
            {suggestion.description}
          </p>
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-secondary-container bg-secondary-container/10 px-2 py-1 rounded-md">
            {suggestion.priceRange}
          </span>
        </div>
      </div>
    </div>
  );
}
