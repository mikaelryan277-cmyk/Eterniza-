import { motion } from 'motion/react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // We map the steps to conceptual progress
  // Step 2-3: Personalização (25-40%)
  // Step 4-5: Fotos (60-80%)
  // Step 6-7: Reencontro (90-100%)
  
  const getProgress = () => {
    if (currentStep <= 3) return 25 + (currentStep - 2) * 15;
    if (currentStep <= 5) return 60 + (currentStep - 4) * 20;
    return 95;
  };

  const getLabel = () => {
    if (currentStep <= 3) return 'PERSONALIZAR';
    if (currentStep <= 5) return 'FOTOS';
    return 'REENCONTRO';
  };

  const progress = getProgress();

  return (
    <div className="max-w-md mx-auto px-6 mb-8 mt-6">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#C5A059]">{getLabel()}</span>
        <span className="text-[10px] font-bold text-[#5F6672]">{progress}%</span>
      </div>
      <div className="h-[2px] w-full bg-[#E5E1D8] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-[#C5A059]"
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
