export enum AppState {
  COVER = 'COVER',
  SELECTING = 'SELECTING',
  FLIPPING = 'FLIPPING',
  RESULT = 'RESULT'
}

export interface Answer {
  id: number;
  text: string;
}