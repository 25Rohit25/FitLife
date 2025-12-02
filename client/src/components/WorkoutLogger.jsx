import React, { useState, useEffect, useContext } from 'react';
import { GamificationContext } from '../context/GamificationContext';
import axios from 'axios';
import { Trash2, Plus, Activity, Clock, Flame, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

const WorkoutLogger = () => {
    const [workouts, setWorkouts] = useState([]);
    const [formData, setFormData] = useState({
        type: '',
        duration: '',
        intensity: 'Medium',
        caloriesBurned: ''
    });

    const fetchWorkouts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/workouts');
            setWorkouts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const { checkLevelUp } = useContext(GamificationContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/workouts', formData);

            // Check for gamification rewards
            if (res.data.gamification) {
                checkLevelUp(res.data.gamification);
            }

            setFormData({ type: '', duration: '', intensity: 'Medium', caloriesBurned: '' });
            fetchWorkouts();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/workouts/${id}`);
            fetchWorkouts();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                        Workout Logger
                    </h1>
                    <p className="text-muted-foreground mt-1">Track your fitness journey</p>
                </div>
            </div>

            <Card className="border-primary/10 shadow-lg shadow-primary/5">
                <CardHeader>
                    <CardTitle>Log a New Workout</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Quick Templates with Images */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            {
                                label: "Push Day",
                                type: "Weightlifting (Push)",
                                duration: 60,
                                cal: 300,
                                image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80" // Gym/Pushup
                            },
                            {
                                label: "Pull Day",
                                type: "Weightlifting (Pull)",
                                duration: 60,
                                cal: 300,
                                image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&q=80" // Pullup/Gym
                            },
                            {
                                label: "Leg Day",
                                type: "Weightlifting (Legs)",
                                duration: 60,
                                cal: 400,
                                image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&q=80" // Squat/Legs
                            },
                            {
                                label: "5k Run",
                                type: "Running",
                                duration: 30,
                                cal: 350,
                                image: "https://images.unsplash.com/photo-1502904550040-7534597429ae?w=800&q=80" // Running
                            },
                        ].map((template, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.03, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                type="button"
                                onClick={() => setFormData({
                                    type: template.type,
                                    duration: template.duration,
                                    intensity: 'High',
                                    caloriesBurned: template.cal
                                })}
                                className="relative group overflow-hidden rounded-2xl aspect-[4/3] shadow-lg border border-white/10"
                            >
                                <img
                                    src={template.image}
                                    alt={template.label}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 brightness-75 group-hover:brightness-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 text-left">
                                    <span className="text-white font-bold text-lg drop-shadow-lg flex items-center gap-2">
                                        {template.label}
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity -ml-2 group-hover:ml-0" />
                                    </span>
                                    <span className="text-white/90 text-xs font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-md w-fit mt-1 border border-white/10">
                                        {template.duration} min • {template.cal} kcal
                                    </span>
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or custom entry</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-4 space-y-2">
                            <label className="text-sm font-medium">Type</label>
                            <div className="relative">
                                <Activity className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="e.g. Running, Weightlifting"
                                    className="pl-9"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium">Duration (min)</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-sm font-medium">Intensity</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={formData.intensity}
                                onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
                            >
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium">Calories</label>
                            <div className="relative">
                                <Flame className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={formData.caloriesBurned}
                                    onChange={(e) => setFormData({ ...formData, caloriesBurned: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <Button type="submit" className="w-full" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Recent Workouts</h3>
                <div className="grid gap-4">
                    <AnimatePresence>
                        {workouts.length === 0 ? (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-muted-foreground text-center py-8"
                            >
                                No workouts logged yet. Start moving!
                            </motion.p>
                        ) : (
                            workouts.map((workout) => (
                                <motion.div
                                    key={workout._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    layout
                                >
                                    <Card className="hover:bg-accent/50 transition-colors">
                                        <CardContent className="p-4 flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                    <Activity className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{workout.type}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(workout.date).toLocaleDateString()} • {workout.duration} mins • {workout.intensity}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right hidden sm:block">
                                                    <span className="block font-bold text-primary">+{workout.caloriesBurned} kcal</span>
                                                    <span className="text-xs text-muted-foreground">Burned</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(workout._id)}
                                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default WorkoutLogger;
