"use client";

interface ProgressStepperProps {
  currentStep: number; // 1, 2, or 3
}

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  const getStepColor = (step: number) => {
    if (step < currentStep) return "bg-primary-container";
    if (step === currentStep) return "bg-secondary-container";
    return "bg-surface-container-highest";
  };

  return (
    <div className="flex items-center justify-between gap-2 mb-10">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`flex-1 h-1.5 rounded-full ${getStepColor(step)}`}
        />
      ))}
    </div>
  );
}
