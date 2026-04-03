"use client";

import TopAppBar from "@/components/TopAppBar";
import BottomNavBar from "@/components/BottomNavBar";

export default function ProfilePage() {
  return (
    <div className="w-[390px] mx-auto min-h-screen bg-background relative flex flex-col">
      <TopAppBar />
      <main className="flex-1 px-6 pt-10 pb-32">
        <h2 className="text-[28px] font-extrabold tracking-tight text-on-background mb-3">Profile</h2>
        <p className="text-[15px] leading-relaxed text-on-surface-variant">Manage your account and saved recipient profiles.</p>
      </main>
      <BottomNavBar />
    </div>
  );
}
