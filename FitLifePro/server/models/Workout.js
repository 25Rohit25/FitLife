const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true }, // Running, Weights, Yoga
    duration: { type: Number, required: true }, // in minutes
    intensity: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
