import { motion } from 'motion/react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  overrideProgress?: number;
}

export function ProgressBar({ currentStep, overrideProgress }: ProgressBarProps) {
  // Step mapping:
  // Step 2 (Pessoa): 25%
  // Step 3 (Cenário): 40%
  // Step 4 (Sua foto): 55%
  // Step 5 (Foto da pessoa): 70%
  // Step 6 (Preparação): 85% -> 100%
  // Step 7 (Oferta): 100%

  const getProgressData = () => {
    if (overrideProgress !== undefined) {
      if (overrideProgress >= 100) return { percent: 100, label: 'Tudo pronto ✓' };
      return { percent: overrideProgress, label: 'Preparando reencontro' };
    }
    
    switch (currentStep) {
      case 2:
        return { percent: 25, label: 'Quem reencontrar' };
      case 3:
        return { percent: 40, label: 'Escolha do cenário' };
      case 4:
        return { percent: 55, label: 'Quase lá' };
      case 5:
        return { percent: 70, label: 'Só falta uma foto' };
      case 6:
        return { percent: 85, label: 'Preparando...' };
      case 7:
        return { percent: 100, label: 'Tudo pronto ✓' };
      default:
        return { percent: 10, label: 'Início' };
    }
  };

  const { percent, label } = getProgressData();

  return (
    <div className="max-w-md mx-auto px-6 mb-6 mt-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#C5A059]">{label}</span>
        <span className="text-[11px] font-bold text-[#1F2937] font-mono">{percent}%</span>
      </div>
      <div className="h-[3px] w-full bg-[#E5E1D8] rounded-full overflow-hidden">
        <motion.div 
          initial={false}
          animate={{ width: `${percent}%` }}
          className="h-full bg-[#C5A059] rounded-full"
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

