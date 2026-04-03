"use client";

interface GenerateButtonProps {
  isLoading: boolean;
  onClick: () => void;
}

export default function GenerateButton({
  isLoading,
  onClick,
}: GenerateButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-background via-background/95 to-transparent z-40">
      <button
        disabled={isLoading}
        onClick={onClick}
        className="w-full max-w-[390px] mx-auto h-16 bg-gradient-to-r from-secondary-container to-[#0089CC] text-on-primary rounded-2xl font-bold text-lg shadow-[0px_8px_32px_rgba(57,184,253,0.3)] active:scale-95 duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Generating…
          </>
        ) : (
          <>
            Generate Gift Directions
            <span className="material-symbols-outlined text-xl">
              arrow_forward
            </span>
          </>
        )}
      </button>
    </div>
  );
}
