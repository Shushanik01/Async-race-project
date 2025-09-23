import { CAR_NAMES, CAR_COLORS } from './constants.ts';

interface CarData {
  name: string;
  color: string;
}

export const getRandomCarName = (): string => {
  const randomIndex = Math.floor(Math.random() * CAR_NAMES.length);
  return CAR_NAMES[randomIndex];
};

export const getRandomCarColor = (): string => {
  const randomIndex = Math.floor(Math.random() * CAR_COLORS.length);
  return CAR_COLORS[randomIndex];
};

export const getCarEmoji = (carName: string = ''): string => {
  const name = carName.toLowerCase();
  
  if (name.includes('tesla')) return '/images/car3.webp';
  if (name.includes('bmw')) return '/images/car2.webp';
  if (name.includes('mercedes')) return '/images/car3.webp';
  if (name.includes('ford')) return '/images/car4.webp';
  if (name.includes('lamborghini')) return '/images/car5.png';
  if (name.includes('ferrari')) return '/images/car2.webp';
  if (name.includes('porsche')) return '/images/car1.webp';
  if (name.includes('mclaren')) return 'images/car5.png';
  if (name.includes('bugatti')) return '/images/car3.webp';
  if (name.includes('aston martin')) return '/images/car2.webp';
  if (name.includes('nissan')) return '/images/car1.webp';
  if (name.includes('toyota')) return '/images/car2.webp';
  if (name.includes('chevrolet')) return 'images/car5.png';
  if (name.includes('dodge')) return '/images/car4.webp';
  if (name.includes('audi')) return 'images/car5.png';
 
  return '/images/car1.webp';
};

export const generateRandomCarData = (): CarData => {
  return {
    name: getRandomCarName(),
    color: getRandomCarColor(),
  };
};

export const generateRandomCarsData = (count: number = 100): CarData[] => {
  const cars: CarData[] = [];
  
  for (let i = 0; i < count; i++) {
    cars.push({
      name: `${getRandomCarName()} #${i + 1}`,
      color: getRandomCarColor(),
    });
  }
  
  return cars;
};

export default {getRandomCarName, getRandomCarColor, generateRandomCarData, generateRandomCarsData, getCarEmoji,};