import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ currentPage, totalPages, onPageChange, disabled = false }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 4, gap: 2 }}>
      <Button 
        variant="outlined" 
        onClick={handlePrevious}
        disabled={currentPage === 1 || disabled}
        className="neon-button"
      >
        Previous
      </Button>
      
      <Typography className="neon-text" sx={{ minWidth: '120px', textAlign: 'center' }}>
        Page {currentPage} of {totalPages}
      </Typography>
      
      <Button 
        variant="outlined" 
        onClick={handleNext}
        disabled={currentPage === totalPages || disabled}
        className="neon-button"
      >
        Next
      </Button>
    </Box>
  );
};

export default CustomPagination;