import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Dumbbell } from 'lucide-react';
import axios from 'axios';

// Simplified SVG paths for muscle groups (Front View)
const MUSCLE_PATHS = {
    chest: "M145,110 Q175,110 205,110 Q220,140 200,160 Q175,170 145,160 Q120,170 90,160 Q70,140 85,110 Q115,110 145,110",
    abs: "M145,160 Q170,170 175,230 Q145,240 115,230 Q120,170 145,160",
    biceps_left: "M215,120 Q235,125 240,150 Q230,170 210,160 Q205,140 215,120",
    biceps_right: "M75,120 Q55,125 50,150 Q60,170 80,160 Q85,140 75,120",
    shoulders_left: "M205,110 Q235,110 245,130 Q235,140 215,120",
    shoulders_right: "M85,110 Q55,110 45,130 Q55,140 75,120",
    quads_left: "M175,230 Q200,240 205,320 Q175,340 150,320 Q155,240 175,230",
    quads_right: "M115,230 Q90,240 85,320 Q115,340 140,320 Q135,240 115,230",
};

const EXERCISE_DATA = {
    chest: [
        { name: "Bench Press", difficulty: "Intermediate" },
        { name: "Push Ups", difficulty: "Beginner" },
        { name: "Dumbbell Flys", difficulty: "Intermediate" }
    ],
    abs: [
        { name: "Crunches", difficulty: "Beginner" },
        { name: "Plank", difficulty: "Beginner" },
        { name: "Leg Raises", difficulty: "Intermediate" }
    ],
    biceps_left: [
        { name: "Bicep Curls", difficulty: "Beginner" },
        { name: "Hammer Curls", difficulty: "Intermediate" }
    ],
    biceps_right: [
        { name: "Bicep Curls", difficulty: "Beginner" },
        { name: "Hammer Curls", difficulty: "Intermediate" }
    ],
    shoulders_left: [
        { name: "Overhead Press", difficulty: "Intermediate" },
        { name: "Lateral Raises", difficulty: "Intermediate" }
    ],
    shoulders_right: [
        { name: "Overhead Press", difficulty: "Intermediate" },
        { name: "Lateral Raises", difficulty: "Intermediate" }
    ],
    quads_left: [
        { name: "Squats", difficulty: "Advanced" },
        { name: "Lunges", difficulty: "Intermediate" }
    ],
    quads_right: [
        { name: "Squats", difficulty: "Advanced" },
        { name: "Lunges", difficulty: "Intermediate" }
    ]
};

const MuscleMap = () => {
    const [selectedMuscle, setSelectedMuscle] = useState(null);
    const [aiRecommendation, setAiRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleMuscleClick = async (muscle) => {
        setSelectedMuscle(muscle);
        setLoading(true);
        setAiRecommendation(null);

        try {
            const exercises = EXERCISE_DATA[muscle] || [];
            const exerciseNames = exercises.map(e => e.name).join(', ');

            const res = await axios.post('http://localhost:5000/api/ai/ask', {
                prompt: `Give me a quick pro tip for each of these exercises: ${exerciseNames}. Format as bullet points.`,
                context: 'User is viewing a workout demonstration list.'
            });
            setAiRecommendation(res.data.answer);
        } catch (err) {
            console.error(err);
            setAiRecommendation("Could not fetch tips. Focus on form and control.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col lg:flex-row items-start justify-center gap-8 p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
            {/* Interactive Body Map */}
            <div className="relative w-64 h-96 shrink-0 mx-auto lg:mx-0">
                <svg viewBox="0 0 290 400" className="w-full h-full drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    {/* Silhouette Outline */}
                    <path
                        d="M145,20 Q180,20 190,50 Q200,60 230,65 Q260,70 270,100 Q280,150 260,180 Q250,200 240,220 Q250,280 240,350 Q230,390 200,390 Q180,390 170,350 Q160,300 145,280 Q130,300 120,350 Q110,390 90,390 Q60,390 50,350 Q40,280 50,220 Q40,200 30,180 Q10,150 20,100 Q30,70 60,65 Q90,60 100,50 Q110,20 145,20"
                        fill="#1e293b"
                        stroke="#3b82f6"
                        strokeWidth="2"
                        className="opacity-50"
                    />

                    {/* Interactive Muscles */}
                    {Object.entries(MUSCLE_PATHS).map(([muscle, path]) => (
                        <motion.path
                            key={muscle}
                            d={path}
                            fill={selectedMuscle === muscle ? "#3b82f6" : "#334155"}
                            stroke="#60a5fa"
                            strokeWidth="1"
                            whileHover={{ scale: 1.05, fill: "#60a5fa", cursor: "pointer" }}
                            onClick={() => handleMuscleClick(muscle)}
                            className="transition-colors duration-300"
                            style={{ originX: "50%", originY: "50%" }}
                        />
                    ))}
                </svg>

                <div className="absolute bottom-0 left-0 right-0 text-center text-xs text-muted-foreground">
                    Click a muscle group
                </div>
            </div>

            {/* Info Panel */}
            <AnimatePresence mode="wait">
                {selectedMuscle ? (
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 w-full max-w-xl space-y-6"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-bold capitalize text-primary flex items-center gap-2">
                                <Dumbbell size={24} /> {selectedMuscle.replace('_', ' ').replace('left', '').replace('right', '')}
                            </h3>
                            <button onClick={() => setSelectedMuscle(null)} className="text-muted-foreground hover:text-foreground">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Recommended Exercises List (Text Only) */}
                        <div className="flex flex-wrap gap-2">
                            {EXERCISE_DATA[selectedMuscle]?.map((ex, i) => (
                                <span key={i} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-medium text-primary">
                                    {ex.name}
                                </span>
                            ))}
                        </div>

                        {/* AI Tips */}
                        <div className="bg-background/80 backdrop-blur-md p-6 rounded-xl border border-primary/20 shadow-lg">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-4 space-y-3">
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                                    <p className="text-sm text-muted-foreground animate-pulse">AI Coach is analyzing exercises...</p>
                                </div>
                            ) : (
                                <div className="prose prose-invert prose-sm max-w-none">
                                    <div className="flex items-center gap-2 mb-3 text-yellow-400">
                                        <Sparkles size={16} />
                                        <span className="text-xs font-bold uppercase tracking-wider">Pro Form Tips</span>
                                    </div>
                                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                                        {aiRecommendation}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-1 h-96 flex flex-col items-center justify-center text-center p-8 text-muted-foreground border-2 border-dashed border-white/10 rounded-xl"
                    >
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Dumbbell size={40} className="text-primary" />
                        </div>
                        <h3 className="text-2xl font-semibold mb-2 text-foreground">Interactive Muscle Map</h3>
                        <p className="max-w-sm mx-auto text-lg">Select any muscle group on the body map to get instant, AI-powered workout recommendations tailored for that area.</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MuscleMap;
