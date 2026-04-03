"use client";

import Link from "next/link";
import TopAppBar from "@/components/TopAppBar";
import { useGiftFlow } from "@/lib/GiftFlowContext";

export default function DirectionsPage() {
  const flow = useGiftFlow();

  return (
    <div className="w-[390px] mx-auto min-h-screen bg-background flex flex-col">
      <TopAppBar />

      <div className="flex-1 px-6 pt-6 pb-32">
        {/* Progress Stepper - All complete */}
        <nav className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1.5 rounded-full bg-primary-container" />
          <div className="flex-1 h-1.5 rounded-full bg-primary-container" />
          <div className="flex-1 h-1.5 rounded-full bg-primary-container relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-container rounded-full ring-4 ring-primary/20" />
          </div>
        </nav>

        {/* Headline */}
        <div className="mb-8">
          <h2 className="text-[28px] font-extrabold leading-tight tracking-tight text-on-background mb-2">
            Gift Directions for {flow.recipientName}
          </h2>
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <span className="text-[11px] font-bold uppercase tracking-[0.05em]">
              Ranked by confidence fit ↓
            </span>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
              info
            </span>
          </div>
        </div>

        {/* Error state */}
        {flow.error && (
          <div className="p-4 bg-error-container rounded-2xl mb-6">
            <p className="text-sm text-on-error-container font-medium">{flow.error}</p>
          </div>
        )}

        {/* Confidence Stack */}
        <div className="space-y-6">
          {flow.directions.map((d, i) => (
            <Link
              key={i}
              href={`/directions/${i}`}
              className="block relative rounded-xl p-5 transition-all active:scale-[0.98]"
              style={{ backgroundColor: d.bgColor }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col">
                  <span
                    className="text-[11px] font-bold uppercase tracking-widest mb-1"
                    style={{ color: d.labelColor }}
                  >
                    {d.confidenceLabel}
                  </span>
                  <h3 className="text-xl font-bold text-on-surface">
                    {d.emoji} {d.name}
                  </h3>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white"
                  style={{ border: `4px solid ${d.borderColor}` }}
                >
                  <span
                    className="text-[13px] font-extrabold"
                    style={{ color: d.labelColor }}
                  >
                    {d.confidenceScore}%
                  </span>
                </div>
              </div>
              <p className="text-[15px] leading-relaxed text-on-surface-variant font-normal">
                {d.description}
              </p>
            </Link>
          ))}
        </div>

        {flow.directions.length === 0 && !flow.error && (
          <div className="text-center py-16">
            <p className="text-on-surface-variant">No directions yet. Complete your profile to generate gift directions.</p>
            <Link
              href="/profiling"
              className="mt-4 inline-block text-primary font-bold"
            >
              ← Go back to profiling
            </Link>
          </div>
        )}

        {/* Disclaimer */}
        {flow.directions.length > 0 && (
          <p className="mt-8 text-center italic text-[12px] leading-relaxed text-on-surface-variant px-4">
            These are gift directions, not specific products. Shop anywhere once you decide.
          </p>
        )}
      </div>

      {/* Sticky Bottom CTA */}
      {flow.directions.length > 0 && (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] bg-white/90 backdrop-blur-2xl px-6 pt-6 pb-10 z-50 rounded-t-xl">
          <Link
            href="/directions/0"
            className="w-full bg-success hover:bg-success/90 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-success/20"
          >
            Explore Top Direction
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      )}
    </div>
  );
}
