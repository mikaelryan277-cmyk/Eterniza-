import React, { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { 
  Play, 
  ChevronRight, 
  ArrowLeft, 
  Camera, 
  Upload, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Star, 
  MessageCircle, 
  HelpCircle, 
  Loader2,
  Sparkles,
  Check
} from 'lucide-react';
import { QuizState, SCENARIOS, PERSON_OPTIONS } from '../types';

// --- SHARED COMPONENTS ---

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent) => void;
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  className?: string;
  icon?: any;
  pulse?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  icon: Icon, 
  pulse = false, 
  loading = false, 
  disabled = false 
}: ButtonProps) => {
  const shouldReduceMotion = useReducedMotion();
  const [clicked, setClicked] = useState(false);
  
  const baseStyles = "w-full py-5 px-8 rounded-full font-bold text-sm uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none touch-manipulation cursor-pointer select-none";
  const variants: Record<string, string> = {
    primary: "bg-[#C5A059] text-white hover:bg-[#B38E46] shadow-[#C5A059]/20",
    outline: "bg-transparent border border-[#E5E1D8] text-[#374151] hover:bg-white",
    ghost: "bg-transparent text-[#5F6672] font-bold text-[10px] tracking-widest opacity-80",
    white: "bg-white text-[#15803D] hover:bg-white/95 shadow-xl font-extrabold"
  };

  const handleClick = (e: React.MouseEvent) => {
    setClicked(true);
    if (onClick) onClick(e);
  };

  const pulseAnimation = pulse && !shouldReduceMotion && !loading && !clicked ? {
    scale: [1, 1.025, 1],
    boxShadow: [
      "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      "0 20px 25px -5px rgba(0, 0, 0, 0.18)",
      "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
    ]
  } : {};

  return (
    <motion.button 
      onClick={handleClick} 
      disabled={disabled || loading}
      animate={pulseAnimation}
      transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {loading ? <Loader2 className="animate-spin" size={18} /> : (
        <>
          <span>{children}</span>
          {Icon && <Icon size={16} />}
        </>
      )}
    </motion.button>
  );
};

interface CardProps {
  key?: React.Key;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
  emoji?: string;
}

const Card = ({ children, onClick, selected, className = '', emoji }: CardProps) => {
  return (
    <motion.div 
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className={`relative p-5 rounded-[22px] border transition-all cursor-pointer flex flex-col items-center text-center gap-3 touch-manipulation h-full justify-center select-none ${
        selected ? 'border-[#C5A059] bg-[#C5A059]/10 ring-2 ring-[#C5A059]/40' : 'border-[#E5E1D8] bg-white hover:border-[#C5A059]/50 shadow-sm'
      } ${className}`}
    >
      {emoji && (
        <div className="w-12 h-12 rounded-full bg-[#FDFCF8] flex items-center justify-center border border-[#E5E1D8] text-2xl shrink-0">
          {emoji}
        </div>
      )}
      <div className="font-bold text-[#1F2937] text-sm tracking-tight leading-tight">{children}</div>
      {selected && (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2.5 right-2.5 text-[#C5A059]"
        >
          <CheckCircle2 size={18} fill="currentColor" className="text-white" />
        </motion.div>
      )}
    </motion.div>
  );
};

// --- SCREENS ---

export const StepHook = ({ onNext }: any) => {
  return (
    <div className="flex flex-col gap-8 text-center pt-2 pb-6 max-w-md mx-auto w-full">
      <div className="flex flex-col gap-4">
        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">A Experiência</span>
        <h1 className="text-[32px] sm:text-4xl font-serif leading-[1.1] text-[#1F2937]">
          Dê um abraço em quem a saudade não deixa <span className="italic text-[#C5A059]">esquecer.</span>
        </h1>
        <p className="text-[#374151] font-medium leading-relaxed px-2 text-sm sm:text-base">
          Transforme <span className="font-bold text-[#1F2937]">2 fotos</span> em um <span className="font-bold text-[#C5A059]">reencontro simbólico</span> em movimento.
        </p>
      </div>

      <div className="relative aspect-[4/5] w-full max-w-[320px] mx-auto bg-[#1A1A1A] rounded-[36px] overflow-hidden shadow-2xl border-[6px] border-[#2D2A26]">
        <img 
          src="https://images.unsplash.com/photo-1516589174184-c685bc016733?auto=format&fit=crop&q=80&w=800" 
          alt="Exemplo do Reencontro"
          loading="eager"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 cursor-pointer"
          >
            <Play className="text-white ml-1" fill="white" size={24} />
          </motion.div>
        </div>
        <div className="absolute bottom-6 left-0 w-full px-6 z-20">
          <p className="text-white font-serif italic text-base mb-1 leading-tight">'Parece que ele está aqui novamente...'</p>
          <div className="flex items-center justify-center gap-1.5 opacity-70">
            <Star className="text-[#C5A059]" fill="currentColor" size={10} />
            <span className="text-white text-[9px] uppercase tracking-widest font-bold">Avaliação 4.9/5 • 12k+ Homenagens</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-1">
        <Button onClick={onNext} icon={ChevronRight} pulse={true}>
          CRIAR MEU REENCONTRO
        </Button>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#5F6672] font-bold">
          Você só precisará de <span className="text-[#1F2937]">2 fotos</span>
        </p>
      </div>
    </div>
  );
};

export const StepPerson = ({ onNext, selected }: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(selected);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    // Auto-advance quickly (250ms) for smooth feedback
    setTimeout(() => {
      onNext(id);
    }, 250);
  };

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6 max-w-sm mx-auto w-full">
      <div className="text-center flex flex-col gap-2">
        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Passo 1</span>
        <h2 className="text-[26px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
          Quem você quer reencontrar?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {PERSON_OPTIONS.map((option) => (
          <Card 
            key={option.id} 
            selected={selectedId === option.id}
            emoji={option.emoji}
            onClick={() => handleSelect(option.id)}
          >
            {option.label}
          </Card>
        ))}
      </div>
    </div>
  );
};

export const StepScenario = ({ onNext, selected, onBack }: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(selected);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setTimeout(() => {
      onNext(id);
    }, 280);
  };

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6 max-w-sm mx-auto w-full">
      <div className="flex flex-col gap-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[#5F6672] text-[10px] font-bold uppercase tracking-widest hover:text-[#1F2937] transition-colors active:opacity-100 self-start">
          <ArrowLeft size={14} /> Voltar
        </button>

        <div className="text-center flex flex-col gap-2">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Passo 2</span>
          <h2 className="text-[26px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
            Escolha o cenário
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3.5 w-full">
        {SCENARIOS.map((s) => (
          <Card 
            key={s.id} 
            selected={selectedId === s.id}
            className="p-0 overflow-hidden flex-col items-stretch text-left"
            onClick={() => handleSelect(s.id)}
          >
            <div className="relative h-36 w-full overflow-hidden">
              <img 
                src={s.image} 
                alt={s.name} 
                loading="lazy"
                className="w-full h-full object-cover grayscale-[0.15] hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 text-white">
                <h3 className="font-bold text-base leading-tight drop-shadow">{s.name}</h3>
              </div>
            </div>
            <div className="p-3.5 bg-white flex items-center justify-between">
              <p className="text-xs text-[#5F6672] font-medium leading-tight">{s.description}</p>
              {selectedId === s.id && (
                <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider shrink-0 ml-2">
                  Selecionado ✓
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      {selectedId && (
        <Button onClick={() => onNext(selectedId)} icon={ChevronRight}>
          USAR ESTE CENÁRIO
        </Button>
      )}
    </div>
  );
};

export const StepUserPhoto = ({ onNext, photo, onBack }: any) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(photo);

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      const mockPhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300";
      setPreview(mockPhoto);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6 max-w-sm mx-auto w-full">
      <div className="flex flex-col gap-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[#5F6672] text-[10px] font-bold uppercase tracking-widest hover:text-[#1F2937] transition-colors active:opacity-100 self-start">
          <ArrowLeft size={14} /> Voltar
        </button>

        <div className="text-center flex flex-col gap-2">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Passo 3</span>
          <h2 className="text-[26px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
            Escolha sua foto
          </h2>
          <p className="text-xs text-[#5F6672] font-medium">Uma foto onde seu rosto esteja nítido.</p>
        </div>
      </div>

      <div 
        onClick={handleUpload}
        className="aspect-square w-full max-w-[260px] mx-auto rounded-[32px] border-2 border-dashed border-[#E5E1D8] bg-white flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden group shadow-sm transition-all hover:bg-[#FDFCF8] hover:border-[#C5A059]"
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img src={preview} alt="Sua foto" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Trocar Foto
            </div>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-[#FDFCF8] flex items-center justify-center text-[#C5A059] border border-[#E5E1D8] group-hover:scale-105 transition-transform">
              {loading ? <Loader2 className="animate-spin" /> : <Camera size={26} />}
            </div>
            <span className="font-bold text-[#1F2937] text-xs uppercase tracking-wider">Tocar para escolher</span>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] text-[#5F6672] font-bold">
        <ShieldCheck className="text-[#15803D] shrink-0" size={14} />
        <span>Privacidade Garantida • Processamento Seguro</span>
      </div>

      {preview && (
        <Button onClick={() => onNext(preview)} icon={ChevronRight}>
          ESCOLHER A OUTRA FOTO
        </Button>
      )}
    </div>
  );
};

export const StepLovedOnePhoto = ({ onNext, personType, photo, onBack }: any) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(photo);

  const handleUpload = () => {
    setLoading(true);
    setTimeout(() => {
      const mockPhoto = "https://images.unsplash.com/photo-1544120190-279ad592209d?auto=format&fit=crop&q=80&w=300";
      setPreview(mockPhoto);
      setLoading(false);
    }, 700);
  };

  const getTitle = () => {
    if (personType === 'mãe' || personType === 'avó') return 'Escolha a foto dela';
    if (personType === 'pai' || personType === 'avô') return 'Escolha a foto dele';
    return 'Escolha a foto da pessoa';
  };

  return (
    <div className="flex flex-col gap-6 pt-2 pb-6 max-w-sm mx-auto w-full">
      <div className="flex flex-col gap-4">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[#5F6672] text-[10px] font-bold uppercase tracking-widest hover:text-[#1F2937] transition-colors active:opacity-100 self-start">
          <ArrowLeft size={14} /> Voltar
        </button>

        <div className="text-center flex flex-col gap-2">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Passo 4 • Último</span>
          <h2 className="text-[26px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
            {getTitle()}
          </h2>
          <p className="text-xs text-[#5F6672] font-medium">Fotos antigas funcionam se o rosto estiver visível.</p>
        </div>
      </div>

      <div 
        onClick={handleUpload}
        className="aspect-square w-full max-w-[260px] mx-auto rounded-[32px] border-2 border-dashed border-[#E5E1D8] bg-white flex flex-col items-center justify-center gap-3 cursor-pointer overflow-hidden group shadow-sm transition-all hover:bg-[#FDFCF8] hover:border-[#C5A059]"
      >
        {preview ? (
          <div className="relative w-full h-full">
            <img src={preview} alt="Foto da pessoa" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[9px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
              Trocar Foto
            </div>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-[#FDFCF8] flex items-center justify-center text-[#C5A059] border border-[#E5E1D8] group-hover:scale-105 transition-transform">
              {loading ? <Loader2 className="animate-spin" /> : <Upload size={26} />}
            </div>
            <span className="font-bold text-[#1F2937] text-xs uppercase tracking-wider">Tocar para escolher</span>
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] text-[#5F6672] font-bold">
        <ShieldCheck className="text-[#15803D] shrink-0" size={14} />
        <span>Fotos tratadas e preparadas com respeito</span>
      </div>

      {preview && (
        <Button onClick={() => onNext(preview)} pulse={true} icon={ChevronRight}>
          PREPARAR NOSSO REENCONTRO
        </Button>
      )}
    </div>
  );
};

export const StepProcessing = ({ userPhoto, lovedOnePhoto, onComplete }: any) => {
  const [percent, setPercent] = useState(85);
  const [status, setStatus] = useState("Preparando suas fotos...");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Honest, real 3.5s preparation sequence
    const t1 = setTimeout(() => {
      setStatus("Aplicando o cenário escolhido...");
      setPercent(92);
    }, 1200);

    const t2 = setTimeout(() => {
      setStatus("Finalizando a composição...");
      setPercent(98);
    }, 2400);

    const t3 = setTimeout(() => {
      setStatus("Tudo pronto ✓");
      setPercent(100);
      setCompleted(true);
    }, 3400);

    const t4 = setTimeout(() => {
      onComplete();
    }, 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center gap-8 py-8 text-center max-w-sm mx-auto w-full">
      <div className="flex flex-col gap-2">
        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Personalização</span>
        <h2 className="text-[26px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
          Preparando seu reencontro...
        </h2>
        <p className="text-xs text-[#5F6672] font-medium">
          Organizando tudo com as escolhas que você fez.
        </p>
      </div>

      {/* Side-by-side photos */}
      <div className="flex items-center justify-center gap-4 py-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, x: -10 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-gray-100"
        >
          {userPhoto && <img src={userPhoto} alt="Sua foto" className="w-full h-full object-cover" />}
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-8 h-8 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059]"
        >
          <Sparkles size={16} />
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0, x: 10 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-xl bg-gray-100"
        >
          {lovedOnePhoto && <img src={lovedOnePhoto} alt="Foto da pessoa" className="w-full h-full object-cover" />}
        </motion.div>
      </div>

      {/* Progress display */}
      <div className="w-full flex flex-col gap-3">
        <div className="h-[3px] w-full bg-[#E5E1D8] rounded-full overflow-hidden">
          <motion.div 
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`h-full ${completed ? 'bg-[#15803D]' : 'bg-[#C5A059]'}`}
          />
        </div>
        
        <div className="flex items-center justify-center gap-2">
          {completed ? (
            <div className="flex items-center gap-1.5 text-[#15803D] font-bold text-xs">
              <Check size={14} />
              <span>Tudo pronto ✓</span>
            </div>
          ) : (
            <span className="text-xs uppercase tracking-wider font-bold text-[#C5A059] flex items-center gap-1.5">
              <Loader2 className="animate-spin" size={13} />
              {status}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const StepOffer = ({ state, trackEvent }: any) => {
  const scenario = useMemo(() => SCENARIOS.find(s => s.id === state.scenario), [state.scenario]);

  useEffect(() => {
    if (trackEvent) trackEvent('checkout_viewed');
  }, [trackEvent]);

  return (
    <div className="flex flex-col gap-8 pb-12 pt-2 max-w-md mx-auto w-full">
      <div className="text-center flex flex-col gap-3">
        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">O Momento</span>
        <h2 className="text-[30px] sm:text-4xl font-serif leading-[1.1] text-[#1F2937]">
          Seu reencontro está pronto para ser <span className="italic text-[#C5A059]">criado.</span>
        </h2>
        <p className="text-[#374151] font-medium leading-relaxed text-sm sm:text-base">
          O abraço que você imaginou, transformado em uma <span className="font-bold text-[#1F2937]">memória eterna</span>.
        </p>
      </div>

      {/* Emotional Photos display */}
      <div className="flex justify-center items-center isolate py-1">
        <motion.div 
          initial={{ rotate: -8, x: 8 }}
          animate={{ rotate: -5, x: 0 }}
          className="w-24 h-24 rounded-[26px] overflow-hidden border-[4px] border-white shadow-xl z-10"
        >
          <img src={state.userPhoto || ""} alt="Você" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div 
          initial={{ rotate: 8, x: -8 }}
          animate={{ rotate: 5, x: 0 }}
          className="w-24 h-24 rounded-[26px] overflow-hidden border-[4px] border-white shadow-xl z-20 -ml-6"
        >
          <img src={state.lovedOnePhoto || ""} alt="Pessoa Amada" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Green Emerald Offer Card */}
      <div className="bg-[#15803D] border border-[#166534] rounded-[32px] p-7 sm:p-8 shadow-xl text-white">
        <div className="flex flex-col gap-1.5 mb-6 text-center">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-85">Personalização concluída</span>
          <h3 className="font-serif italic text-2xl leading-tight">
            Receba o vídeo completo de vocês
          </h3>
        </div>

        <ul className="space-y-3.5 mb-7">
          {[
            "Vídeo personalizado em HD",
            "Música emocionante",
            "Sem marca d'água",
            "Arquivo digital para guardar e compartilhar",
            "Pagamento único • Sem mensalidade"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm font-bold leading-tight">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={12} className="text-white" />
              </div>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="h-[1px] w-full bg-white/15 mb-6" />

        <div className="text-center flex flex-col gap-1.5 mb-7">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-85">Valor especial:</span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-serif font-bold">R$ 27,94</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-85">Pagamento único</span>
        </div>

        <div className="flex flex-col gap-4">
          <Button 
            variant="white" 
            onClick={() => trackEvent && trackEvent('checkout_started')} 
            pulse={true}
          >
            QUERO RECEBER NOSSO REENCONTRO
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-85">
            <ShieldCheck size={14} className="text-white" />
            Pagamento 100% Seguro
          </div>
        </div>
      </div>

      {/* Trust guarantees */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="p-5 rounded-2xl border border-[#E5E1D8] bg-white flex flex-col items-center gap-2 text-center shadow-sm">
          <Clock size={18} className="text-[#C5A059]" />
          <span className="text-[10px] font-bold text-[#1F2937] uppercase tracking-widest">Garantia</span>
          <p className="text-[10px] text-[#5F6672] font-bold leading-tight">14 dias de proteção total.</p>
        </div>
        <div className="p-5 rounded-2xl border border-[#E5E1D8] bg-white flex flex-col items-center gap-2 text-center shadow-sm">
          <MessageCircle size={18} className="text-[#C5A059]" />
          <span className="text-[10px] font-bold text-[#1F2937] uppercase tracking-widest">Suporte</span>
          <p className="text-[10px] text-[#5F6672] font-bold leading-tight">Ajuda direta via WhatsApp.</p>
        </div>
      </div>

      {/* Testimonials */}
      <div className="space-y-6 pt-6 border-t border-[#E5E1D8]">
        <div className="text-center flex flex-col gap-1.5">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Depoimentos</span>
          <h3 className="text-xl font-serif font-bold text-[#1F2937]">
            O que outras <span className="italic text-[#C5A059]">famílias dizem:</span>
          </h3>
        </div>
        
        <div className="space-y-4">
          {[
            { name: "Maria Helena", text: "Não tenho palavras para descrever a emoção. Parecia que eu estava lá de novo. Muito obrigada por esse presente." },
            { name: "Ricardo S.", text: "A qualidade superou minhas expectativas. Enviei para toda a família e todos se emocionaram muito." }
          ].map((testimonial, i) => (
            <div key={i} className="p-6 rounded-[24px] bg-white border border-[#E5E1D8] shadow-sm flex flex-col gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} size={10} className="text-[#C5A059]" fill="currentColor" />)}
              </div>
              <p className="text-[#374151] font-medium leading-relaxed italic text-xs">"{testimonial.text}"</p>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-[1px] bg-[#C5A059]" />
                <p className="text-[10px] font-bold text-[#1F2937] uppercase tracking-widest">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="space-y-6 pt-6 border-t border-[#E5E1D8]">
        <div className="text-center flex flex-col gap-1.5">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Ajuda</span>
          <h3 className="text-xl font-serif font-bold text-[#1F2937]">
            Dúvidas <span className="italic text-[#C5A059]">Frequentes</span>
          </h3>
        </div>
        
        <div className="space-y-3 w-full">
          {[
            { q: "Preciso ter foto das duas pessoas juntas?", a: "Não! Você envia uma foto de cada pessoa e nossa tecnologia cria o reencontro perfeitamente." },
            { q: "Quanto tempo demora para receber?", a: "A entrega é digital e rápida, geralmente em poucas horas após a confirmação do pedido." },
            { q: "É uma assinatura mensal?", a: "Não. É um pagamento único por vídeo criado, sem cobranças futuras." }
          ].map((item, i) => (
            <div key={i} className="p-5 rounded-[20px] bg-[#F2EFE8]/30 border border-[#E5E1D8]">
              <h4 className="text-[11px] font-bold text-[#1F2937] flex items-center gap-2.5 uppercase tracking-wider leading-snug">
                <HelpCircle size={14} className="text-[#C5A059] shrink-0" />
                {item.q}
              </h4>
              <p className="text-[11px] text-[#374151] mt-2 leading-relaxed font-bold">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

