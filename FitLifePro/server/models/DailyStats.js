const mongoose = require('mongoose');

const DailyStatsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: String, required: true }, // Format YYYY-MM-DD to easily query by day
    steps: { type: Number, default: 0 },
    caloriesBurned: { type: Number, default: 0 },
    caloriesConsumed: { type: Number, default: 0 },
    sleepHours: { type: Number, default: 0 },
    avgHeartRate: { type: Number, default: 0 }
});

module.exports = mongoose.model('DailyStats', DailyStatsSchema);
