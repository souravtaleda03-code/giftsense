"use client";

import { useRouter } from "next/navigation";
import TopAppBar from "@/components/TopAppBar";
import ProgressStepper from "@/components/ProgressStepper";
import PersonalityTagSelector from "@/components/PersonalityTagSelector";
import InterestCard from "@/components/InterestCard";
import AddInterestForm from "@/components/AddInterestForm";
import PastGiftsInput from "@/components/PastGiftsInput";
import { useGiftFlow } from "@/lib/GiftFlowContext";

export default function ProfilingPage() {
  const router = useRouter();
  const flow = useGiftFlow();

  const handleGenerate = async () => {
    flow.setIsGenerating(true);
    flow.setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientName: flow.recipientName,
          personalityTypes: Array.from(flow.personalityTypes),
          interests: flow.interests.map((i) => ({
            name: i.name,
            intensity: i.intensity,
          })),
          pastGifts: flow.pastGifts,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        flow.setError(data.error || "Failed to generate suggestions");
        flow.setIsGenerating(false);
        return;
      }

      // Map API results to GiftDirection format
      const confidenceLevels = [
        { min: 80, label: "High Confidence", bg: "#ECFDF5", labelColor: "#059669", borderColor: "rgba(5, 150, 105, 0.2)" },
        { min: 60, label: "Moderate Fit", bg: "#FFF7ED", labelColor: "#9A3412", borderColor: "#FED7AA" },
        { min: 0, label: "Baseline Match", bg: "#F5F3FF", labelColor: "#630ed4", borderColor: "rgba(99, 14, 212, 0.1)" },
      ];

      const emojis = ["📷", "✈️", "📚", "🎨", "🎁", "💡", "🎯", "✨"];

      const directions = data.suggestions.map(
        (s: { name: string; description: string; confidenceScore: number }, i: number) => {
          const level =
            confidenceLevels.find((l) => s.confidenceScore >= l.min) ||
            confidenceLevels[2];
          return {
            name: s.name,
            emoji: emojis[i % emojis.length],
            description: s.description,
            confidenceScore: s.confidenceScore,
            confidenceLabel: level.label,
            bgColor: level.bg,
            labelColor: level.labelColor,
            borderColor: level.borderColor,
          };
        }
      );

      flow.setDirections(directions);
      flow.setIsGenerating(false);
      router.push("/directions");
    } catch {
      flow.setError("Network error. Please try again.");
      flow.setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-[390px] min-h-screen mx-auto bg-background relative overflow-x-hidden pb-40">
      <TopAppBar />

      <main className="px-6 pt-6">
        <ProgressStepper currentStep={2} />

        <header className="mb-8">
          <h2 className="text-[28px] font-extrabold tracking-tight text-on-background mb-3">
            Tell me about {flow.recipientName}
          </h2>
          <p className="text-[15px] leading-relaxed text-on-surface-variant">
            The more you share, the more confident your gift direction will be.
          </p>
        </header>

        <PersonalityTagSelector
          selected={flow.personalityTypes}
          onToggle={flow.togglePersonality}
          disabled={flow.isGenerating}
        />

        {/* Interests & Hobbies */}
        <section className="mb-10">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.05em] text-on-surface-variant mb-4">
            INTERESTS &amp; HOBBIES
          </h3>
          <div className="space-y-3">
            {flow.interests.map((interest, i) => (
              <InterestCard
                key={`${interest.name}-${i}`}
                interest={interest}
                onRemove={() => flow.removeInterest(i)}
              />
            ))}
            <AddInterestForm onAdd={flow.addInterest} />
          </div>
        </section>

        <PastGiftsInput
          value={flow.pastGifts}
          onChange={flow.setPastGifts}
          disabled={flow.isGenerating}
        />

        {flow.error && (
          <div className="p-4 bg-error-container rounded-2xl mb-4">
            <p className="text-sm text-on-error-container font-medium">{flow.error}</p>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/95 to-transparent z-40">
        <button
          onClick={handleGenerate}
          disabled={flow.isGenerating}
          className="w-full h-16 bg-gradient-to-r from-secondary-container to-[#0089CC] text-on-primary rounded-2xl font-bold text-lg shadow-[0px_8px_32px_rgba(57,184,253,0.3)] active:scale-95 duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {flow.isGenerating ? (
            <>
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating...
            </>
          ) : (
            <>
              Generate Gift Directions
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
