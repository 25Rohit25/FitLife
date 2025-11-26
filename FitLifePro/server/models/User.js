const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    physical: {
        height: { type: Number }, // cm
        weight: { type: Number }, // kg
        age: { type: Number },
        gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'] }
    },
    goals: {
        dailySteps: { type: Number, default: 10000 },
        targetWeight: { type: Number, default: 70 },
        dailyCalories: { type: Number, default: 2000 },
        weeklyWorkouts: { type: Number, default: 4 }
    },
    gamification: {
        xp: { type: Number, default: 0 },
        level: { type: Number, default: 1 },
        currentStreak: { type: Number, default: 0 },
        lastActivityDate: { type: Date, default: Date.now },
        badges: [{ type: String }] // e.g., 'First Workout', '7 Day Streak'
    },
    dailyLogs: [{
        date: { type: Date, default: Date.now },
        waterIntake: { type: Number, default: 0 } // in ml
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
