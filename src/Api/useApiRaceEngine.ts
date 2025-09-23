import { useState, useCallback, useRef } from 'react';
import { API_BASE_URL } from '../Utils/constants.ts';

interface Car {
    id: number;
    name: string;
    color: string;
}

interface EngineData {
    velocity: number;
    distance: number;
}

interface DriveResult {
    success: boolean;
}

const useApiRaceEngine = (cars: Car[], onWinnerFound: (car: Car, time: number) => void) => {
    const [racingCars, setRacingCars] = useState<Set<number>>(new Set());
    const [carProgress, setCarProgress] = useState<Record<number, number>>({});
    const [winner, setWinner] = useState<Car | null>(null);
    const timeoutsRef = useRef<Record<number, number>>({});

    const engineAPI = async (carId: number, status: string): Promise<EngineData | DriveResult | null> => {
        try {
            const response = await fetch(`${API_BASE_URL}/engine?id=${carId}&status=${status}`, {
                method: 'PATCH'
            });
            return response.ok ? await response.json() : null;
        } catch (error) {
            console.error(`Engine ${status} failed:`, error);
            return null;
        }
    };

    const startCarRace = useCallback(async (carId: number) => {
        if (racingCars.has(carId)) return;
       
        const engineData = await engineAPI(carId, 'started') as EngineData;
        if (!engineData) return;
        
        const { velocity, distance } = engineData;
        const raceTime = distance / velocity;
        
        setRacingCars(prev => new Set([...prev, carId]));
       
        const driveResult = await engineAPI(carId, 'drive') as DriveResult;
        if (!driveResult?.success) {
            
            setRacingCars(prev => {
                const newSet = new Set(prev);
                newSet.delete(carId);
                return newSet;
            });
            return;
        }
       
        let startTime = Date.now();
        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min((elapsed / raceTime) * 100, 100);
            
            setCarProgress(prev => ({ ...prev, [carId]: progress }));
            
            if (progress >= 100) {
               
                setRacingCars(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(carId);
                    return newSet;
                });
               
                if (!winner && onWinnerFound) {
                    const winnerCar = cars.find(c => c.id === carId);
                    if (winnerCar) {
                        setWinner(winnerCar);
                        onWinnerFound(winnerCar, raceTime / 1000);
                    }
                }
                clearInterval(timeoutsRef.current[carId]);
                delete timeoutsRef.current[carId];
            }
        };
        
        timeoutsRef.current[carId] = setInterval(updateProgress, 50);
        
    }, [racingCars, cars, winner, onWinnerFound]);

    const stopCarRace = useCallback(async (carId: number) => {
        await engineAPI(carId, 'stopped');
        
        if (timeoutsRef.current[carId]) {
            clearInterval(timeoutsRef.current[carId]);
            delete timeoutsRef.current[carId];
        }
        
        setRacingCars(prev => {
            const newSet = new Set(prev);
            newSet.delete(carId);
            return newSet;
        });
        
        setCarProgress(prev => ({ ...prev, [carId]: 0 }));
    }, []);

const startAllCarsRace = useCallback(async () => {
    if (cars.length === 0) return;
    setWinner(null);
    
    const racePromises = cars.map(car => startCarRace(car.id));
    await Promise.allSettled(racePromises);
}, [cars, startCarRace]);
    const resetAllRaces = useCallback(async () => {
   
    const stopPromises = cars.map(car => engineAPI(car.id, 'stopped'));
    await Promise.allSettled(stopPromises);
   
    Object.values(timeoutsRef.current).forEach(interval => clearInterval(interval));
    timeoutsRef.current = {};
    
    setRacingCars(new Set());
    setCarProgress({});
    setWinner(null);
}, [cars]);

    return {
        racingCars,
        carProgress,
        winner,
        isAnyCarRacing: racingCars.size > 0,
        startCarRace,
        stopCarRace,
        startAllCarsRace,
        resetAllRaces
    };
};

export default useApiRaceEngine;