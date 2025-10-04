// // @ts-nocheck
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, Grid } from '@mui/material';
// import { fetchCars, addCar, generateRandomCars, removeCar, setSelectedCar } from '../../Store/garageSlice.ts';
// import { generateRandomCarsData } from '../../Utils/carGenerator.ts';
// import CustomPagination from '../shared/CustomPagination.tsx';
// import WinnerModal from './WinnerModal.tsx';
// import CarCreationForm from './CarCreationForm.tsx';
// import RaceControlsSection from './RaceControlsSection.tsx';
// import CarListItem from './CarListItem.tsx';
// import useApiRaceEngine from '../../Api/useApiRaceEngine.ts';
// import { saveWinner } from '../../Api/winnerApiService.ts';

// interface Car {
//     id: number;
//     name: string;
//     color: string;
// }

// interface GarageState {
//     cars: Car[];
//     totalCount: number;
//     loading: boolean;
//     selectedCarId: number | null;
// }

// interface RootState {
//     garage: GarageState;
// }

// const GaragePage: React.FC = () => {
//     const dispatch = useDispatch();
//     const { cars, totalCount, loading, selectedCarId } = useSelector((state: RootState) => state.garage);
   
//    const {
//     racingCars,
//     carProgress,
//     winner,
//     isAnyCarRacing,
//     startCarRace,
//     stopCarRace,
//     startAllCarsRace,
//     resetAllRaces
// } = useApiRaceEngine(cars, async (winnerCar: Car, raceTime: number) => {
//     try {
//         await saveWinner(winnerCar.id, raceTime);
//         console.log(`Winner ${winnerCar.name} saved with time ${raceTime}s`);
//     } catch (error) {
//         console.error('Failed to save winner:', error);
//     }
// });
    
//     const [newCarName, setNewCarName] = useState<string>('');
//     const [newCarColor, setNewCarColor] = useState<string>('#FF0000');
//     const [currentPage, setCurrentPage] = useState<number>(1);
//     const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
//     const [successMessage, setSuccessMessage] = useState<string>('');
    
//     const totalPages = Math.ceil(totalCount / 7);

//     useEffect(() => {
//         dispatch(fetchCars({ page: currentPage, limit: 7 }) as any);
//     }, [dispatch, currentPage]);

//     const handleCreateCar = () => {
//         if (newCarName.trim()) {
//             dispatch(addCar({
//                 name: newCarName.trim(),
//                 color: newCarColor
//             }) as any);
            
//             setSuccessMessage(`Car "${newCarName.trim()}" successfully added!`);
//             setShowSuccessMessage(true);
            
//             setTimeout(() => {
//                 setShowSuccessMessage(false);
//             }, 3000);
            
//             setNewCarName('');
//             setNewCarColor('#FF0000');
//         }
//     };

//     const handleGenerateRandomCars = () => {
//         const randomCarsData = generateRandomCarsData(100);
//         dispatch(generateRandomCars(randomCarsData) as any);
//     };

//    const handleStartRace = () => {
//     if (cars.length === 0) return;
//     startAllCarsRace();
// };
// const handleResetRace = () => {
//     resetAllRaces();
// };

//     const handleStartCar = (carId: number) => {
//         startCarRace(carId);
//     };

//     const handleStopCar = (carId: number) => {
//         stopCarRace(carId);
//     };

//     const handleEditCar = (carId: number) => {
//         dispatch(setSelectedCar(carId));
//         const selectedCar = cars.find(car => car.id === carId);
//         if (selectedCar) {
//             setNewCarName(selectedCar.name);
//             setNewCarColor(selectedCar.color);
//         }
//     };

//     const handleDeleteCar = (carId: number) => {
//         if (racingCars.has(carId)) {
//             alert('Cannot delete car while racing!');
//             return;
//         }
//         dispatch(removeCar(carId));
//     };

//     const handlePageChange = (page: number) => {
//         if (!isAnyCarRacing) {
//             setCurrentPage(page);
//         }
//     };

//     if (loading) return <Typography>Loading...</Typography>;

//     return (
//         <Box sx={{ maxWidth: '100%', width: '100%' }}>
//             <WinnerModal 
//                 winner={winner} 
//                 onClose={() => resetAllRaces()} 
//             />

//             <Typography variant="h2" className="neon-text-pink" sx={{ mb: 3, textAlign: 'center' }}>
//                 🏁 GARAGE ({totalCount} cars)
//             </Typography>

//             <CarCreationForm
//                 newCarName={newCarName}
//                 setNewCarName={setNewCarName}
//                 newCarColor={newCarColor}
//                 setNewCarColor={setNewCarColor}
//                 selectedCarId={selectedCarId}
//                 isRacing={isAnyCarRacing}
//                 onCreateCar={handleCreateCar}
//                 onGenerateRandomCars={handleGenerateRandomCars}
//                 showSuccessMessage={showSuccessMessage}
//                 successMessage={successMessage}
//             />

//             <RaceControlsSection
//                 cars={cars}
//                 isRacing={isAnyCarRacing}
//                 racingCars={racingCars}
//                 onStartRace={handleStartRace}
//                 onResetRace={handleResetRace}
//             />

//             {cars.length === 0 ? (
//                 <Typography variant="h5" sx={{ textAlign: 'center', my: 4 }} className="neon-text">
//                     No cars in garage. Create your first car!
//                 </Typography>
//             ) : (
//                 <Grid container spacing={2}>
//                     {cars.map((car) => (
//                         <Grid item xs={12} key={car.id}>
//                             <CarListItem
//                                 car={car}
//                                 selectedCarId={selectedCarId}
//                                 isRacing={isAnyCarRacing}
//                                 racingCars={racingCars}
//                                 carProgress={carProgress}
//                                 onStartCar={handleStartCar}
//                                 onStopCar={handleStopCar}
//                                 onEditCar={handleEditCar}
//                                 onDeleteCar={handleDeleteCar}
//                             />
//                         </Grid>
//                     ))}
//                 </Grid>
//             )}

//             <CustomPagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 onPageChange={handlePageChange}
//                 disabled={isAnyCarRacing}
//             />
//         </Box>
//     );
// };

// export default GaragePage;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { fetchCars, addCar, generateRandomCars, removeCar, setSelectedCar } from '../../Store/garageSlice.ts';
import { generateRandomCarsData } from '../../Utils/carGenerator.ts';
import CustomPagination from '../shared/CustomPagination.tsx';
import WinnerModal from './WinnerModal.tsx';
import CarCreationForm from './CarCreationForm.tsx';
import RaceControlsSection from './RaceControlsSection.tsx';
import CarListItem from './CarListItem.tsx';
import useApiRaceEngine from '../../Api/useApiRaceEngine.ts';
import { saveWinner } from '../../Api/winnerApiService.ts';

interface Car {
    id: number;
    name: string;
    color: string;
}

interface GarageState {
    cars: Car[];
    totalCount: number;
    loading: boolean;
    selectedCarId: number | null;
}

interface RootState {
    garage: GarageState;
}

const GaragePage: React.FC = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page') || '1');
    
    const { cars, totalCount, loading, selectedCarId } = useSelector((state: RootState) => state.garage);
   
    // ✅ Միայն ընթացիկ էջի cars-երը race-ի մեջ
    console.log(`🏁 Racing ${cars.length} cars from page ${currentPage}`);
   
    const {
        racingCars,
        carProgress,
        winner,
        isAnyCarRacing,
        startCarRace,
        stopCarRace,
        startAllCarsRace,
        resetAllRaces
    } = useApiRaceEngine(cars, async (winnerCar: Car, raceTime: number) => {
        try {
            await saveWinner(winnerCar.id, raceTime);
            console.log(`✅ Winner ${winnerCar.name} saved with time ${raceTime.toFixed(2)}s`);
        } catch (error) {
            console.error('❌ Failed to save winner:', error);
        }
    });
    
    const [newCarName, setNewCarName] = useState<string>('');
    const [newCarColor, setNewCarColor] = useState<string>('#FF0000');
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    
    const totalPages = Math.ceil(totalCount / 7);

    useEffect(() => {
        dispatch(fetchCars({ page: currentPage, limit: 7 }) as any);
    }, [dispatch, currentPage]);

    const handleCreateCar = () => {
        if (newCarName.trim()) {
            dispatch(addCar({
                name: newCarName.trim(),
                color: newCarColor
            }) as any);
            
            setSuccessMessage(`Car "${newCarName.trim()}" successfully added!`);
            setShowSuccessMessage(true);
            
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
            
            setNewCarName('');
            setNewCarColor('#FF0000');
        }
    };

    const handleGenerateRandomCars = () => {
        const randomCarsData = generateRandomCarsData(100);
        dispatch(generateRandomCars(randomCarsData) as any);
    };

    const handleStartRace = () => {
        if (cars.length === 0) {
            alert('No cars to race!');
            return;
        }
        console.log(`🏁 Starting race with ${cars.length} cars`);
        startAllCarsRace();
    };

    const handleResetRace = () => {
        resetAllRaces();
    };

    const handleStartCar = (carId: number) => {
        startCarRace(carId);
    };

    const handleStopCar = (carId: number) => {
        stopCarRace(carId);
    };

    const handleEditCar = (carId: number) => {
        dispatch(setSelectedCar(carId));
        const selectedCar = cars.find(car => car.id === carId);
        if (selectedCar) {
            setNewCarName(selectedCar.name);
            setNewCarColor(selectedCar.color);
        }
    };

    const handleDeleteCar = (carId: number) => {
        if (racingCars.has(carId)) {
            alert('Cannot delete car while racing!');
            return;
        }
        dispatch(removeCar(carId) as any);
    };

    const handlePageChange = (page: number) => {
        if (!isAnyCarRacing) {
            setSearchParams({ page: page.toString() });
        } else {
            alert('Cannot change page during race!');
        }
    };

    if (loading) return <Typography className="neon-text">Loading...</Typography>;

    return (
        <Box sx={{ maxWidth: '100%', width: '100%' }}>
            <WinnerModal 
                winner={winner} 
                onClose={() => resetAllRaces()} 
            />

            <Typography variant="h2" className="neon-text-pink" sx={{ mb: 3, textAlign: 'center' }}>
                🏁 GARAGE ({totalCount} cars total, {cars.length} on this page)
            </Typography>

            <CarCreationForm
                newCarName={newCarName}
                setNewCarName={setNewCarName}
                newCarColor={newCarColor}
                setNewCarColor={setNewCarColor}
                selectedCarId={selectedCarId}
                isRacing={isAnyCarRacing}
                onCreateCar={handleCreateCar}
                onGenerateRandomCars={handleGenerateRandomCars}
                showSuccessMessage={showSuccessMessage}
                successMessage={successMessage}
            />

            <RaceControlsSection
                cars={cars}
                isRacing={isAnyCarRacing}
                racingCars={racingCars}
                onStartRace={handleStartRace}
                onResetRace={handleResetRace}
            />

            {cars.length === 0 ? (
                <Typography variant="h5" sx={{ textAlign: 'center', my: 4 }} className="neon-text">
                    No cars in garage. Create your first car!
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {/* {cars.map((car) => (
                        // @ts-ignore
                        <Grid item xs={12} key={car.id}>
                            <CarListItem
                                car={car}
                                selectedCarId={selectedCarId}
                                isRacing={isAnyCarRacing}
                                racingCars={racingCars}
                                carProgress={carProgress}
                                onStartCar={handleStartCar}
                                onStopCar={handleStopCar}
                                onEditCar={handleEditCar}
                                onDeleteCar={handleDeleteCar}
                            />
                        </Grid>
                    ))} */}
                    {cars.map((car) => (
    // @ts-ignore
    <Grid item xs={12} key={car.id}>
        <CarListItem
            car={car}
            selectedCarId={selectedCarId}
            isRacing={isAnyCarRacing}
            racingCars={racingCars}
            carProgress={Object.fromEntries(carProgress)}  // ✅ Map → Record
            onStartCar={handleStartCar}
            onStopCar={handleStopCar}
            onEditCar={handleEditCar}
            onDeleteCar={handleDeleteCar}
        />
    </Grid>
))}
                </Grid>
            )}

            <CustomPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                disabled={isAnyCarRacing}
            />
        </Box>
    );
};

export default GaragePage;