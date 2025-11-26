import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Dumbbell, LogOut, Moon, Sun, User, Sparkles, Trophy } from 'lucide-react';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Dumbbell className="h-8 w-8 text-primary glow-icon" />
                    </motion.div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_rgba(var(--primary),0.5)] transition-all">
                        FitLife Pro
                    </span>
                </Link>

                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="rounded-full w-10 h-10 p-0"
                    >
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </Button>

                    {user ? (
                        <>
                            <div className="hidden md:flex items-center space-x-6 mr-4">
                                <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                                    Dashboard
                                </Link>
                                <Link to="/workouts" className="text-sm font-medium hover:text-primary transition-colors">
                                    Workouts
                                </Link>
                                <Link to="/diet" className="text-sm font-medium hover:text-primary transition-colors">
                                    Diet
                                </Link>
                                <Link to="/coach" className="text-sm font-medium hover:text-blue-500 transition-colors flex items-center gap-1">
                                    <Sparkles size={16} /> AI Coach
                                </Link>
                                <Link to="/leaderboard" className="text-sm font-medium hover:text-yellow-500 transition-colors flex items-center gap-1">
                                    <Trophy size={16} /> Leaderboard
                                </Link>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Link to="/profile">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <User className="h-5 w-5" />
                                    </Button>
                                </Link>
                                <span className="text-sm font-medium hidden sm:inline-block">
                                    {user.name}
                                </span>
                                <Button variant="outline" onClick={handleLogout} className="gap-2">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Link to="/login">
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link to="/register">
                                <Button>Get Started</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
