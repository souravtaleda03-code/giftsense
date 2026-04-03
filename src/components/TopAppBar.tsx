"use client";

import Link from "next/link";

export default function TopAppBar({ showProfiles }: { showProfiles?: boolean }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm font-sans antialiased tracking-tight">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <Link href="/home" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-violet-700">
            card_giftcard
          </span>
          <span className="text-xl font-extrabold tracking-tighter text-violet-700">
            GiftSense
          </span>
        </Link>
        <div className="flex items-center gap-3">
          {showProfiles && (
            <Link href="/home/profile" className="text-[11px] font-bold uppercase tracking-[0.05em] text-slate-500 hover:text-violet-600 transition-colors">
              My Profiles
            </Link>
          )}
          <Link href="/home/profile" className="material-symbols-outlined text-slate-500 hover:bg-slate-100 transition-colors p-2 rounded-full cursor-pointer">
            account_circle
          </Link>
        </div>
      </div>
      <div className="bg-slate-100/50 h-[1px]" />
    </nav>
  );
}
