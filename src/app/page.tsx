"use client";

import Link from "next/link";

export default function SplashScreen() {
  return (
    <main className="relative min-h-screen w-full max-w-[390px] mx-auto overflow-hidden bg-primary-container flex flex-col items-center justify-between py-16 px-8">
      {/* Subtle Radial Gradient Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)]" />

      {/* Spacer for Layout Balance */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        {/* Logo Cluster */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="w-[72px] h-[72px] bg-white rounded-xl flex items-center justify-center shadow-xl shadow-black/10">
            <span
              className="material-symbols-outlined text-[48px] text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              card_giftcard
            </span>
          </div>
          <div className="text-center">
            <h1 className="text-[28px] font-extrabold tracking-tighter text-white leading-none">
              GiftSense
            </h1>
            <p className="mt-4 text-[16px] font-normal text-white/80 max-w-[240px]">
              From gift anxiety to gift confidence
            </p>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="relative w-full h-48 mb-8">
          <div className="absolute -left-12 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -right-12 bottom-0 w-48 h-48 bg-secondary-container/10 rounded-full blur-2xl" />
          {/* Floating Card Hint */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/10 -rotate-3 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div className="space-y-2">
                  <div className="w-24 h-2 bg-white/30 rounded" />
                  <div className="w-16 h-2 bg-white/20 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Area */}
      <div className="w-full flex flex-col gap-4 mt-auto">
        <Link
          href="/occasion"
          className="w-full h-[56px] bg-white text-primary-container font-bold text-[15px] rounded-full shadow-lg active:scale-95 transition-all duration-200 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-white/20"
        >
          Get Started
        </Link>
        <Link
          href="/home"
          className="w-full h-[44px] flex items-center justify-center text-white font-bold text-[15px] active:scale-95 transition-all duration-200 focus:outline-none"
        >
          Log in
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-8 text-white/40 text-[11px] font-medium tracking-widest uppercase">
        Personalized Curation
      </div>
    </main>
  );
}
