"use client";

import { motion, AnimatePresence } from "framer-motion";
import GiftSuggestionCard, { type GiftSuggestion } from "./GiftSuggestionCard";

interface ResultsBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: GiftSuggestion[];
  error?: string | null;
}

export default function ResultsBottomSheet({
  isOpen,
  onClose,
  suggestions,
  error,
}: ResultsBottomSheetProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm"
          />
          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto bg-surface-container-low rounded-t-3xl"
          >
            {/* Handle */}
            <div className="sticky top-0 z-10 flex justify-center pt-3 pb-2 bg-surface-container-low rounded-t-3xl">
              <div className="w-10 h-1 rounded-full bg-outline-variant" />
            </div>

            <div className="px-6 pb-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[22px] font-bold text-on-background tracking-tight">
                    Gift Directions
                  </h2>
                  <p className="text-[13px] text-on-surface-variant mt-1">
                    AI-curated suggestions for Priya
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-on-surface-variant">
                    close
                  </span>
                </button>
              </div>

              {/* Error state */}
              {error && (
                <div className="p-4 bg-error-container rounded-2xl mb-4">
                  <p className="text-sm text-on-error-container font-medium">
                    {error}
                  </p>
                </div>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="space-y-3">
                  {suggestions.map((suggestion, i) => (
                    <GiftSuggestionCard key={i} suggestion={suggestion} />
                  ))}
                </div>
              )}

              {!error && suggestions.length === 0 && (
                <p className="text-center text-on-surface-variant py-8">
                  No suggestions generated. Try adding more details to the
                  profile.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
