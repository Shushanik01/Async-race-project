import React from 'react';
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import { getCarEmoji } from '../../Utils/carGenerator.ts';

interface Car {
    id: number;
    name: string;
    color: string;
}

interface CarListItemProps {
    car: Car;
    selectedCarId: number | null;
    isRacing: boolean;
    racingCars: Set<number>;
    carProgress: Record<number, number>;
    onStartCar: (carId: number) => void;
    onStopCar: (carId: number) => void;
    onEditCar: (carId: number) => void;
    onDeleteCar: (carId: number) => void;
}
{/* @ts-ignore */ }
const CarListItem: React.FC<CarListItemProps> = ({
    car,
    selectedCarId,
    isRacing,
    racingCars,
    carProgress,
    onStartCar,
    onStopCar,
    onEditCar,
    onDeleteCar
}) => {
    return (

        <Card

            sx={{
                mb: 2,
                border: selectedCarId === car.id ? '2px solid #ff00ff' : '1px solid #00ffff40',
                backgroundColor: selectedCarId === car.id ? 'rgba(255, 0, 255, 0.1)' : 'background.paper',
            }}

            className="neon-border"
        >
            <CardContent>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap'
                }}>
                    <Box sx={{ minWidth: '200px', flex: '0 0 auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h5">
                                <img
                                    src={getCarEmoji(car.name)}
                                    alt="car"
                                    style={{ width: '24px', height: '24px' }}
                                />
                            </Typography>
                            <Box>
                                <Typography variant="h6" className="neon-text">
                                    {car.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box
                                        sx={{
                                            width: 20,
                                            height: 20,
                                            backgroundColor: car.color,
                                            borderRadius: '50%',
                                            border: '1px solid #fff',
                                        }}
                                    />
                                    <Typography variant="body2">ID: {car.id}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ flex: '1 1 auto', minWidth: '400px' }}>
                        <Box sx={{
                            height: 60,
                            border: '2px solid #00ffff',
                            borderRadius: 1,
                            position: 'relative',
                            background: 'linear-gradient(90deg, #2a2a3a 0%, #1a1a2a 50%, #2a2a3a 100%)',
                            overflow: 'hidden'
                        }}>

                            {[30, 50, 70].map((top, i) => (
                                <Box key={i} sx={{
                                    position: 'absolute',
                                    top: `${top}%`,
                                    left: 0,
                                    right: 0,
                                    height: i === 1 ? '3px' : '2px',
                                    background: i === 1
                                        ? 'repeating-linear-gradient(90deg, #ffaa00 0px, #ffaa00 20px, transparent 20px, transparent 40px)'
                                        : 'rgba(255, 255, 255, 0.3)',
                                }} />
                            ))}

                            {[
                                { left: '10px', bg: 'repeating-linear-gradient(0deg, #00ff00 0px, #00ff00 4px, #ffffff 4px, #ffffff 8px)' },
                                { right: '10px', bg: 'repeating-linear-gradient(0deg, #ffffff 0px, #ffffff 4px, #000000 4px, #000000 8px)' }
                            ].map((line, i) => (
                                <Box key={i} sx={{
                                    position: 'absolute',
                                    ...line,
                                    top: '20%',
                                    bottom: '20%',
                                    width: '4px',
                                    background: line.bg,
                                }} />
                            ))}

                            <Box sx={{
                                position: 'absolute',
                                left: `${15 + ((carProgress[car.id] || 0) * 0.7)}%`,
                                top: '50%',
                                transform: 'translateY(-50%)',
                                transition: 'left 0.5s ease-out',
                                filter: `drop-shadow(0 0 8px ${car.color})`,
                            }}>
                                <img
                                    src={getCarEmoji(car.name)}
                                    alt="car"
                                    style={{ width: '32px', height: '32px' }}
                                />
                            </Box>

                            <Box sx={{
                                position: 'absolute',
                                bottom: 0,
                                width: `${carProgress[car.id] || 0}%`,
                                height: '4px',
                                background: 'linear-gradient(90deg, #00ffff, #ff00ff)',
                                boxShadow: '0 0 8px #00ffff',
                            }} />

                            <Box sx={{
                                position: 'absolute',
                                top: '2px',
                                left: '4px',
                                fontSize: '10px',
                                color: '#00ffff',
                                opacity: 0.7
                            }}>
                                TRACK #{car.id}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ minWidth: '300px', flex: '0 0 auto' }}>
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                            {!racingCars.has(car.id) ? (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="neon-button"
                                    onClick={() => onStartCar(car.id)}
                                    disabled={isRacing}
                                >
                                    START
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    className="neon-button-pink"
                                    onClick={() => onStopCar(car.id)}
                                >
                                    STOP
                                </Button>
                            )}
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => onEditCar(car.id)}
                                disabled={isRacing || racingCars.has(car.id)}
                            >
                                SELECT
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                color="error"
                                onClick={() => onDeleteCar(car.id)}
                                disabled={isRacing || racingCars.has(car.id)}
                            >
                                DELETE
                            </Button>
                        </Box>
                        {carProgress[car.id] > 0 && (
                            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1 }} className="neon-text">
                                {Math.round(carProgress[car.id])}%
                            </Typography>
                        )}
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CarListItem;