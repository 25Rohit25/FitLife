import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const GamificationContext = createContext();

export const GamificationProvider = ({ children }) => {
    const { user, loadUser } = useContext(AuthContext);
    const [levelUp, setLevelUp] = useState(null);

    const checkLevelUp = (gamificationData) => {
        if (gamificationData && gamificationData.leveledUp) {
            setLevelUp(gamificationData.level);
            // Reload user to get updated stats in the UI
            loadUser();

            // Auto hide confetti/modal after 5 seconds
            setTimeout(() => {
                setLevelUp(null);
            }, 5000);
        }
    };

    return (
        <GamificationContext.Provider value={{ levelUp, setLevelUp, checkLevelUp }}>
            {children}
        </GamificationContext.Provider>
    );
};
