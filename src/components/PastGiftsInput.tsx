"use client";

interface PastGiftsInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function PastGiftsInput({
  value,
  onChange,
  disabled,
}: PastGiftsInputProps) {
  return (
    <section className="mb-8">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.05em] text-on-surface-variant mb-4">
        PAST GIFTS (OPTIONAL)
      </h3>
      <div className="space-y-2">
        <input
          type="text"
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 px-5 bg-surface-container-low rounded-xl focus:ring-2 focus:ring-secondary-container/30 focus:bg-surface transition-all text-on-surface placeholder:text-outline border-none outline-none"
          placeholder="e.g. A graphic design book..."
        />
        <p className="text-[12px] text-on-surface-variant px-1">
          Mentioning past hits or misses helps the AI fine-tune its taste
          profile.
        </p>
      </div>
    </section>
  );
}
