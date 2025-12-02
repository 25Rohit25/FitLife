import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Droplets, Plus, Minus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

const HydrationTracker = () => {
    const [waterIntake, setWaterIntake] = useState(0);
    const [loading, setLoading] = useState(true);
    const goal = 2500; // Daily goal in ml

    useEffect(() => {
        const fetchWater = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/users/water', {
                    headers: { 'x-auth-token': token }
                });
                setWaterIntake(res.data.waterIntake);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWater();
    }, []);

    const updateWater = async (amount) => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('http://localhost:5000/api/users/water', { amount }, {
                headers: { 'x-auth-token': token }
            });
            setWaterIntake(res.data.waterIntake);
        } catch (err) {
            console.error(err);
        }
    };

    const progress = Math.min((waterIntake / goal) * 100, 100);

    return (
        <Card className="border-l-4 border-l-cyan-500 hover:shadow-lg transition-shadow h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Hydration</CardTitle>
                <Droplets className="h-4 w-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-end mb-2">
                    <div className="text-2xl font-bold">{waterIntake} <span className="text-sm font-normal text-muted-foreground">ml</span></div>
                    <div className="text-xs text-muted-foreground">Goal: {goal}ml</div>
                </div>

                <div className="w-full bg-secondary h-3 rounded-full overflow-hidden mb-4 relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="bg-cyan-500 h-full rounded-full absolute top-0 left-0"
                    />
                    {/* Bubbles animation effect could go here */}
                </div>

                <div className="flex gap-2 justify-center">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateWater(-250)}
                        className="h-8 w-8 rounded-full p-0"
                        disabled={waterIntake <= 0}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => updateWater(250)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white h-8 px-3 rounded-full text-xs"
                    >
                        <Plus className="h-3 w-3 mr-1" /> 250ml
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default HydrationTracker;
