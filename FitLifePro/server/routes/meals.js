const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Meal = require('../models/Meal');
const DailyStats = require('../models/DailyStats');

// Get all meals
router.get('/', auth, async (req, res) => {
    try {
        const meals = await Meal.find({ user: req.user.id }).sort({ date: -1 });
        res.json(meals);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add meal
router.post('/', auth, async (req, res) => {
    const { type, description, calories } = req.body;
    try {
        const newMeal = new Meal({
            user: req.user.id,
            type,
            description,
            calories
        });
        const meal = await newMeal.save();

        // Update Daily Stats
        const today = new Date().toISOString().split('T')[0];
        let stats = await DailyStats.findOne({ user: req.user.id, date: today });
        if (!stats) {
            stats = new DailyStats({ user: req.user.id, date: today });
        }
        stats.caloriesConsumed += calories;
        await stats.save();

        res.json(meal);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
