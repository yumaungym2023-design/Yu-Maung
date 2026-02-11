
import React, { useState } from 'react';
import { UserProfile } from '../types';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  isDarkMode: boolean;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete, isDarkMode }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    gender: '',
    vibe: '',
    occasion: '',
    collection: []
  });

  const steps = [
    {
      question: "ဘယ်သူ့အတွက်လဲ?",
      key: 'gender',
      options: [
        { label: 'Male', value: 'Male', icon: '♂️' },
        { label: 'Female', value: 'Female', icon: '♀️' },
        { label: 'Unisex', value: 'Unisex', icon: '⚧️' }
      ]
    },
    {
      question: "ဘယ်လို Vibe ကြိုက်လဲ?",
      key: 'vibe',
      options: [
        { label: 'Fresh', value: 'Fresh', icon: '🌊' },
        { label: 'Woody', value: 'Woody', icon: '🌲' },
        { label: 'Floral', value: 'Floral', icon: '🌸' },
        { label: 'Spicy', value: 'Spicy', icon: '🌶️' }
      ]
    },
    {
      question: "ဘယ်အချိန်မှာ အဓိက သုံးမှာလဲ?",
      key: 'occasion',
      options: [
        { label: 'Work', value: 'Work', icon: '💼' },
        { label: 'Date', value: 'Date', icon: '🕯️' },
        { label: 'Sports', value: 'Sports', icon: '🏃' },
        { label: 'Party', value: 'Party', icon: '✨' }
      ]
    }
  ];

  const handleSelect = (value: string) => {
    const currentKey = steps[step].key;
    const newProfile = { ...profile, [currentKey]: value };
    setProfile(newProfile);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(newProfile);
    }
  };

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-white/80 dark:bg-black/90 backdrop-blur-2xl">
      <div className="max-w-md w-full glass-panel rounded-[3rem] p-10 shadow-2xl animate-in zoom-in fade-in duration-500 text-center border border-yellow-500/20">
        <div className="mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-600">Step {step + 1} of 3</span>
          <h2 className="luxury-font text-3xl font-black mt-4 tracking-tight">{currentStep.question}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {currentStep.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className="flex items-center justify-between px-8 py-5 rounded-2xl glass-card border border-yellow-500/10 hover:border-yellow-500 hover:scale-[1.02] transition-all group active:scale-95"
            >
              <span className="text-2xl">{opt.icon}</span>
              <span className="font-bold luxury-font tracking-widest text-sm">{opt.label}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-center space-x-2">
          {steps.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === step ? 'w-8 bg-yellow-500' : 'w-2 bg-yellow-500/20'}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
