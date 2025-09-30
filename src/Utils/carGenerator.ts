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
  
  
   const basePath = '/Async-race-project';
  
  if (name.includes('tesla')) return `${basePath}/images/car3.webp`;
  if (name.includes('bmw')) return `${basePath}/images/car2.webp`;
  if (name.includes('mercedes')) return `${basePath}/images/car3.webp`;
  if (name.includes('ford')) return `${basePath}/images/car4.webp`;
  if (name.includes('lamborghini')) return `${basePath}/images/car5.png`;
  if (name.includes('ferrari')) return `${basePath}/images/car2.webp`;
  if (name.includes('porsche')) return `${basePath}/images/car1.webp`;
  if (name.includes('mclaren')) return `${basePath}/images/car5.png`;
  if (name.includes('bugatti')) return `${basePath}/images/car3.webp`;
  if (name.includes('aston martin')) return `${basePath}/images/car2.webp`;
  if (name.includes('nissan')) return `${basePath}/images/car1.webp`;
  if (name.includes('toyota')) return `${basePath}/images/car2.webp`;
  if (name.includes('chevrolet')) return `${basePath}/images/car5.png`;
  if (name.includes('dodge')) return `${basePath}/images/car4.webp`;
  if (name.includes('audi')) return `${basePath}/images/car5.png`;
 
  return `${basePath}/images/car1.webp`;
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