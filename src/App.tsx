import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuizState, PersonType, ScenarioType } from './types';
import { 
  StepHook, 
  StepPerson, 
  StepScenario, 
  StepUserPhoto, 
  StepLovedOnePhoto, 
  StepProcessing, 
  StepPreview, 
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
  }, []);

  const nextStep = () => {
    setState(prev => ({ ...prev, step: prev.step + 1 }));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
      window.scrollTo(0, 0);
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
            onNext={(person) => {
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
            onNext={(scenario) => {
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
            onNext={(photo) => {
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
            onNext={(photo) => {
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
              trackEvent('processing_completed');
              nextStep();
            }} 
          />
        );
      case 7:
        return (
          <StepPreview 
            state={state}
            onNext={() => {
              trackEvent('preview_viewed');
              nextStep();
            }} 
            onBack={prevStep}
          />
        );
      case 8:
        return <StepOffer state={state} trackEvent={trackEvent} />;
      default:
        return <StepHook onNext={nextStep} trackEvent={trackEvent} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#2D2A26] font-sans flex flex-col overflow-x-hidden selection:bg-[#C5A059]/30">
      
      {state.step > 1 && state.step < 8 && (
        <ProgressBar currentStep={state.step} totalSteps={7} />
      )}

      <main className="flex-1 max-w-md mx-auto px-6 pb-12 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
