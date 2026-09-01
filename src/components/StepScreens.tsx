import { useState, useEffect, useMemo } from 'react';
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
  Video,
  Loader2
} from 'lucide-react';
import { QuizState, PersonType, ScenarioType, SCENARIOS, PERSON_OPTIONS } from '../types';

// --- SHARED COMPONENTS ---

const Button = ({ children, onClick, variant = 'primary', className = '', icon: Icon, pulse = false, loading = false, disabled = false }: any) => {
  const shouldReduceMotion = useReducedMotion();
  const [clicked, setClicked] = useState(false);
  
  const baseStyles = "w-full py-5 px-8 rounded-full font-bold text-sm uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-[0.95] disabled:opacity-50 disabled:pointer-events-none touch-manipulation";
  const variants: any = {
    primary: "bg-[#C5A059] text-white hover:bg-[#B38E46] shadow-[#C5A059]/20",
    outline: "bg-transparent border border-[#E5E1D8] text-[#374151] hover:bg-white",
    ghost: "bg-transparent text-[#5F6672] font-bold text-[10px] tracking-widest opacity-80",
    white: "bg-white text-[#15803D] hover:bg-white/90 shadow-xl"
  };

  const handleClick = (e: any) => {
    setClicked(true);
    if (onClick) onClick(e);
  };

  const pulseAnimation = pulse && !shouldReduceMotion && !loading && !clicked ? {
    scale: [1, 1.025, 1],
    boxShadow: [
      "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
      "0 20px 25px -5px rgba(0, 0, 0, 0.15)",
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
          {children}
          {Icon && <Icon size={16} />}
        </>
      )}
    </motion.button>
  );
};

const Card = ({ children, onClick, selected, className = '', emoji }: any) => {
  return (
    <motion.div 
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`relative p-6 rounded-[24px] border transition-all cursor-pointer flex flex-col items-center text-center gap-4 touch-manipulation h-full justify-center ${
        selected ? 'border-[#C5A059] bg-[#C5A059]/5' : 'border-[#E5E1D8] bg-white hover:border-[#C5A059]/50 shadow-sm'
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
          className="absolute top-3 right-3 text-[#C5A059]"
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
    <div className="flex flex-col gap-8 text-center pt-2 pb-6">
      <div className="flex flex-col gap-4">
        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">A Experiência</span>
        <h1 className="text-[32px] sm:text-4xl font-serif leading-[1.1] text-[#1F2937]">
          Dê um abraço em quem a saudade não deixa <span className="italic text-[#C5A059]">esquecer.</span>
        </h1>
        <p className="text-[#374151] font-medium leading-relaxed px-2 text-sm sm:text-base">
          Transforme <span className="font-bold">2 fotos</span> em um <span className="font-bold text-[#C5A059]">reencontro simbólico</span> em movimento. Uma homenagem única e sensível.
        </p>
      </div>

      <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto bg-[#1A1A1A] rounded-[40px] overflow-hidden shadow-2xl border-[6px] border-[#2D2A26]">
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
        <div className="absolute bottom-8 left-0 w-full px-6 z-20">
          <p className="text-white font-serif italic text-lg mb-1 leading-tight">'Parece que ele está aqui novamente...'</p>
          <div className="flex items-center justify-center gap-2 opacity-60">
            <Star className="text-[#C5A059]" fill="currentColor" size={10} />
            <span className="text-white text-[9px] uppercase tracking-widest font-bold">Avaliação 4.9/5 • 12k+ Famílias</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <Button onClick={onNext} icon={ChevronRight} pulse={true}>
          CRIAR MEU REENCONTRO
        </Button>
        <p className="text-[11px] uppercase tracking-[0.15em] text-[#6B7280] font-bold">
          Você só precisará de <span className="text-[#1F2937]">2 fotos</span>
        </p>
      </div>
    </div>
  );
};

export const StepPerson = ({ onNext, selected }: any) => {
  return (
    <div className="flex flex-col gap-8 pt-2 pb-6 max-w-sm mx-auto w-full">
      <div className="text-center flex flex-col gap-3">
        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Personalização</span>
        <h2 className="text-[28px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
          Quem você gostaria de abraçar novamente?
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full">
        {PERSON_OPTIONS.map((option) => (
          <Card 
            key={option.id} 
            selected={selected === option.id}
            emoji={option.emoji}
            onClick={() => {
              // Immediate feedback then advance
              setTimeout(() => onNext(option.id), 300);
            }}
          >
            {option.label}
          </Card>
        ))}
      </div>
    </div>
  );
};

export const StepScenario = ({ onNext, selected, onBack }: any) => {
  return (
    <div className="flex flex-col gap-8 pt-2 pb-6">
      <div className="flex flex-col gap-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[#5F6672] text-[10px] font-bold uppercase tracking-widest hover:text-[#1F2937] transition-colors active:opacity-100">
          <ArrowLeft size={14} /> Voltar
        </button>

        <div className="text-center flex flex-col gap-3">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Cenário</span>
          <h2 className="text-[28px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
            Como você gostaria de imaginar esse <span className="italic text-[#C5A059]">reencontro?</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto w-full">
        {SCENARIOS.map((s) => (
          <Card 
            key={s.id} 
            selected={selected === s.id}
            className="p-0 overflow-hidden flex-col items-stretch text-left"
            onClick={() => onNext(s.id)}
          >
            <div className="relative h-40 w-full overflow-hidden">
              <img 
                src={s.image} 
                alt={s.name} 
                loading="lazy"
                className="w-full h-full object-cover grayscale-[0.2] hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="p-5 bg-white">
              <h3 className="font-bold text-[#1F2937] text-lg leading-none mb-2 tracking-tight">{s.name}</h3>
              <p className="text-xs text-[#5F6672] font-medium leading-relaxed">{s.description}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const StepUserPhoto = ({ onNext, photo, onBack }: any) => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(photo);

  const handleUpload = () => {
    setLoading(true);
    // Simulating upload
    setTimeout(() => {
      const mockPhoto = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200";
      setPreview(mockPhoto);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 pt-2 pb-6 max-w-md mx-auto w-full">
      <div className="flex flex-col gap-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[#5F6672] text-[10px] font-bold uppercase tracking-widest hover:text-[#1F2937] transition-colors active:opacity-100 self-start">
          <ArrowLeft size={14} /> Voltar
        </button>

        <div className="text-center flex flex-col gap-3">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Suas Fotos</span>
          <h2 className="text-[28px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
            Agora escolha uma <span className="italic text-[#C5A059]">foto sua</span>
          </h2>
          <p className="text-sm text-[#5F6672] font-medium">Uma foto onde seu rosto esteja bem visível.</p>
        </div>
      </div>

      <div 
        onClick={handleUpload}
        className="aspect-square w-full max-w-[280px] mx-auto rounded-[40px] border-2 border-dashed border-[#E5E1D8] bg-white flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden group shadow-sm transition-all hover:bg-[#FDFCF8]"
      >
        {preview ? (
          <img src={preview} alt="Sua foto" className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-[#FDFCF8] flex items-center justify-center text-[#C5A059] border border-[#E5E1D8] group-hover:scale-110 transition-transform">
              {loading ? <Loader2 className="animate-spin" /> : <Camera size={32} />}
            </div>
            <span className="font-bold text-[#C5A059] text-[10px] uppercase tracking-widest">ESCOLHER MINHA FOTO</span>
          </>
        )}
      </div>

      <div className="flex items-start gap-3 bg-[#F2EFE8]/50 p-5 rounded-2xl border border-[#E5E1D8]">
        <ShieldCheck className="text-[#C5A059] shrink-0" size={18} />
        <p className="text-[11px] text-[#374151] leading-relaxed font-bold">
          Privacidade Garantida: Suas fotos são processadas com segurança e total respeito à sua privacidade.
        </p>
      </div>

      {preview && (
        <Button onClick={() => onNext(preview)} icon={ChevronRight}>
          CONTINUAR
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
      const mockPhoto = "https://images.unsplash.com/photo-1544120190-279ad592209d?auto=format&fit=crop&q=80&w=200";
      setPreview(mockPhoto);
      setLoading(false);
    }, 1000);
  };

  const getLabel = () => {
    if (!personType || personType === 'outro') return 'dessa pessoa especial';
    return `da sua ${personType}`;
  };

  return (
    <div className="flex flex-col gap-8 pt-2 pb-6 max-w-md mx-auto w-full">
      <div className="flex flex-col gap-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[#5F6672] text-[10px] font-bold uppercase tracking-widest hover:text-[#1F2937] transition-colors active:opacity-100 self-start">
          <ArrowLeft size={14} /> Voltar
        </button>

        <div className="text-center flex flex-col gap-3">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Homenagem</span>
          <h2 className="text-[28px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
            Agora escolha uma foto <span className="italic text-[#C5A059]">{getLabel()} 💛</span>
          </h2>
          <p className="text-sm text-[#5F6672] font-medium">Fotos antigas funcionam se o rosto estiver nítido.</p>
        </div>
      </div>

      <div 
        onClick={handleUpload}
        className="aspect-square w-full max-w-[280px] mx-auto rounded-[40px] border-2 border-dashed border-[#E5E1D8] bg-white flex flex-col items-center justify-center gap-4 cursor-pointer overflow-hidden group shadow-sm transition-all hover:bg-[#FDFCF8]"
      >
        {preview ? (
          <img src={preview} alt="Foto da pessoa" className="w-full h-full object-cover" />
        ) : (
          <>
            <div className="w-16 h-16 rounded-full bg-[#FDFCF8] flex items-center justify-center text-[#C5A059] border border-[#E5E1D8] group-hover:scale-110 transition-transform">
              {loading ? <Loader2 className="animate-spin" /> : <Upload size={32} />}
            </div>
            <span className="font-bold text-[#C5A059] text-[10px] uppercase tracking-widest">ESCOLHER FOTO</span>
          </>
        )}
      </div>

      {preview && (
        <Button onClick={() => onNext(preview)} pulse={true}>
          CRIAR NOSSO REENCONTRO
        </Button>
      )}
    </div>
  );
};

export const StepProcessing = ({ userPhoto, lovedOnePhoto, onComplete }: any) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Analisando fotos...");

  useEffect(() => {
    const duration = 4000; // 4 seconds total
    const intervalTime = 40;
    const steps = duration / intervalTime;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        
        if (prev < 30) setStatus("Analisando as fotos...");
        else if (prev < 65) setStatus("Preparando a composição...");
        else setStatus("Criando o reencontro...");
        
        return prev + (100 / steps);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-12 py-12 text-center">
      <div className="flex flex-col gap-3">
        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Processamento</span>
        <h2 className="text-[28px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
          Preparando o <span className="italic text-[#C5A059]">reencontro</span> de vocês...
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: -8 }}
          className="w-24 h-24 rounded-3xl overflow-hidden border-[4px] border-white shadow-2xl z-10"
        >
          <img src={userPhoto} alt="Você" className="w-full h-full object-cover" />
        </motion.div>
        <div className="text-3xl text-[#C5A059] animate-pulse">✨</div>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: 15 }}
          animate={{ scale: 1, opacity: 1, rotate: 8 }}
          className="w-24 h-24 rounded-3xl overflow-hidden border-[4px] border-white shadow-2xl z-10"
        >
          <img src={lovedOnePhoto} alt="Pessoa Amada" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="w-full max-w-[280px] flex flex-col gap-6">
        <div className="h-[3px] w-full bg-[#E5E1D8] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#C5A059]"
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest font-bold text-[#C5A059] animate-pulse">{status}</span>
      </div>
    </div>
  );
};

export const StepPreview = ({ state, onNext, onBack }: any) => {
  const scenario = useMemo(() => SCENARIOS.find(s => s.id === state.scenario), [state.scenario]);

  return (
    <div className="flex flex-col gap-8 pt-2 pb-6 max-w-md mx-auto w-full">
      <div className="flex flex-col gap-6">
        <button onClick={onBack} className="flex items-center gap-2 text-[#5F6672] text-[10px] font-bold uppercase tracking-widest hover:text-[#1F2937] transition-colors active:opacity-100 self-start">
          <ArrowLeft size={14} /> Voltar
        </button>

        <div className="text-center flex flex-col gap-3">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Confirmação</span>
          <h2 className="text-[28px] sm:text-3xl font-serif leading-tight text-[#1F2937]">
            Seu reencontro está <span className="italic text-[#C5A059]">quase pronto.</span>
          </h2>
        </div>
      </div>

      <div className="relative aspect-video bg-[#1A1A1A] rounded-[32px] overflow-hidden shadow-2xl border-[6px] border-[#2D2A26]">
        <img 
          src={scenario?.image} 
          alt="Preview do Cenário" 
          loading="lazy"
          className="w-full h-full object-cover blur-[3px] scale-105 opacity-60" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20">
          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 mb-4">
            <Video className="text-white" size={24} />
          </div>
          <span className="text-white font-serif italic text-xl leading-tight">
            Vídeo Personalizado:<br/>
            {scenario?.name}
          </span>
        </div>
      </div>

      <div className="bg-white border border-[#E5E1D8] rounded-[32px] p-8 flex flex-col gap-4 shadow-sm">
        <div className="flex flex-col gap-4">
          {[
            "Suas 2 fotos carregadas",
            `Cenário ${scenario?.name} selecionado`,
            "Vídeo personalizado em HD",
            "Trilha sonora emocional",
            "Sem marca d'água"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-sm text-[#374151] font-bold">
              <CheckCircle2 size={18} className="text-[#15803D]" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <Button onClick={onNext} icon={ChevronRight}>
        VER COMO FICOU
      </Button>
    </div>
  );
};

export const StepOffer = ({ state, trackEvent }: any) => {
  const scenario = useMemo(() => SCENARIOS.find(s => s.id === state.scenario), [state.scenario]);

  useEffect(() => {
    trackEvent('checkout_viewed');
  }, []);

  return (
    <div className="flex flex-col gap-10 pb-12 pt-2 max-w-md mx-auto w-full">
      <div className="text-center flex flex-col gap-4">
        <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">O Momento</span>
        <h2 className="text-[32px] sm:text-4xl font-serif leading-[1.1] text-[#1F2937]">
          Seu reencontro está pronto para ser <span className="italic text-[#C5A059]">criado.</span>
        </h2>
        <p className="text-[#374151] font-medium leading-relaxed px-4 text-sm sm:text-base">
          O abraço que você imaginou, agora transformado em uma <span className="font-bold text-[#1F2937]">memória eterna</span> para guardar e compartilhar.
        </p>
      </div>

      <div className="flex justify-center items-center gap-[-20px] isolate py-2">
        <motion.div 
          initial={{ rotate: -10, x: 10 }}
          animate={{ rotate: -6, x: 0 }}
          className="w-28 h-28 rounded-[32px] overflow-hidden border-[6px] border-white shadow-2xl z-10"
        >
          <img src={state.userPhoto || ""} alt="Você" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div 
          initial={{ rotate: 10, x: -10 }}
          animate={{ rotate: 6, x: 0 }}
          className="w-28 h-28 rounded-[32px] overflow-hidden border-[6px] border-white shadow-2xl z-20 -ml-8"
        >
          <img src={state.lovedOnePhoto || ""} alt="Pessoa Amada" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      <div className="bg-[#15803D] border border-[#166534] rounded-[32px] p-8 shadow-xl text-white">
        <div className="flex flex-col gap-2 mb-6">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-80">Seu reencontro está quase pronto</span>
          <h3 className="font-serif italic text-2xl leading-tight">
            Receba o vídeo completo de vocês
          </h3>
        </div>

        <ul className="space-y-4 mb-8">
          {[
            "Vídeo personalizado",
            "Música emocionante",
            "Sem marca d'água",
            "Arquivo digital",
            "Pagamento único",
            "Sem mensalidade"
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-4 text-sm font-bold leading-tight">
              <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <CheckCircle2 size={12} className="text-white" />
              </div>
              {item}
            </li>
          ))}
        </ul>

        <div className="h-[1px] w-full bg-white/10 mb-8" />

        <div className="text-center flex flex-col gap-2 mb-8">
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-80">Hoje:</span>
          <div className="flex items-center justify-center gap-3">
            <span className="text-5xl font-serif font-bold">R$ 27,94</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold opacity-80">Pagamento único</span>
        </div>

        <div className="flex flex-col gap-6">
          <Button variant="white" onClick={() => trackEvent('checkout_started')} pulse={true}>
            QUERO RECEBER MEU REENCONTRO
          </Button>
          
          <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-80">
            <ShieldCheck size={14} className="text-white" />
            Pagamento 100% Seguro
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        <div className="p-6 rounded-3xl border border-[#E5E1D8] bg-white flex flex-col items-center gap-3 text-center shadow-sm">
          <Clock size={20} className="text-[#C5A059]" />
          <span className="text-[10px] font-bold text-[#1F2937] uppercase tracking-widest">Garantia</span>
          <p className="text-[10px] text-[#5F6672] font-bold leading-tight">14 dias de proteção total.</p>
        </div>
        <div className="p-6 rounded-3xl border border-[#E5E1D8] bg-white flex flex-col items-center gap-3 text-center shadow-sm">
          <MessageCircle size={20} className="text-[#C5A059]" />
          <span className="text-[10px] font-bold text-[#1F2937] uppercase tracking-widest">Suporte</span>
          <p className="text-[10px] text-[#5F6672] font-bold leading-tight">Ajuda direta via WhatsApp.</p>
        </div>
      </div>

      <div className="space-y-8 pt-8 border-t border-[#E5E1D8]">
        <div className="text-center flex flex-col gap-2">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Depoimentos</span>
          <h3 className="text-2xl font-serif font-bold text-[#1F2937]">
            O que outras <span className="italic text-[#C5A059]">famílias dizem:</span>
          </h3>
        </div>
        
        <div className="space-y-6">
          {[
            { name: "Maria Helena", text: "Não tenho palavras para descrever a emoção. Parecia que eu estava lá de novo. Muito obrigada por esse presente." },
            { name: "Ricardo S.", text: "A qualidade superou minhas expectativas. Enviei para toda a família e todos se emocionaram muito." }
          ].map((testimonial, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-white border border-[#E5E1D8] shadow-sm flex flex-col gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(n => <Star key={n} size={10} className="text-[#C5A059]" fill="currentColor" />)}
              </div>
              <p className="text-[#374151] font-medium leading-relaxed italic text-sm">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-6 h-[1px] bg-[#C5A059]" />
                <p className="text-[10px] font-bold text-[#1F2937] uppercase tracking-widest">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8 pt-8 border-t border-[#E5E1D8]">
        <div className="text-center flex flex-col gap-2">
          <span className="text-[#C5A059] uppercase tracking-[0.2em] text-[10px] font-bold">Ajuda</span>
          <h3 className="text-2xl font-serif font-bold text-[#1F2937]">
            Dúvidas <span className="italic text-[#C5A059]">Frequentes</span>
          </h3>
        </div>
        
      <div className="space-y-4 max-w-sm mx-auto w-full">
          {[
            { q: "Preciso ter foto das duas pessoas juntas?", a: "Não! Você envia uma foto de cada pessoa e nossa tecnologia cria o reencontro perfeitamente." },
            { q: "Quanto tempo demora para receber?", a: "A entrega é digital e rápida, geralmente em poucas horas após a confirmação do pedido." },
            { q: "É uma assinatura mensal?", a: "Não. É um pagamento único por vídeo criado, sem taxas escondidas." }
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-[24px] bg-[#F2EFE8]/30 border border-[#E5E1D8]">
              <h4 className="text-[11px] font-bold text-[#1F2937] flex items-center gap-3 uppercase tracking-wider leading-snug">
                <HelpCircle size={14} className="text-[#C5A059] shrink-0" />
                {item.q}
              </h4>
              <p className="text-[11px] text-[#374151] mt-3 leading-relaxed font-bold">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
