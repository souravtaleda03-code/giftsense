"use client";

const TAGS = [
  "Creative",
  "Outdoorsy",
  "Homebody",
  "Planner",
  "Foodie",
  "Tech lover",
  "Minimalist",
  "Social butterfly",
];

interface PersonalityTagSelectorProps {
  selected: Set<string>;
  onToggle: (tag: string) => void;
  disabled?: boolean;
}

export default function PersonalityTagSelector({
  selected,
  onToggle,
  disabled,
}: PersonalityTagSelectorProps) {
  return (
    <section className="mb-10">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.05em] text-on-surface-variant mb-4">
        PERSONALITY TYPE
      </h3>
      <div className="flex flex-wrap gap-2">
        {TAGS.map((tag) => {
          const isSelected = selected.has(tag);
          return (
            <button
              key={tag}
              disabled={disabled}
              onClick={() => onToggle(tag)}
              className={`px-4 py-2 rounded-full text-sm active:scale-95 duration-200 transition-colors ${
                isSelected
                  ? "bg-primary-container text-on-primary font-bold"
                  : "bg-surface-container-low text-on-surface-variant font-medium hover:bg-surface-container"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </section>
  );
}
