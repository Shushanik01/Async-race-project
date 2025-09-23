export const API_BASE_URL: string = 'http://localhost:3000';

export const CARS_PER_PAGE: number = 7;
export const WINNERS_PER_PAGE: number = 10;

export const MAX_RANDOM_CARS: number = 100;

export const RACE_DISTANCE: number = 500000; 

export const ENGINE_STATUS = {
  STARTED: 'started',
  STOPPED: 'stopped',
  DRIVE: 'drive',
} as const;

export const SORT_OPTIONS = {
  ID: 'id',
  WINS: 'wins',
  TIME: 'time',
} as const;

export const SORT_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export const CAR_NAMES: string[] = [
  'Tesla Model S',
  'BMW M3',
  'Mercedes AMG',
  'Ford Mustang',
  'Lamborghini Huracan',
  'Ferrari 488',
  'Porsche 911',
  'McLaren 720S',
  'Bugatti Veyron',
  'Aston Martin DB11',
  'Nissan GT-R',
  'Toyota Supra',
  'Chevrolet Camaro',
  'Dodge Challenger',
  'Audi R8',
];

export const CAR_COLORS: string[] = [
  '#FF0000', 
  '#00FF00', 
  '#0000FF', 
  '#FFFF00', 
  '#FF00FF',
  '#00FFFF', 
  '#FFA500', 
  '#800080', 
  '#FFC0CB', 
  '#A52A2A', 
  '#808080', 
  '#000000', 
  '#FFFFFF', 
  '#8B4513', 
  '#FF69B4',
];