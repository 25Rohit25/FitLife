const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
    description: { type: String, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Meal', MealSchema);
