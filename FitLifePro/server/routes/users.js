const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // Assuming you have an auth middleware

// @route   GET api/users/leaderboard
// @desc    Get top users by XP
// @access  Public (or Private)
router.get('/leaderboard', async (req, res) => {
    try {
        // Get top 10 users sorted by XP descending
        const users = await User.find()
            .select('name gamification')
            .sort({ 'gamification.xp': -1 })
            .limit(10);
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
    const { physical, goals, name } = req.body;

    // Build profile object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (physical) profileFields.physical = physical;
    if (goals) profileFields.goals = goals;

    try {
        let user = await User.findById(req.user.id);

        if (user) {
            // Update
            user = await User.findByIdAndUpdate(
                req.user.id,
                { $set: profileFields },
                { new: true }
            ).select('-password');
            return res.json(user);
        }
        res.status(404).json({ msg: 'User not found' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/users/water
// @desc    Get today's water intake
// @access  Private
router.get('/water', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const log = user.dailyLogs.find(l => {
            const logDate = new Date(l.date);
            logDate.setHours(0, 0, 0, 0);
            return logDate.getTime() === today.getTime();
        });

        res.json({ waterIntake: log ? log.waterIntake : 0 });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/users/water
// @desc    Add water intake
// @access  Private
router.post('/water', auth, async (req, res) => {
    const { amount } = req.body; // amount in ml
    try {
        const user = await User.findById(req.user.id);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let log = user.dailyLogs.find(l => {
            const logDate = new Date(l.date);
            logDate.setHours(0, 0, 0, 0);
            return logDate.getTime() === today.getTime();
        });

        if (log) {
            log.waterIntake += amount;
        } else {
            user.dailyLogs.push({ date: new Date(), waterIntake: amount });
        }

        await user.save();

        // Return the updated total for today
        const updatedLog = user.dailyLogs.find(l => {
            const logDate = new Date(l.date);
            logDate.setHours(0, 0, 0, 0);
            return logDate.getTime() === today.getTime();
        });

        res.json({ waterIntake: updatedLog.waterIntake });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
