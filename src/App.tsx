import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizState } from './types';
import { 
  StepHook, 
  StepPerson, 
  StepScenario, 
  StepUserPhoto, 
  StepLovedOnePhoto, 
  StepProcessing, 
  StepOffer 
} from './components/StepScreens';
import { ProgressBar } from './components/ProgressBar';

export default function App() {
  const [state, setState] = useState<QuizState>({
    step: 1,
    personType: null,
    scenario: null,
    userPhoto: null,
    lovedOnePhoto: null,
  });

  // Analytics helper
  const trackEvent = (eventName: string, data?: any) => {
    console.log(`[Analytics] ${eventName}`, data);
  };

  useEffect(() => {
    // Initial tracking
    if (state.step === 1) {
      trackEvent('quiz_started');
    }

    // Smart Prefetching
    const prefetchImages = (urls: string[]) => {
      urls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    if (state.step === 1) {
      // Prefetch common scenario thumbnails after first fold is stable
      setTimeout(() => {
        prefetchImages([
          'https://fast.wistia.com/assets/external/pimg/gx6y11c30j.jpg',
          'https://fast.wistia.com/assets/external/pimg/kxy56tsisw.jpg',
          'https://fast.wistia.com/assets/external/pimg/ex2z5dafc6.jpg',
          'https://fast.wistia.com/assets/external/pimg/10trcist3m.jpg'
        ]);
      }, 2000);
    } else if (state.step === 4 || state.step === 5) {
      // Prefetch offer reviews when near the end
      prefetchImages([
        'https://i.imgur.com/nfxMrrM.png',
        'https://i.imgur.com/nfxMrrM.jpeg',
        'https://i.imgur.com/A5LjhhH.png',
        'https://i.imgur.com/A5LjhhH.jpeg'
      ]);
    }
  }, [state.step]);

  const nextStep = () => {
    setState(prev => ({ ...prev, step: prev.step + 1 }));
    window.scrollTo({ top: 0, behavior: 'auto' }); // Faster than smooth for performance feel
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const updateState = (updates: Partial<QuizState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return <StepHook onNext={nextStep} trackEvent={trackEvent} />;
      case 2:
        return (
          <StepPerson 
            onNext={(person: any) => {
              updateState({ personType: person });
              trackEvent('person_selected', { person });
              nextStep();
            }} 
            selected={state.personType}
          />
        );
      case 3:
        return (
          <StepScenario 
            onNext={(scenario: any) => {
              updateState({ scenario: scenario });
              trackEvent('scenario_selected', { scenario });
              nextStep();
            }} 
            selected={state.scenario}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <StepUserPhoto 
            onNext={(photo: any) => {
              updateState({ userPhoto: photo });
              trackEvent('photo_1_uploaded');
              nextStep();
            }} 
            photo={state.userPhoto}
            onBack={prevStep}
          />
        );
      case 5:
        return (
          <StepLovedOnePhoto 
            onNext={(photo: any) => {
              updateState({ lovedOnePhoto: photo });
              trackEvent('photo_2_uploaded');
              nextStep();
            }} 
            personType={state.personType}
            photo={state.lovedOnePhoto}
            onBack={prevStep}
          />
        );
      case 6:
        return (
          <StepProcessing 
            userPhoto={state.userPhoto}
            lovedOnePhoto={state.lovedOnePhoto}
            onComplete={() => {
              trackEvent('preparation_completed');
              nextStep();
            }} 
          />
        );
      case 7:
        return <StepOffer state={state} trackEvent={trackEvent} />;
      default:
        return <StepHook onNext={nextStep} trackEvent={trackEvent} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2A26] font-sans flex flex-col overflow-x-hidden selection:bg-[#C5A059]/30">
      
      {state.step > 1 && (
        <ProgressBar currentStep={state.step} />
      )}

      <main className="flex-1 max-w-md mx-auto px-5 pb-12 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

