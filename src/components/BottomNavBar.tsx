"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { icon: "home", label: "Home", href: "/home" },
  { icon: "history", label: "History", href: "/home/history" },
  { icon: "person", label: "Profile", href: "/home/profile" },
  { icon: "settings", label: "Settings", href: "/home/settings" },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[390px] z-50 flex justify-around items-center px-4 pt-3 pb-8 bg-white/90 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(90,40,200,0.12)] rounded-t-[32px]">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.icon}
            href={tab.href}
            className={`flex flex-col items-center justify-center px-4 py-2 transition-all active:scale-90 duration-150 ${
              isActive
                ? "text-violet-600 bg-violet-50 rounded-2xl"
                : "text-slate-400"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {tab.icon}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.05em] mt-1">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
