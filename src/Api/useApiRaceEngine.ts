// import { useState, useCallback, useRef } from 'react';
// import { API_BASE_URL } from '../Utils/constants.ts';

// interface Car {
//     id: number;
//     name: string;
//     color: string;
// }

// interface EngineData {
//     velocity: number;
//     distance: number;
// }

// interface DriveResult {
//     success: boolean;
// }

// const useApiRaceEngine = (cars: Car[], onWinnerFound: (car: Car, time: number) => void) => {
//     const [racingCars, setRacingCars] = useState<Set<number>>(new Set());
//     const [carProgress, setCarProgress] = useState<Record<number, number>>({});
//     const [winner, setWinner] = useState<Car | null>(null);
//     const timeoutsRef = useRef<Record<number, number>>({});

//     const engineAPI = async (carId: number, status: string): Promise<EngineData | DriveResult | null> => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/engine?id=${carId}&status=${status}`, {
//                 method: 'PATCH'
//             });
//             return response.ok ? await response.json() : null;
//         } catch (error) {
//             console.error(`Engine ${status} failed:`, error);
//             return null;
//         }
//     };

//     const startCarRace = useCallback(async (carId: number) => {
//         if (racingCars.has(carId)) return;
       
//         const engineData = await engineAPI(carId, 'started') as EngineData;
//         if (!engineData) return;
        
//         const { velocity, distance } = engineData;
//         const raceTime = distance / velocity;
        
//         setRacingCars(prev => new Set([...prev, carId]));
       
//         const driveResult = await engineAPI(carId, 'drive') as DriveResult;
//         if (!driveResult?.success) {
            
//             setRacingCars(prev => {
//                 const newSet = new Set(prev);
//                 newSet.delete(carId);
//                 return newSet;
//             });
//             return;
//         }
       
//         let startTime = Date.now();
//         const updateProgress = () => {
//             const elapsed = Date.now() - startTime;
//             const progress = Math.min((elapsed / raceTime) * 100, 100);
            
//             setCarProgress(prev => ({ ...prev, [carId]: progress }));
            
//             if (progress >= 100) {
               
//                 setRacingCars(prev => {
//                     const newSet = new Set(prev);
//                     newSet.delete(carId);
//                     return newSet;
//                 });
               
//                 if (!winner && onWinnerFound) {
//                     const winnerCar = cars.find(c => c.id === carId);
//                     if (winnerCar) {
//                         setWinner(winnerCar);
//                         onWinnerFound(winnerCar, raceTime / 1000);
//                     }
//                 }
//                 clearInterval(timeoutsRef.current[carId]);
//                 delete timeoutsRef.current[carId];
//             }
//         };
        
//         timeoutsRef.current[carId] = setInterval(updateProgress, 50);
        
//     }, [racingCars, cars, winner, onWinnerFound]);

//     const stopCarRace = useCallback(async (carId: number) => {
//         await engineAPI(carId, 'stopped');
        
//         if (timeoutsRef.current[carId]) {
//             clearInterval(timeoutsRef.current[carId]);
//             delete timeoutsRef.current[carId];
//         }
        
//         setRacingCars(prev => {
//             const newSet = new Set(prev);
//             newSet.delete(carId);
//             return newSet;
//         });
        
//         setCarProgress(prev => ({ ...prev, [carId]: 0 }));
//     }, []);

// const startAllCarsRace = useCallback(async () => {
//     if (cars.length === 0) return;
//     setWinner(null);
    
//     const racePromises = cars.map(car => startCarRace(car.id));
//     await Promise.allSettled(racePromises);
// }, [cars, startCarRace]);
//     const resetAllRaces = useCallback(async () => {
   
//     const stopPromises = cars.map(car => engineAPI(car.id, 'stopped'));
//     await Promise.allSettled(stopPromises);
   
//     Object.values(timeoutsRef.current).forEach(interval => clearInterval(interval));
//     timeoutsRef.current = {};
    
//     setRacingCars(new Set());
//     setCarProgress({});
//     setWinner(null);
// }, [cars]);

//     return {
//         racingCars,
//         carProgress,
//         winner,
//         isAnyCarRacing: racingCars.size > 0,
//         startCarRace,
//         stopCarRace,
//         startAllCarsRace,
//         resetAllRaces
//     };
// };

// export default useApiRaceEngine;


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
    const [carProgress, setCarProgress] = useState<Map<number, number>>(new Map());
    const [winner, setWinner] = useState<{ car: Car; time: number } | null>(null);
    const winnerFoundRef = useRef(false);
    const intervalsRef = useRef<Map<number, ReturnType<typeof setInterval>>>(new Map());

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

    // const startCarRace = useCallback(async (carId: number) => {
    //     const car = cars.find(c => c.id === carId);
    //     if (!car) {
    //         console.error(`Car ${carId} not found`);
    //         return;
    //     }
        
    //     if (racingCars.has(carId)) return;
       
    //     const engineData = await engineAPI(carId, 'started') as EngineData;
    //     if (!engineData) {
    //         console.error(`Engine start failed for car ${carId}`);
    //         return;
    //     }
        
    //     const { velocity, distance } = engineData;
    //     const totalTime = distance / velocity;
        
    //     setRacingCars(prev => new Set(prev).add(carId));
        
    //     const startTime = Date.now();
       
    //     const driveResult = await engineAPI(carId, 'drive') as DriveResult;
        
    //     let progress = 0;
    //     const incrementPerFrame = 100 / (totalTime / 50);
        
    //     const interval = setInterval(() => {
    //         progress += incrementPerFrame;
    //         if (progress >= 100) progress = 100;
            
    //         setCarProgress(prev => new Map(prev).set(carId, progress));
            
    //         if (progress >= 100) {
    //             clearInterval(interval);
    //             intervalsRef.current.delete(carId);
                
    //             // ✅ Winner check
    //             if (!winnerFoundRef.current && driveResult?.success) {
    //                 winnerFoundRef.current = true;
                    
    //                 const raceTime = (Date.now() - startTime) / 1000;
                    
    //                 // ✅ car object ամբողջությամբ պահպանի
    //                 const winnerData = { 
    //                     car: {
    //                         id: car.id,
    //                         name: car.name,
    //                         color: car.color
    //                     },
    //                     time: raceTime 
    //                 };
                    
    //                 console.log('🏆 Winner data:', winnerData);
                    
    //                 setWinner(winnerData);
    //                 onWinnerFound(car, raceTime);
    //             }
                
    //             setRacingCars(prev => {
    //                 const newSet = new Set(prev);
    //                 newSet.delete(carId);
    //                 return newSet;
    //             });
    //         }
    //     }, 50);
        
    //     intervalsRef.current.set(carId, interval);
        
    // }, [racingCars, cars, onWinnerFound]);
    const startCarRace = useCallback(async (carId: number) => {
    const car = cars.find(c => c.id === carId);
    if (!car) {
        console.error(`❌ Car ${carId} not found`);
        return;
    }
    
    console.log(`🚗 Starting race for ${car.name} (ID: ${carId})`);
    
    if (racingCars.has(carId)) return;
   
    const engineData = await engineAPI(carId, 'started') as EngineData;
    if (!engineData) {
        console.error(`❌ Engine start failed for ${car.name}`);
        return;
    }
    
    console.log(`⚡ Engine started for ${car.name}, velocity: ${engineData.velocity}`);
    
    const { velocity, distance } = engineData;
    const totalTime = distance / velocity;
    
    setRacingCars(prev => new Set(prev).add(carId));
    const startTime = Date.now();
   
    const driveResult = await engineAPI(carId, 'drive') as DriveResult;
    console.log(`🏁 Drive result for ${car.name}:`, driveResult);
    
    let progress = 0;
    const incrementPerFrame = 100 / (totalTime / 50);
    
    console.log(`📊 Increment per frame for ${car.name}: ${incrementPerFrame}`);
    
    const interval = setInterval(() => {
        progress += incrementPerFrame;
        if (progress >= 100) progress = 100;
        
        setCarProgress(prev => new Map(prev).set(carId, progress));
        
        console.log(`📍 ${car.name} progress: ${progress.toFixed(2)}%`);
        
        if (progress >= 100) {
            clearInterval(interval);
            intervalsRef.current.delete(carId);
            
            console.log(`✅ ${car.name} finished! Checking winner...`);
            console.log(`   winnerFoundRef: ${winnerFoundRef.current}`);
            console.log(`   driveResult.success: ${driveResult?.success}`);
            
            if (!winnerFoundRef.current && driveResult?.success) {
                winnerFoundRef.current = true;
                
                const raceTime = (Date.now() - startTime) / 1000;
                const winnerData = { 
                    car: { id: car.id, name: car.name, color: car.color },
                    time: raceTime 
                };
                
                console.log(`🏆 WINNER: ${car.name} - ${raceTime.toFixed(2)}s`);
                
                setWinner(winnerData);
                onWinnerFound(car, raceTime);
            } else {
                console.log(`   ${car.name} finished but not winner`);
            }
            
            setRacingCars(prev => {
                const newSet = new Set(prev);
                newSet.delete(carId);
                return newSet;
            });
        }
    }, 50);
    
    intervalsRef.current.set(carId, interval);
    
}, [racingCars, cars, onWinnerFound]);

    const stopCarRace = useCallback(async (carId: number) => {
        await engineAPI(carId, 'stopped');
        
        const interval = intervalsRef.current.get(carId);
        if (interval) {
            clearInterval(interval);
            intervalsRef.current.delete(carId);
        }
        
        setRacingCars(prev => {
            const newSet = new Set(prev);
            newSet.delete(carId);
            return newSet;
        });
        
        setCarProgress(prev => new Map(prev).set(carId, 0));
    }, []);

    const startAllCarsRace = useCallback(async () => {
        if (cars.length === 0) return;
        
        console.log(`🏁 Starting race with ${cars.length} cars`);
        
        winnerFoundRef.current = false;
        setWinner(null);
        setCarProgress(new Map());
        
        intervalsRef.current.forEach(interval => clearInterval(interval));
        intervalsRef.current.clear();
        
        const racePromises = cars.map(car => startCarRace(car.id));
        await Promise.allSettled(racePromises);
    }, [cars, startCarRace]);

    const resetAllRaces = useCallback(async () => {
        console.log('🔄 Resetting race');
        
        const stopPromises = cars.map(car => engineAPI(car.id, 'stopped'));
        await Promise.allSettled(stopPromises);
       
        intervalsRef.current.forEach(interval => clearInterval(interval));
        intervalsRef.current.clear();
        
        setRacingCars(new Set());
        setCarProgress(new Map());
        setWinner(null);
        winnerFoundRef.current = false;
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