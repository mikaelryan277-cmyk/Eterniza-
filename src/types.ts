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
    name: '✨ Escadaria com nuvens',
    image: 'https://fast.wistia.net/embed/medias/312cyl09txuzd6j.jpg',
    videoId: '312cyl09txuzd6j',
    description: 'Um encontro em direção à luz.'
  },
  {
    id: 'jesus',
    name: '🙏 Com Jesus',
    image: 'https://fast.wistia.net/embed/medias/mdfw4ww2fia4w84.jpg',
    videoId: 'mdfw4ww2fia4w84',
    description: 'Um reencontro abençoado e divino.'
  },
  {
    id: 'nuvens',
    name: '☁️ Nas nuvens',
    image: 'https://fast.wistia.net/embed/medias/afa7j9ebsj8vika.jpg',
    videoId: 'afa7j9ebsj8vika',
    description: 'O abraço em um céu infinito.'
  },
  {
    id: 'praia',
    name: '🏖️ Na praia',
    image: 'https://fast.wistia.net/embed/medias/6idfx5cca7lahgo.jpg',
    videoId: '6idfx5cca7lahgo',
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
