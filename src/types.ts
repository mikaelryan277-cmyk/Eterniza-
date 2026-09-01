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
    name: 'Escadaria Dourada',
    image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=400',
    description: 'Um reencontro majestoso em degraus de luz.'
  },
  {
    id: 'nuvens',
    name: 'Abraço nas Nuvens',
    image: 'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&q=80&w=400',
    description: 'Um abraço leve em um céu infinito.'
  },
  {
    id: 'jesus',
    name: 'Abraço com Jesus',
    image: 'https://images.unsplash.com/photo-1544427928-14374e146742?auto=format&fit=crop&q=80&w=400',
    description: 'Um momento de paz divina e amparo.'
  },
  {
    id: 'praia',
    name: 'Anjo na Praia',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
    description: 'A serenidade do mar em um reencontro suave.'
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
