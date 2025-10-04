import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface WinnerModalProps {
    winner: {
        car: {
            id: number;
            name: string;
            color: string;
        };
        time: number;
    } | null;
    onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
    if (!winner) return null;

    return (
        <>
            {/* Backdrop */}
            <Box
                onClick={onClose}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    zIndex: 9998
                }}
            />
            
            {/* Modal */}
            <Box sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999,
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(20,0,40,0.95))',
                padding: 4,
                borderRadius: 2,
                border: '3px solid #ff00ff',
                boxShadow: '0 0 30px #ff00ff, 0 0 60px #ff00ff',
                textAlign: 'center',
                minWidth: '400px'
            }}>
                <Typography 
                    variant="h2" 
                    className="neon-text-pink" 
                    sx={{ mb: 2, fontSize: '3rem' }}
                >
                    🏆 WINNER! 🏆
                </Typography>
                
                <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    gap: 2,
                    mb: 2
                }}>
                    <Box 
                        sx={{ 
                            width: 40, 
                            height: 40, 
                            backgroundColor: winner.car.color,
                            borderRadius: '50%',
                            border: '3px solid #fff',
                            boxShadow: `0 0 20px ${winner.car.color}`
                        }} 
                    />
                    <Typography 
                        variant="h3" 
                        className="neon-text"
                        sx={{ fontWeight: 'bold' }}
                    >
                        {winner.car.name}
                    </Typography>
                </Box>
                
                <Typography 
                    variant="h4" 
                    className="neon-text-pink"
                    sx={{ mb: 3 }}
                >
                    ⏱️ Time: {winner.time.toFixed(2)}s
                </Typography>
                
                <Button 
                    onClick={onClose} 
                    variant="contained"
                    className="neon-button"
                    sx={{ 
                        mt: 2,
                        fontSize: '1.2rem',
                        padding: '12px 40px'
                    }}
                >
                    CLOSE
                </Button>
            </Box>
        </>
    );
};

export default WinnerModal;