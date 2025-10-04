// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// // import { fetchWinners } from '../../Store/winnersSlice.ts';
// // import { fetchCars } from '../../Store/garageSlice.ts';

// // interface RootState {
// //     winners: {
// //         winners: Array<{
// //             id: number;
// //             wins: number;
// //             time: number;
// //         }>;
// //         loading: boolean;
// //     };
// //     garage: {
// //         cars: Array<{
// //             id: number;
// //             name: string;
// //             color: string;
// //         }>;
// //     };
// // }

// // const WinnersPage: React.FC = () => {
// //     const dispatch = useDispatch();
// //     const { winners, loading } = useSelector((state: RootState) => state.winners);
// //     const { cars } = useSelector((state: RootState) => state.garage);

// //     useEffect(() => {
// //         // Բեռնում ա winners-ները
// //         dispatch(fetchWinners({ page: 1, limit: 100 }) as any);
// //         // Բեռնում ա cars-երը (որ name-ը ցույց տա)
// //         dispatch(fetchCars({ page: 1, limit: 1000 }) as any);
// //     }, [dispatch]);

// //     // Winners-ին ավելացնում ա car info
// //     const winnersWithCarInfo = winners.map(winner => {
// //         const car = cars.find(c => c.id === winner.id);
// //         return {
// //             ...winner,
// //             name: car?.name || 'Unknown',
// //             color: car?.color || '#FF0000'
// //         };
// //     });

// //     if (loading) {
// //         return <Typography className="neon-text">Loading...</Typography>;
// //     }

// //     return (
// //         <Box>
// //             <Typography variant="h2" className="neon-text-pink" sx={{ mb: 3, textAlign: 'center' }}>
// //                 🏆 WINNERS ({winnersWithCarInfo.length})
// //             </Typography>

// //             {winnersWithCarInfo.length === 0 ? (
// //                 <Typography variant="h5" sx={{ textAlign: 'center', my: 4 }} className="neon-text">
// //                     No winners yet. Start racing!
// //                 </Typography>
// //             ) : (
// //                 <TableContainer component={Paper} sx={{ 
// //                     backgroundColor: 'rgba(0, 20, 40, 0.9)',
// //                     border: '2px solid #00ffff'
// //                 }}>
// //                     <Table>
// //                         <TableHead>
// //                             <TableRow sx={{ backgroundColor: 'rgba(0, 255, 255, 0.1)' }}>
// //                                 <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
// //                                     #
// //                                 </TableCell>
// //                                 <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
// //                                     Car Name
// //                                 </TableCell>
// //                                 <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
// //                                     Wins
// //                                 </TableCell>
// //                                 <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
// //                                     Best Time
// //                                 </TableCell>
// //                             </TableRow>
// //                         </TableHead>
// //                         <TableBody>
// //                             {winnersWithCarInfo.map((winner, index) => (
// //                                 <TableRow 
// //                                     key={winner.id}
// //                                     sx={{ 
// //                                         backgroundColor: index % 2 === 0 
// //                                             ? 'rgba(0, 255, 255, 0.05)' 
// //                                             : 'rgba(255, 0, 255, 0.05)',
// //                                         '&:hover': {
// //                                             backgroundColor: 'rgba(0, 255, 255, 0.15)',
// //                                         }
// //                                     }}
// //                                 >
// //                                     <TableCell sx={{ color: '#ff00ff', fontWeight: 'bold', textAlign: 'center' }}>
// //                                         {index + 1}
// //                                     </TableCell>
// //                                     <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
// //                                         {winner.name}
// //                                     </TableCell>
// //                                     <TableCell sx={{ color: '#ff00ff', fontWeight: 'bold', textAlign: 'center' }}>
// //                                         {winner.wins}
// //                                     </TableCell>
// //                                     <TableCell sx={{ color: '#00ff00', fontWeight: 'bold', textAlign: 'center' }}>
// //                                         {winner.time.toFixed(2)}s
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ))}
// //                         </TableBody>
// //                     </Table>
// //                 </TableContainer>
// //             )}

// //             <Box sx={{ mt: 4, textAlign: 'center' }}>
// //                 <Typography variant="h6" className="neon-text">
// //                     Total Races: {winnersWithCarInfo.reduce((sum, w) => sum + w.wins, 0)}
// //                 </Typography>
// //                 {winnersWithCarInfo.length > 0 && (
// //                     <Typography variant="body1" className="neon-text-pink" sx={{ mt: 1 }}>
// //                         Fastest Time: {Math.min(...winnersWithCarInfo.map(w => w.time)).toFixed(2)}s
// //                     </Typography>
// //                 )}
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default WinnersPage;
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { fetchWinners } from '../../Store/winnersSlice.ts';
// import { fetchCars } from '../../Store/garageSlice.ts';

// interface Winner {
//     id: number;
//     wins: number;
//     time: number;
// }

// interface Car {
//     id: number;
//     name: string;
//     color: string;
// }

// interface RootState {
//     winners: {
//         winners: Winner[];
//         loading: boolean;
//         error: string | null;
//     };
//     garage: {
//         cars: Car[];
//     };
// }

// const WinnersPage: React.FC = () => {
//     const dispatch = useDispatch();
//     const { winners, loading, error } = useSelector((state: RootState) => state.winners);
//     const { cars } = useSelector((state: RootState) => state.garage);

//     useEffect(() => {
//         // Բեռնում ա winners-ները API-ից
//         dispatch(fetchWinners({ page: 1, limit: 100 }) as any);
        
//         // Բեռնում ա բոլոր cars-երը որ name-ը ցույց տա
//         dispatch(fetchCars({ page: 1, limit: 1000 }) as any);
//     }, [dispatch]);

//     // Winners-ին ավելացնում ա car info (name, color)
//     const winnersWithCarInfo = winners.map(winner => {
//         const car = cars.find(c => c.id === winner.id);
//         return {
//             ...winner,
//             name: car?.name || `Car #${winner.id}`,
//             color: car?.color || '#FF0000'
//         };
//     });

//     // Sort by wins (descending)
//     const sortedWinners = [...winnersWithCarInfo].sort((a, b) => b.wins - a.wins);

//     if (loading) {
//         return (
//             <Box sx={{ textAlign: 'center', mt: 10 }}>
//                 <Typography variant="h4" className="neon-text">
//                     Loading winners...
//                 </Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ textAlign: 'center', mt: 10 }}>
//                 <Typography variant="h4" className="neon-text" color="error">
//                     Error: {error}
//                 </Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box>
//             <Typography variant="h2" className="neon-text-pink" sx={{ mb: 3, textAlign: 'center' }}>
//                 🏆 WINNERS ({sortedWinners.length})
//             </Typography>

//             {sortedWinners.length === 0 ? (
//                 <Typography variant="h5" sx={{ textAlign: 'center', my: 4 }} className="neon-text">
//                     No winners yet. Start racing!
//                 </Typography>
//             ) : (
//                 <>
//                     <TableContainer 
//                         component={Paper} 
//                         sx={{ 
//                             backgroundColor: 'rgba(0, 20, 40, 0.9)',
//                             border: '2px solid #00ffff',
//                             boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
//                         }}
//                     >
//                         <Table>
//                             <TableHead>
//                                 <TableRow sx={{ backgroundColor: 'rgba(0, 255, 255, 0.1)' }}>
//                                     <TableCell 
//                                         sx={{ 
//                                             color: '#00ffff', 
//                                             fontWeight: 'bold',
//                                             textAlign: 'center',
//                                             fontSize: '1.1rem'
//                                         }}
//                                     >
//                                         Rank
//                                     </TableCell>
//                                     <TableCell 
//                                         sx={{ 
//                                             color: '#00ffff', 
//                                             fontWeight: 'bold',
//                                             textAlign: 'center',
//                                             fontSize: '1.1rem'
//                                         }}
//                                     >
//                                         Car Name
//                                     </TableCell>
//                                     <TableCell 
//                                         sx={{ 
//                                             color: '#00ffff', 
//                                             fontWeight: 'bold',
//                                             textAlign: 'center',
//                                             fontSize: '1.1rem'
//                                         }}
//                                     >
//                                         Wins
//                                     </TableCell>
//                                     <TableCell 
//                                         sx={{ 
//                                             color: '#00ffff', 
//                                             fontWeight: 'bold',
//                                             textAlign: 'center',
//                                             fontSize: '1.1rem'
//                                         }}
//                                     >
//                                         Best Time
//                                     </TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {sortedWinners.map((winner, index) => (
//                                     <TableRow 
//                                         key={winner.id}
//                                         sx={{ 
//                                             backgroundColor: index % 2 === 0 
//                                                 ? 'rgba(0, 255, 255, 0.05)' 
//                                                 : 'rgba(255, 0, 255, 0.05)',
//                                             '&:hover': {
//                                                 backgroundColor: 'rgba(0, 255, 255, 0.15)',
//                                                 transition: 'background-color 0.3s'
//                                             }
//                                         }}
//                                     >
//                                         <TableCell 
//                                             sx={{ 
//                                                 color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#ff00ff',
//                                                 fontWeight: 'bold',
//                                                 textAlign: 'center',
//                                                 fontSize: '1.3rem'
//                                             }}
//                                         >
//                                             {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`}
//                                         </TableCell>
//                                         <TableCell 
//                                             sx={{ 
//                                                 color: '#00ffff', 
//                                                 fontWeight: 'bold',
//                                                 textAlign: 'center',
//                                                 fontSize: '1.1rem'
//                                             }}
//                                         >
//                                             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
//                                                 <Box 
//                                                     sx={{ 
//                                                         width: 20, 
//                                                         height: 20, 
//                                                         backgroundColor: winner.color,
//                                                         borderRadius: '50%',
//                                                         border: '2px solid #fff'
//                                                     }} 
//                                                 />
//                                                 {winner.name}
//                                             </Box>
//                                         </TableCell>
//                                         <TableCell 
//                                             sx={{ 
//                                                 color: '#ff00ff', 
//                                                 fontWeight: 'bold',
//                                                 textAlign: 'center',
//                                                 fontSize: '1.2rem'
//                                             }}
//                                         >
//                                             {winner.wins}
//                                         </TableCell>
//                                         <TableCell 
//                                             sx={{ 
//                                                 color: '#00ff00', 
//                                                 fontWeight: 'bold',
//                                                 textAlign: 'center',
//                                                 fontSize: '1.2rem'
//                                             }}
//                                         >
//                                             {winner.time.toFixed(2)}s
//                                         </TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                     <Box sx={{ mt: 4, textAlign: 'center' }}>
//                         <Typography variant="h6" className="neon-text" sx={{ mb: 1 }}>
//                             📊 Total Races: {sortedWinners.reduce((sum, w) => sum + w.wins, 0)}
//                         </Typography>
//                         <Typography variant="h6" className="neon-text-pink">
//                             ⚡ Fastest Time: {Math.min(...sortedWinners.map(w => w.time)).toFixed(2)}s
//                         </Typography>
//                     </Box>
//                 </>
//             )}
//         </Box>
//     );
// };

// export default WinnersPage;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchWinners } from '../../Store/winnersSlice.ts';
import { fetchCars } from '../../Store/garageSlice.ts';

interface Winner {
    id: number;
    wins: number;
    time: number;
}

interface Car {
    id: number;
    name: string;
    color: string;
}

interface RootState {
    winners: {
        winners: Winner[];
        loading: boolean;
        error: string | null;
    };
    garage: {
        cars: Car[];
    };
}

const WinnersPage: React.FC = () => {
    const dispatch = useDispatch();
    const { winners, loading, error } = useSelector((state: RootState) => state.winners);
    const { cars } = useSelector((state: RootState) => state.garage);

    useEffect(() => {
        dispatch(fetchWinners({ page: 1, limit: 100 }) as any);
        dispatch(fetchCars({ page: 1, limit: 1000 }) as any);
    }, [dispatch]);

    const winnersWithCarInfo = winners.map(winner => {
        const car = cars.find(c => c.id === winner.id);
        return {
            ...winner,
            name: car?.name || `Car #${winner.id}`,
            color: car?.color || '#FF0000'
        };
    });

    // Sort by best time (fastest first)
    const sortedWinners = [...winnersWithCarInfo].sort((a, b) => a.time - b.time);

    if (loading) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h4" className="neon-text">Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h4" className="neon-text">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography variant="h2" className="neon-text-pink" sx={{ mb: 3, textAlign: 'center' }}>
                🏆 WINNERS ({sortedWinners.length})
            </Typography>

            {sortedWinners.length === 0 ? (
                <Typography variant="h5" sx={{ textAlign: 'center', my: 4 }} className="neon-text">
                    No winners yet. Start racing!
                </Typography>
            ) : (
                <>
                    <TableContainer 
                        component={Paper} 
                        sx={{ 
                            backgroundColor: 'rgba(0, 20, 40, 0.9)',
                            border: '2px solid #00ffff'
                        }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'rgba(0, 255, 255, 0.1)' }}>
                                    <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Rank
                                    </TableCell>
                                    <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Car Name
                                    </TableCell>
                                    <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Wins
                                    </TableCell>
                                    <TableCell sx={{ color: '#00ffff', fontWeight: 'bold', textAlign: 'center' }}>
                                        Best Time
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedWinners.map((winner, index) => (
                                    <TableRow 
                                        key={winner.id}
                                        sx={{ 
                                            backgroundColor: index % 2 === 0 
                                                ? 'rgba(0, 255, 255, 0.05)' 
                                                : 'rgba(255, 0, 255, 0.05)',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 255, 255, 0.15)'
                                            }
                                        }}
                                    >
                                        <TableCell sx={{ 
                                            color: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#ff00ff',
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: '1.3rem'
                                        }}>
                                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: '#00ffff', 
                                            fontWeight: 'bold',
                                            textAlign: 'center'
                                        }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                                                <Box 
                                                    sx={{ 
                                                        width: 20, 
                                                        height: 20, 
                                                        backgroundColor: winner.color,
                                                        borderRadius: '50%',
                                                        border: '2px solid #fff'
                                                    }} 
                                                />
                                                {winner.name}
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: '#ff00ff', 
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }}>
                                            {winner.wins}
                                        </TableCell>
                                        <TableCell sx={{ 
                                            color: '#00ff00', 
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            fontSize: '1.2rem'
                                        }}>
                                            {winner.time.toFixed(2)}s
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography variant="h6" className="neon-text">
                            Total Races: {sortedWinners.reduce((sum, w) => sum + w.wins, 0)}
                        </Typography>
                        <Typography variant="h6" className="neon-text-pink" sx={{ mt: 1 }}>
                            Fastest Time Ever: {sortedWinners[0].time.toFixed(2)}s by {sortedWinners[0].name}
                        </Typography>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default WinnersPage;