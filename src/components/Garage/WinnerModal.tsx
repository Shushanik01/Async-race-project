import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface Car {
    id: number;
    name: string;
    color: string;
}

interface WinnerModalProps {
    winner: Car | null;
    onClose: () => void;
}

const WinnerModal: React.FC<WinnerModalProps> = ({ winner, onClose }) => {
    if (!winner) return null;

    return (
        <Box sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',   
            zIndex: 9999,
            background: 'rgba(0,0,0,0.9)',
            padding: 4,
            borderRadius: 2,
            border: '3px solid #ff00ff',
            textAlign: 'center'
        }}>
            <Typography variant="h3" className="neon-text-pink">
                WINNER: {winner.name}
            </Typography>
            <Button onClick={onClose} sx={{ mt: 2 }}>
                CLOSE
            </Button>
        </Box>
    );
};

export default WinnerModal;