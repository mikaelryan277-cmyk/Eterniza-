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
    name: '✨ Escadaria nas nuvens',
    image: 'https://fast.wistia.com/assets/external/pimg/gx6y11c30j.jpg',
    videoId: 'gx6y11c30j',
    description: 'Um encontro em direção à luz.'
  },
  {
    id: 'jesus',
    name: '🙏 Com Jesus',
    image: 'https://fast.wistia.com/assets/external/pimg/kxy56tsisw.jpg',
    videoId: 'kxy56tsisw',
    description: 'Um reencontro abençoado e divino.'
  },
  {
    id: 'nuvens',
    name: '☁️ Nas nuvens',
    image: 'https://fast.wistia.net/assets/external/pimg/ex2z5dafc6.jpg',
    videoId: 'ex2z5dafc6',
    description: 'O abraço em um céu infinito.'
  },
  {
    id: 'praia',
    name: '🏖️ Na praia',
    image: 'https://fast.wistia.com/assets/external/pimg/10trcist3m.jpg',
    videoId: '10trcist3m',
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
