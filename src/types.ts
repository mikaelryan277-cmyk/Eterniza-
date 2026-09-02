export type PersonType = 
  | 'mãe' | 'pai' | 'avó' | 'avô' | 'parceiro' | 'outro' | null;

export type ScenarioType = 'escadaria' | 'nuvens' | 'jesus' | 'praia' | null;

export interface QuizState {
  step: number;
  personType: PersonType;
  scenario: ScenarioType;
  userPhoto: string | null;
  lovedOnePhoto: string | null;
}

export const SCENARIOS = [
  {
    id: 'escadaria',
    name: '✨ Escadaria dourada',
    image: 'https://img.youtube.com/vi/H0nv_KUhidg/maxresdefault.jpg',
    videoId: 'H0nv_KUhidg',
    description: 'Um encontro em direção à luz.'
  },
  {
    id: 'nuvens',
    name: '☁️ Nuvens',
    image: 'https://img.youtube.com/vi/pL4mdyu4_9E/maxresdefault.jpg',
    videoId: 'pL4mdyu4_9E',
    description: 'O abraço em um céu infinito.'
  },
  {
    id: 'jesus',
    name: '🙏 Com Jesus',
    image: 'https://img.youtube.com/vi/6VSRYPsqM3M/maxresdefault.jpg',
    videoId: '6VSRYPsqM3M',
    description: 'Um reencontro abençoado e divino.'
  },
  {
    id: 'praia',
    name: '🏖️ Praia',
    image: 'https://img.youtube.com/vi/Zg4WzHI5qtQ/maxresdefault.jpg',
    videoId: 'Zg4WzHI5qtQ',
    description: 'A paz do mar e do reencontro.'
  }
];

export const PERSON_OPTIONS = [
  { id: 'mãe', label: 'Mãe', emoji: '👩' },
  { id: 'pai', label: 'Pai', emoji: '👨' },
  { id: 'avó', label: 'Avó', emoji: '👵' },
  { id: 'avô', label: 'Avô', emoji: '👴' },
  { id: 'parceiro', label: 'Parceiro(a)', emoji: '💑' },
  { id: 'outro', label: 'Outra pessoa', emoji: '🤍' }
];
