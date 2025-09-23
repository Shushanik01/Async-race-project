import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Grid } from '@mui/material';
import { getCarEmoji } from '../../Utils/carGenerator.ts';

interface Winner {
    id: number;
    name: string;
    wins: number;
    time: number;
}

const WinnersPage: React.FC = () => {
    const dispatch = useDispatch();
    const [winners, setWinners] = useState<Winner[]>([
        { id: 1, name: "Lightning McQueen", wins: 1, time: 10.593 },
        { id: 2, name: "Speed Racer", wins: 3, time: 9.847 },
        { id: 3, name: "Turbo Beast", wins: 2, time: 11.234 },
        
    ]);
    const [sortBy, setSortBy] = useState<string>('wins');
    const [sortOrder, setSortOrder] = useState<string>('desc');
    
    useEffect(() => {
        
    }, [dispatch]);

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('desc');
        }
        
        const sorted = [...winners].sort((a, b) => {
            const aValue = field === 'time' ? a[field as keyof Winner] : Number(a[field as keyof Winner]);
            const bValue = field === 'time' ? b[field as keyof Winner] : Number(b[field as keyof Winner]);
            
            if (sortOrder === 'asc') {
                return (aValue as number) - (bValue as number);
            } else {
                return (bValue as number) - (aValue as number);
            }
        });
        
        setWinners(sorted);
    };

    return (
        <Box>
            <Typography variant="h2" className="neon-text-pink" sx={{ mb: 3, textAlign: 'center' }}>
                🏆 WINNERS ({winners.length})
            </Typography>
            {/* @ts-ignore */}
            <Grid container spacing={2} sx={{ mb: 3 }} justifyContent="center">
                {/* @ts-ignore */}
                <Grid item>
                    <Button 
                        variant={sortBy === 'wins' ? 'contained' : 'outlined'}
                        className={sortBy === 'wins' ? 'neon-button' : 'neon-button-pink'}
                        onClick={() => handleSort('wins')}
                    >
                        Sort by Wins {sortBy === 'wins' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </Button>
                </Grid>
                {/* @ts-ignore */}
                <Grid item>
                    <Button 
                        variant={sortBy === 'time' ? 'contained' : 'outlined'}
                        className={sortBy === 'time' ? 'neon-button' : 'neon-button-pink'}
                        onClick={() => handleSort('time')}
                    >
                        Sort by Time {sortBy === 'time' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </Button>
                </Grid>
            </Grid>

            {winners.length === 0 ? (
                <Typography variant="h5" sx={{ textAlign: 'center', my: 4 }} className="neon-text">
                    No winners yet. Start racing!
                </Typography>
            ) : (
                <TableContainer component={Paper} className="neon-border" sx={{ 
                    backgroundColor: 'rgba(0, 20, 40, 0.9)',
                    border: '2px solid #00ffff'
                }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: 'rgba(0, 255, 255, 0.1)' }}>
                                <TableCell 
                                    sx={{ 
                                        color: '#00ffff', 
                                        fontWeight: 'bold',
                                        textAlign: 'center' 
                                    }}
                                >
                                    Car #
                                </TableCell>
                                <TableCell 
                                    sx={{ 
                                        color: '#00ffff', 
                                        fontWeight: 'bold',
                                        textAlign: 'center' 
                                    }}
                                >
                                    Car
                                </TableCell>
                                <TableCell 
                                    sx={{ 
                                        color: '#00ffff', 
                                        fontWeight: 'bold',
                                        textAlign: 'center' 
                                    }}
                                >
                                    Name
                                </TableCell>
                                <TableCell 
                                    sx={{ 
                                        color: '#00ffff', 
                                        fontWeight: 'bold',
                                        textAlign: 'center' 
                                    }}
                                >
                                    Wins
                                </TableCell>
                                <TableCell 
                                    sx={{ 
                                        color: '#00ffff', 
                                        fontWeight: 'bold',
                                        textAlign: 'center' 
                                    }}
                                >
                                    Best Time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {winners.map((winner, index) => (
                                <TableRow 
                                    key={winner.id}
                                    sx={{ 
                                        backgroundColor: index % 2 === 0 
                                            ? 'rgba(0, 255, 255, 0.05)' 
                                            : 'rgba(255, 0, 255, 0.05)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 255, 255, 0.15)',
                                        }
                                    }}
                                >
                                    <TableCell sx={{ 
                                        color: '#ff00ff', 
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize: '1.2rem'
                                    }}>
                                        {index + 1}
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>
                                        <Typography variant="h5">
                                            <img 
                                                src={getCarEmoji(winner.name)} 
                                                alt="car"
                                                style={{ width: '32px', height: '32px' }}
                                            />
                                        </Typography>
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: '#00ffff', 
                                        fontWeight: 'bold',
                                        textAlign: 'center'
                                    }}>
                                        {winner.name}
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: '#ff00ff', 
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize: '1.1rem'
                                    }}>
                                        {winner.wins}
                                    </TableCell>
                                    <TableCell sx={{ 
                                        color: '#00ff00', 
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize: '1.1rem'
                                    }}>
                                        {winner.time.toFixed(2)}s
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6" className="neon-text">
                    Total Races: {winners.reduce((sum, winner) => sum + winner.wins, 0)}
                </Typography>
                {winners.length > 0 && (
                    <Typography variant="body1" className="neon-text-pink" sx={{ mt: 1 }}>
                        Fastest Time: {Math.min(...winners.map(w => w.time)).toFixed(2)}s
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default WinnersPage;