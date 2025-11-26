const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Workout = require('../models/Workout');
const DailyStats = require('../models/DailyStats');

// Get all workouts for user
router.get('/', auth, async (req, res) => {
    try {
        const workouts = await Workout.find({ user: req.user.id }).sort({ date: -1 });
        res.json(workouts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add workout
router.post('/', auth, async (req, res) => {
    const { type, duration, intensity, caloriesBurned } = req.body;
    try {
        const newWorkout = new Workout({
            user: req.user.id,
            type,
            duration,
            intensity,
            caloriesBurned
        });
        const workout = await newWorkout.save();

        // Update Daily Stats
        const today = new Date().toISOString().split('T')[0];
        let stats = await DailyStats.findOne({ user: req.user.id, date: today });
        if (!stats) {
            stats = new DailyStats({ user: req.user.id, date: today });
        }
        stats.caloriesBurned += caloriesBurned;
        await stats.save();

        // Gamification: Add XP (e.g., 10 XP per workout + 1 XP per minute)
        const { addXP } = require('../utils/gamification');
        const xpEarned = 10 + Math.floor(duration / 2);
        const gamificationResult = await addXP(req.user.id, xpEarned);

        res.json({ ...workout.toObject(), gamification: gamificationResult });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete workout
router.delete('/:id', auth, async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (!workout) return res.status(404).json({ msg: 'Workout not found' });

        if (workout.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await workout.deleteOne();

        // Note: Ideally we should decrement the stats here too, but for simplicity keeping it as is or adding basic decrement
        const today = new Date(workout.date).toISOString().split('T')[0];
        let stats = await DailyStats.findOne({ user: req.user.id, date: today });
        if (stats) {
            stats.caloriesBurned = Math.max(0, stats.caloriesBurned - workout.caloriesBurned);
            await stats.save();
        }

        res.json({ msg: 'Workout removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
