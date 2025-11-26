const User = require('../models/User');

const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500, 5500, 6600, 7800, 9100, 10500]; // XP needed for each level

const addXP = async (userId, amount) => {
    try {
        const user = await User.findById(userId);
        if (!user) return null;

        user.gamification.xp += amount;

        // Check for level up
        const currentLevel = user.gamification.level;
        let newLevel = currentLevel;

        // Simple logic: Check if XP exceeds threshold for next level
        // We iterate to find the highest level possible with current XP
        for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (user.gamification.xp >= LEVEL_THRESHOLDS[i]) {
                newLevel = i + 1; // Levels are 1-indexed
                break;
            }
        }

        let leveledUp = false;
        if (newLevel > currentLevel) {
            user.gamification.level = newLevel;
            leveledUp = true;
        }

        // Update Streak (Simple daily check)
        const today = new Date().setHours(0, 0, 0, 0);
        const lastActivity = new Date(user.gamification.lastActivityDate).setHours(0, 0, 0, 0);

        if (today > lastActivity) {
            const oneDay = 24 * 60 * 60 * 1000;
            if (today - lastActivity === oneDay) {
                user.gamification.currentStreak += 1;
            } else if (today - lastActivity > oneDay) {
                user.gamification.currentStreak = 1; // Reset streak if missed a day
            }
            user.gamification.lastActivityDate = Date.now();
        }

        await user.save();

        return {
            xpAdded: amount,
            totalXP: user.gamification.xp,
            level: user.gamification.level,
            leveledUp
        };
    } catch (err) {
        console.error('Gamification Error:', err);
        return null;
    }
};

module.exports = { addXP };
