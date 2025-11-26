const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const DailyStats = require('../models/DailyStats');

// Get today's stats
router.get('/today', auth, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        let stats = await DailyStats.findOne({ user: req.user.id, date: today });
        if (!stats) {
            stats = new DailyStats({ user: req.user.id, date: today });
            await stats.save();
        }
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Mock Data Generator (Sync Device)
router.post('/sync-device', auth, async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0];
        let stats = await DailyStats.findOne({ user: req.user.id, date: today });
        if (!stats) {
            stats = new DailyStats({ user: req.user.id, date: today });
        }

        // Simulate random data
        const randomSteps = Math.floor(Math.random() * 5000) + 1000; // Add 1000-6000 steps
        const randomSleep = Math.floor(Math.random() * 4) + 5; // 5-9 hours
        const randomHeartRate = Math.floor(Math.random() * 60) + 60; // 60-120 bpm

        stats.steps += randomSteps;
        stats.sleepHours = randomSleep;
        stats.avgHeartRate = randomHeartRate;

        await stats.save();
        res.json(stats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
