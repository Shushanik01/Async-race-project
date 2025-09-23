import React from 'react';
import { Typography, Grid, Button, Card, CardContent } from '@mui/material';

interface Car {
    id: number;
    name: string;
    color: string;
}

interface RaceControlsSectionProps {
    cars: Car[];
    isRacing: boolean;
    racingCars: Set<number>;
    onStartRace: () => void;
    onResetRace: () => void;
}

const RaceControlsSection: React.FC<RaceControlsSectionProps> = ({
    cars,
    isRacing,
    racingCars,
    onStartRace,
    onResetRace
}) => {
    return (
        <Card sx={{ mb: 3 }} className="neon-border">
            <CardContent >
                <Typography variant="h6" sx={{ mb: 2 }} className="neon-text" >
                    Race Controls
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                    {/* @ts-ignore */}
                    <Grid item xs={6}>
                        <Button 
                            variant="contained" 
                            className="neon-button" 
                            fullWidth 
                            size="large"
                            onClick={onStartRace}
                            disabled={cars.length === 0 || isRacing}
                        >
                            START RACE
                        </Button>
                    </Grid>
                    {/* @ts-ignore */}
                    <Grid item xs={6}>
                        <Button 
                            variant="outlined" 
                            className="neon-button-pink" 
                            fullWidth 
                            size="large"
                            onClick={onResetRace}
                        >
                            RESET RACE
                        </Button>
                    </Grid>
                </Grid>
                {(isRacing || racingCars.size > 0) && (
                    <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }} className="neon-text">
                        Racing in progress... {racingCars.size} cars racing
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
};

export default RaceControlsSection;