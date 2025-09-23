import React from 'react';
import {AppBar,Toolbar,Typography,Container, Box,Tabs,Tab} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentTab = location.pathname === '/winners' ? 1 : 0;

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        const path = newValue === 0 ? '/garage' : '/winners';
        navigate(path);
    };

    return (
        <Box sx={{ minHeight: '100vh' }}>
         
            <AppBar position="sticky" elevation={0}>
                <Toolbar>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                flexGrow: 1,
                                fontSize: { xs: '1.8rem', md: '2.5rem' },
                                fontFamily: 'Orbitron, monospace',
                            }}
                            className="neon-text"
                        >
                            🏎️ ASYNC RACE
                        </Typography>
                    </motion.div>

                    <Box sx={{ ml: 'auto' }}>
                        <Tabs
                            value={currentTab}
                            onChange={handleTabChange}
                            textColor="inherit"
                            sx={{
                                '& .MuiTab-root': {
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    minWidth: 120,
                                    fontFamily: 'Orbitron, monospace',
                                },
                            }}
                        >
                            <Tab
                                label="GARAGE"
                                sx={{
                                    color: currentTab === 0 ? 'secondary.main' : 'primary.main',
                                }}
                            />
                            <Tab
                                label="WINNERS"
                                sx={{
                                    color: currentTab === 1 ? 'secondary.main' : 'primary.main',
                                }}
                            />
                        </Tabs>
                    </Box>
                 
                </Toolbar>
            </AppBar>

            <Container
                maxWidth="xl"
                sx={{
                    py: 3,
                    minHeight: 'calc(100vh - 64px)',
                }}
            >
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </Container>

            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    zIndex: -1,
                    overflow: 'hidden',
                }}
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            top: `${20 + i * 15}%`,
                            left: '-100px',
                            width: '200px',
                            height: '2px',
                            background: `linear-gradient(90deg, transparent, #00ffff40, transparent)`,
                        }}
                        animate={{
                            x: ['-100px', 'calc(100vw + 100px)'],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.8,
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
};

export default Layout;