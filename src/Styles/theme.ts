import { createTheme } from '@mui/material/styles';

interface NeonColors {
  cyan: string;
  pink: string;
  purple: string;
  orange: string;
  green: string;
  blue: string;
  white: string;
  darkBlue: string;
  darkerBlue: string;
  darkNavy: string;
}

const neonColors: NeonColors = {
  cyan: '#00ffff',
  pink: '#ff00ff', 
  purple: '#8a2be2',
  orange: '#ff6600',
  green: '#00ff00',
  blue: '#0066ff',
  white: '#ffffff',
  darkBlue: '#0a0a2e',
  darkerBlue: '#16213e',
  darkNavy: '#0f0f23',
};

export const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: neonColors.cyan,
      light: neonColors.cyan,
      dark: '#00cccc',
    },
    secondary: {
      main: neonColors.pink,
      light: neonColors.pink,
      dark: '#cc00cc',
    },
    background: {
      default: neonColors.darkNavy,
      paper: neonColors.darkerBlue,
    },
    text: {
      primary: neonColors.white,
      secondary: neonColors.cyan,
    },
    success: {
      main: neonColors.green,
    },
    warning: {
      main: neonColors.orange,
    },
    info: {
      main: neonColors.blue,
    },
  },
  typography: {
    fontFamily: [
      'Orbitron',
      'Roboto Mono',
      'monospace',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      textShadow: `0 0 10px ${neonColors.cyan}`,
      color: neonColors.cyan,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      textShadow: `0 0 8px ${neonColors.pink}`,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      textShadow: `0 0 6px ${neonColors.cyan}`,
    },
    button: {
      fontFamily: 'Orbitron, monospace',
      fontWeight: 600,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: `2px solid ${neonColors.cyan}`,
          boxShadow: `0 0 15px ${neonColors.cyan}30`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: `0 0 25px ${neonColors.cyan}60`,
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: `linear-gradient(45deg, ${neonColors.cyan}20, ${neonColors.purple}20)`,
          '&:hover': {
            background: `linear-gradient(45deg, ${neonColors.cyan}40, ${neonColors.purple}40)`,
          },
        },
        outlined: {
          borderColor: neonColors.cyan,
          color: neonColors.cyan,
          '&:hover': {
            borderColor: neonColors.pink,
            color: neonColors.pink,
            boxShadow: `0 0 20px ${neonColors.pink}40`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: neonColors.darkerBlue,
          border: `1px solid ${neonColors.cyan}40`,
          borderRadius: '12px',
          boxShadow: `0 4px 20px ${neonColors.cyan}20`,
          '&:hover': {
            border: `1px solid ${neonColors.cyan}80`,
            boxShadow: `0 6px 30px ${neonColors.cyan}30`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: neonColors.cyan,
              boxShadow: `0 0 5px ${neonColors.cyan}30`,
            },
            '&:hover fieldset': {
              borderColor: neonColors.pink,
              boxShadow: `0 0 10px ${neonColors.pink}40`,
            },
            '&.Mui-focused fieldset': {
              borderColor: neonColors.cyan,
              boxShadow: `0 0 15px ${neonColors.cyan}60`,
            },
          },
          '& .MuiInputLabel-root': {
            color: neonColors.cyan,
            '&.Mui-focused': {
              color: neonColors.cyan,
            },
          },
          '& .MuiOutlinedInput-input': {
            color: neonColors.white,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: neonColors.darkNavy,
          borderBottom: `2px solid ${neonColors.cyan}`,
          boxShadow: `0 2px 10px ${neonColors.cyan}30`,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            color: neonColors.cyan,
            fontWeight: 600,
            fontSize: '1.1rem',
            '&.Mui-selected': {
              color: neonColors.pink,
              textShadow: `0 0 8px ${neonColors.pink}`,
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: neonColors.pink,
            height: '3px',
            boxShadow: `0 0 10px ${neonColors.pink}`,
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          backgroundColor: neonColors.darkerBlue,
          border: `1px solid ${neonColors.cyan}40`,
          borderRadius: '8px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: neonColors.darkNavy,
          color: neonColors.cyan,
          fontWeight: 700,
          borderBottom: `2px solid ${neonColors.cyan}`,
          textShadow: `0 0 5px ${neonColors.cyan}`,
        },
        body: {
          color: neonColors.white,
          borderBottom: `1px solid ${neonColors.cyan}30`,
        },
      },
    },
  },
});

export default cyberpunkTheme;