"use client";

import Link from "next/link";
import TopAppBar from "@/components/TopAppBar";
import BottomNavBar from "@/components/BottomNavBar";

const UPCOMING = [
  {
    emoji: "🎂",
    name: "Priya's Birthday",
    subtext: "In 3 days",
    gradient: "from-[#7C3AED] to-[#9333EA]",
    bgIcon: "cake",
    cta: "View directions",
    href: "/directions",
  },
  {
    emoji: "🎊",
    name: "Mom — Anniversary",
    subtext: "In 14 days",
    gradient: "from-[#0EA5E9] to-[#0284C7]",
    bgIcon: "celebration",
    cta: "Start profiling",
    href: "/occasion",
  },
];

const RECENT = [
  { emoji: "🎨", name: "Artisan Alex", confidence: 98, bgClass: "bg-violet-50" },
  { emoji: "☕", name: "Techie Sarah", confidence: 92, bgClass: "bg-blue-50" },
  { emoji: "🪴", name: "Green-Thumb Ben", confidence: 85, bgClass: "bg-rose-50" },
  { emoji: "🎮", name: "Gamer Riley", confidence: 79, bgClass: "bg-amber-50" },
];

export default function HomePage() {
  return (
    <div className="w-[390px] mx-auto min-h-screen bg-background relative flex flex-col overflow-hidden">
      <TopAppBar showProfiles />

      <main className="flex-1 overflow-y-auto pb-32 no-scrollbar">
        {/* Upcoming Occasions */}
        <section className="mt-8 px-6">
          <h3 className="text-lg font-bold text-on-background tracking-tight mb-4">
            Upcoming Occasions
          </h3>
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 -mx-6 px-6">
            {UPCOMING.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`min-w-[280px] h-[180px] rounded-lg bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between text-white shadow-lg relative overflow-hidden group cursor-pointer`}
              >
                <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                  <span className="material-symbols-outlined text-9xl">{item.bgIcon}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{item.emoji}</span>
                    <h4 className="text-xl font-bold">{item.name}</h4>
                  </div>
                  <p className="text-white/80 text-sm font-medium">{item.subtext}</p>
                </div>
                <span
                  className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold w-fit hover:bg-white/30 transition-all flex items-center gap-2 active:scale-95"
                >
                  {item.cta}{" "}
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Gift Directions */}
        <section className="mt-10 px-6">
          <div className="flex justify-between items-end mb-4">
            <h3 className="text-lg font-bold text-on-background tracking-tight">
              Recent Gift Directions
            </h3>
            <span className="text-xs font-bold text-primary uppercase tracking-wider cursor-pointer">
              See All
            </span>
          </div>
          <div className="space-y-3">
            {RECENT.map((item) => (
              <Link
                key={item.name}
                href="/directions"
                className="h-[72px] bg-surface-container-lowest rounded-xl flex items-center px-4 justify-between hover:bg-surface-container-low transition-colors duration-200 active:scale-[0.98] cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full ${item.bgClass} flex items-center justify-center text-2xl`}
                  >
                    {item.emoji}
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface">{item.name}</h4>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-success to-[#0EA5E9]" />
                      <p className="text-xs font-medium text-slate-500">
                        {item.confidence}% confidence
                      </p>
                    </div>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-300">chevron_right</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Suggestion Card */}
        <section className="mt-8 px-6 mb-10">
          <div className="bg-secondary-container/10 p-6 rounded-lg relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-secondary font-bold mb-2">Need a new perspective?</h4>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                Start a new Gift Direction for someone special and let GiftSense curate the
                perfect path.
              </p>
              <Link
                href="/occasion"
                className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg transition-shadow active:scale-95 inline-block"
              >
                Create New Profile
              </Link>
            </div>
            <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
              <span className="material-symbols-outlined text-[120px] text-secondary">
                psychology
              </span>
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />

      {/* FAB */}
      <Link
        href="/occasion"
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-lg flex items-center justify-center active:scale-95 transition-transform z-40"
      >
        <span className="material-symbols-outlined">add</span>
      </Link>
    </div>
  );
}
