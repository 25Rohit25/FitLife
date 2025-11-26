const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const startServer = async () => {
    let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitlifepro';

    try {
        await mongoose.connect(mongoUri);
        console.log('MongoDB Connected');
    } catch (err) {
        console.log('Local MongoDB not found, attempting to use In-Memory MongoDB...');
        try {
            const { MongoMemoryServer } = require('mongodb-memory-server');
            const mongod = await MongoMemoryServer.create();
            mongoUri = mongod.getUri();
            await mongoose.connect(mongoUri);
            console.log('In-Memory MongoDB Connected at', mongoUri);
        } catch (memErr) {
            console.error('Failed to start In-Memory MongoDB', memErr);
        }
    }
};

startServer();

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('FitLife Pro API is running');
});

// Import Routes
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workouts');
const mealRoutes = require('./routes/meals');
const statsRoutes = require('./routes/stats');

app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/ai', require('./routes/ai'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
