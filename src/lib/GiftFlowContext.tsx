"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export interface Interest {
  name: string;
  intensity: string;
  color: string;
}

export interface GiftDirection {
  name: string;
  emoji: string;
  description: string;
  confidenceScore: number;
  confidenceLabel: string;
  bgColor: string;
  labelColor: string;
  borderColor: string;
}

interface GiftFlowState {
  // Step 1: Occasion
  occasion: string;
  recipientName: string;
  relationship: string;
  budgetMin: number;
  budgetMax: number;
  // Step 2: Profiling
  personalityTypes: Set<string>;
  interests: Interest[];
  pastGifts: string;
  // Results
  directions: GiftDirection[];
  isGenerating: boolean;
  error: string | null;
}

interface GiftFlowActions {
  setOccasion: (v: string) => void;
  setRecipientName: (v: string) => void;
  setRelationship: (v: string) => void;
  setBudgetMin: (v: number) => void;
  setBudgetMax: (v: number) => void;
  togglePersonality: (tag: string) => void;
  addInterest: (interest: Interest) => void;
  removeInterest: (index: number) => void;
  setPastGifts: (v: string) => void;
  setDirections: (d: GiftDirection[]) => void;
  setIsGenerating: (v: boolean) => void;
  setError: (v: string | null) => void;
  reset: () => void;
}

const GiftFlowContext = createContext<(GiftFlowState & GiftFlowActions) | null>(null);

const DEFAULT_STATE: GiftFlowState = {
  occasion: "Birthday",
  recipientName: "Priya",
  relationship: "Close",
  budgetMin: 1500,
  budgetMax: 3000,
  personalityTypes: new Set(["Creative", "Outdoorsy"]),
  interests: [
    { name: "Photography", intensity: "Strong interest", color: "#0EA5E9" },
    { name: "Travel", intensity: "Sometimes", color: "#818CF8" },
    { name: "Design & Art", intensity: "Mild interest", color: "#F472B6" },
  ],
  pastGifts: "",
  directions: [],
  isGenerating: false,
  error: null,
};

export function GiftFlowProvider({ children }: { children: ReactNode }) {
  const [occasion, setOccasion] = useState(DEFAULT_STATE.occasion);
  const [recipientName, setRecipientName] = useState(DEFAULT_STATE.recipientName);
  const [relationship, setRelationship] = useState(DEFAULT_STATE.relationship);
  const [budgetMin, setBudgetMin] = useState(DEFAULT_STATE.budgetMin);
  const [budgetMax, setBudgetMax] = useState(DEFAULT_STATE.budgetMax);
  const [personalityTypes, setPersonalityTypes] = useState(DEFAULT_STATE.personalityTypes);
  const [interests, setInterests] = useState(DEFAULT_STATE.interests);
  const [pastGifts, setPastGifts] = useState(DEFAULT_STATE.pastGifts);
  const [directions, setDirections] = useState<GiftDirection[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const togglePersonality = useCallback((tag: string) => {
    setPersonalityTypes((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const addInterest = useCallback((interest: Interest) => {
    setInterests((prev) => [...prev, interest]);
  }, []);

  const removeInterest = useCallback((index: number) => {
    setInterests((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const reset = useCallback(() => {
    setOccasion(DEFAULT_STATE.occasion);
    setRecipientName(DEFAULT_STATE.recipientName);
    setRelationship(DEFAULT_STATE.relationship);
    setBudgetMin(DEFAULT_STATE.budgetMin);
    setBudgetMax(DEFAULT_STATE.budgetMax);
    setPersonalityTypes(new Set(DEFAULT_STATE.personalityTypes));
    setInterests([...DEFAULT_STATE.interests]);
    setPastGifts("");
    setDirections([]);
    setIsGenerating(false);
    setError(null);
  }, []);

  return (
    <GiftFlowContext.Provider
      value={{
        occasion, setOccasion,
        recipientName, setRecipientName,
        relationship, setRelationship,
        budgetMin, setBudgetMin,
        budgetMax, setBudgetMax,
        personalityTypes, togglePersonality,
        interests, addInterest, removeInterest,
        pastGifts, setPastGifts,
        directions, setDirections,
        isGenerating, setIsGenerating,
        error, setError,
        reset,
      }}
    >
      {children}
    </GiftFlowContext.Provider>
  );
}

export function useGiftFlow() {
  const ctx = useContext(GiftFlowContext);
  if (!ctx) throw new Error("useGiftFlow must be used within GiftFlowProvider");
  return ctx;
}
