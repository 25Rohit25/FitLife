import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Utensils, Flame, Sparkles, ScanLine, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

const DietTracker = () => {
    const [meals, setMeals] = useState([]);
    const [aiPrompt, setAiPrompt] = useState('');
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: 'Breakfast',
        description: '',
        calories: ''
    });

    const fetchMeals = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/meals');
            setMeals(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMeals();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/meals', formData);
            setFormData({ type: 'Breakfast', description: '', calories: '' });
            fetchMeals();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAiLog = async (e) => {
        e.preventDefault();
        if (!aiPrompt.trim()) return;

        setIsAiLoading(true);
        try {
            const res = await axios.post('http://localhost:5000/api/ai/ask', {
                prompt: `Analyze this food intake: "${aiPrompt}". Return a JSON array of objects with these exact keys: "type" (guess Breakfast/Lunch/Dinner/Snack based on food), "description" (food name), "calories" (estimated number). Return ONLY the JSON, no markdown, no explanations.`,
                context: "You are a nutritionist API. Output raw JSON only."
            });

            let jsonStr = res.data.answer;
            // Clean up markdown if present
            jsonStr = jsonStr.replace(/```json/g, '').replace(/```/g, '').trim();
            const detectedMeals = JSON.parse(jsonStr);

            // Add each meal
            for (const meal of detectedMeals) {
                await axios.post('http://localhost:5000/api/meals', meal);
            }
            fetchMeals();
            setAiPrompt('');
        } catch (err) {
            console.error("AI Error", err);
            alert("Could not parse food. Try being more specific.");
        } finally {
            setIsAiLoading(false);
        }
    };

    const totalCalories = meals.reduce((acc, meal) => acc + meal.calories, 0);

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-700 bg-clip-text text-transparent">
                        Diet Tracker
                    </h1>
                    <p className="text-muted-foreground mt-1">Monitor your nutrition</p>
                </div>
                <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-4 flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Flame className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium">Total Calories</p>
                            <p className="text-xl font-bold text-primary">{totalCalories} <span className="text-sm font-normal text-muted-foreground">kcal</span></p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-green-500/10 shadow-lg shadow-green-500/5">
                <CardHeader>
                    <CardTitle>Log a Meal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* AI Quick Log */}
                    <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 rounded-xl border border-indigo-500/20 group">
                        <div className="absolute inset-0 z-0">
                            <img
                                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80"
                                alt="Healthy Food"
                                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                            />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Sparkles className="h-5 w-5 text-indigo-400" />
                                <h3 className="font-semibold text-indigo-100">AI Quick Log</h3>
                            </div>
                            <form onSubmit={handleAiLog} className="flex gap-2">
                                <Input
                                    placeholder="e.g. '2 eggs and avocado toast' or 'Chicken salad'"
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    className="bg-background/50 border-indigo-500/30 focus:border-indigo-500 backdrop-blur-sm"
                                />
                                <Button
                                    type="submit"
                                    disabled={isAiLoading}
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white min-w-[100px]"
                                >
                                    {isAiLoading ? (
                                        <ScanLine className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <>
                                            Auto Add <ArrowRight className="h-4 w-4 ml-1" />
                                        </>
                                    )}
                                </Button>
                            </form>
                            <p className="text-xs text-muted-foreground mt-2 ml-1">
                                ✨ Magic: Type what you ate, and AI will calculate calories & macros for you.
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or log manually</span>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                        <div className="md:col-span-3 space-y-2">
                            <label className="text-sm font-medium">Meal Type</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Snack</option>
                            </select>
                        </div>
                        <div className="md:col-span-6 space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <div className="relative">
                                <Utensils className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="e.g. Oatmeal with berries"
                                    className="pl-9"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-medium">Calories</label>
                            <div className="relative">
                                <Flame className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="number"
                                    className="pl-9"
                                    value={formData.calories}
                                    onChange={(e) => setFormData({ ...formData, calories: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:col-span-1">
                            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white" size="icon">
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Today's Meals</h3>
                <div className="grid gap-4">
                    <AnimatePresence>
                        {meals.length === 0 ? (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-muted-foreground text-center py-8"
                            >
                                No meals logged yet. Eat something healthy!
                            </motion.p>
                        ) : (
                            meals.map((meal) => (
                                <motion.div
                                    key={meal._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    layout
                                >
                                    <Card className="hover:bg-accent/50 transition-colors border-l-4 border-l-green-500">
                                        <CardContent className="p-4 flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                                    <Utensils className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{meal.type}</h4>
                                                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="block font-bold text-green-500">{meal.calories} kcal</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* AI Meal Planner Section */}
            <Card className="border-indigo-500/20 shadow-lg shadow-indigo-500/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-indigo-500" /> AI Meal Planner
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Stuck on what to eat? Let AI generate a personalized meal plan for you based on your calorie goals.
                        </p>
                        <Button
                            onClick={async () => {
                                const prompt = "Generate a healthy daily meal plan (Breakfast, Lunch, Dinner, Snack) for a 2000 calorie diet. Format as a clean list with calories for each meal.";
                                try {
                                    const res = await axios.post('http://localhost:5000/api/ai/ask', {
                                        prompt,
                                        context: "You are a nutritionist."
                                    });
                                    alert(res.data.answer); // Simple alert for now, can be a modal
                                } catch (e) {
                                    alert("AI is busy, try again!");
                                }
                            }}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            Generate Today's Plan
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DietTracker;
