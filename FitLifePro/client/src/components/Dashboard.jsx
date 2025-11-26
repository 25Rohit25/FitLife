import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { GamificationContext } from '../context/GamificationContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid } from 'recharts';
import { RefreshCw, Activity, Flame, Utensils, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import MuscleMap from './ui/MuscleMap';
import HydrationTracker from './HydrationTracker';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const { checkLevelUp } = useContext(GamificationContext);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/stats/today');
            setStats(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const syncDevice = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/stats/sync-device');
            setStats(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    const stepsProgress = Math.min((stats?.steps / (user?.goals?.dailySteps || 10000)) * 100, 100);

    const macroData = [
        { name: 'Carbs', value: 400 },
        { name: 'Protein', value: 300 },
        { name: 'Fats', value: 300 },
    ];
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Gamification Hero Section */}
            <motion.div variants={itemVariants} className="relative overflow-hidden rounded-2xl bg-black p-8 text-white shadow-2xl group">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
                        alt="Gym Background"
                        className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 to-indigo-900/80 mix-blend-multiply"></div>
                </div>

                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-3xl z-0"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-black/10 blur-3xl z-0"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border-4 border-white/30 shadow-xl">
                                <span className="text-4xl font-black">
                                    {user?.gamification?.level || 1}
                                </span>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-white">
                                LEVEL
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold mb-1">Keep Crushing It!</h2>
                            <p className="text-indigo-100 mb-4">You are doing great, {user?.name?.split(' ')[0]}!</p>

                            <div className="w-full max-w-xs bg-black/20 h-4 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(((user?.gamification?.xp || 0) % 100) / 100 * 100, 100)}%` }} // Simplified progress logic for demo
                                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500"
                                />
                            </div>
                            <div className="flex justify-between text-xs mt-1 text-indigo-200 font-medium">
                                <span>{user?.gamification?.xp || 0} XP</span>
                                <span>Next Level</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center min-w-[100px]">
                            <div className="text-2xl font-bold text-yellow-300 mb-1">
                                {user?.gamification?.currentStreak || 0} 🔥
                            </div>
                            <div className="text-xs font-medium text-indigo-100 uppercase tracking-wider">Day Streak</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center min-w-[100px]">
                            <div className="text-2xl font-bold text-green-300 mb-1">
                                {user?.gamification?.badges?.length || 0} 🏆
                            </div>
                            <div className="text-xs font-medium text-indigo-100 uppercase tracking-wider">Badges</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-8">
                <div>
                    <h3 className="text-2xl font-bold">Daily Stats</h3>
                </div>
                <Button onClick={syncDevice} className="gap-2 shadow-lg shadow-primary/20">
                    <RefreshCw size={18} className={loading ? "animate-spin" : ""} /> Sync Device
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div variants={itemVariants}>
                    <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Steps</CardTitle>
                            <Activity className="h-4 w-4 text-blue-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.steps?.toLocaleString()}</div>
                            <div className="w-full bg-secondary h-2 mt-3 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${stepsProgress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-blue-500 h-full rounded-full"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{stepsProgress.toFixed(0)}% of goal</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
                            <Flame className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.caloriesBurned} <span className="text-sm font-normal text-muted-foreground">kcal</span></div>
                            <p className="text-xs text-muted-foreground mt-1">+12% from yesterday</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Calories Consumed</CardTitle>
                            <Utensils className="h-4 w-4 text-green-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.caloriesConsumed} <span className="text-sm font-normal text-muted-foreground">kcal</span></div>
                            <p className="text-xs text-muted-foreground mt-1">Within daily limit</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sleep Duration</CardTitle>
                            <Moon className="h-4 w-4 text-purple-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats?.sleepHours} <span className="text-sm font-normal text-muted-foreground">hrs</span></div>
                            <p className="text-xs text-muted-foreground mt-1">Good quality sleep</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <HydrationTracker />
                </motion.div>
            </div>

            {/* Muscle Map Section */}
            <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">Body Focus & AI Tips</h3>
                </div>
                <MuscleMap />
            </motion.div>

            {/* Charts */}
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activity Chart */}
                <motion.div variants={itemVariants} className="h-full">
                    <Card className="h-full border-none shadow-xl bg-gradient-to-br from-card to-secondary/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                Activity Trends
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[{ name: 'Today', steps: stats?.steps || 0, goal: user?.goals?.dailySteps || 10000 }]}>
                                    <defs>
                                        <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} opacity={0.5} />
                                    <XAxis
                                        dataKey="name"
                                        stroke="var(--muted-foreground)"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <YAxis
                                        stroke="var(--muted-foreground)"
                                        tickLine={false}
                                        axisLine={false}
                                        tick={{ fontSize: 12 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'var(--muted)', opacity: 0.2 }}
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-popover border border-border p-3 rounded-xl shadow-lg">
                                                        <p className="font-semibold mb-1">{payload[0].payload.name}</p>
                                                        <p className="text-primary text-sm">
                                                            Steps: <span className="font-bold">{payload[0].value}</span>
                                                        </p>
                                                        <p className="text-muted-foreground text-xs">
                                                            Goal: {payload[0].payload.goal}
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                    <Bar
                                        dataKey="steps"
                                        fill="url(#colorSteps)"
                                        radius={[8, 8, 0, 0]}
                                        barSize={60}
                                        animationDuration={1500}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Macro Breakdown Chart */}
                <motion.div variants={itemVariants} className="h-full">
                    <Card className="h-full border-none shadow-xl bg-gradient-to-br from-card to-secondary/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Utensils className="h-5 w-5 text-green-500" />
                                Macro Distribution
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-[350px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={macroData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={80}
                                        outerRadius={110}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                        animationBegin={200}
                                        animationDuration={1500}
                                    >
                                        {macroData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                                className="hover:opacity-80 transition-opacity cursor-pointer"
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        content={({ active, payload }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-popover/95 backdrop-blur-sm border border-border p-4 rounded-xl shadow-xl">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <div
                                                                className="w-3 h-3 rounded-full"
                                                                style={{ backgroundColor: payload[0].payload.fill }}
                                                            />
                                                            <span className="font-bold text-lg">{payload[0].name}</span>
                                                        </div>
                                                        <div className="text-2xl font-black">
                                                            {payload[0].value}g
                                                        </div>
                                                        <div className="text-xs text-muted-foreground mt-1">
                                                            {((payload[0].value / 1000) * 100).toFixed(1)}% of daily target
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>

                            {/* Center Label Overlay */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                                <span className="text-muted-foreground text-sm font-medium uppercase tracking-wider">Total</span>
                                <span className="text-4xl font-black text-foreground">
                                    {macroData.reduce((a, b) => a + b.value, 0)}
                                </span>
                                <span className="text-xs text-muted-foreground">grams</span>
                            </div>

                            {/* Custom Legend */}
                            <div className="flex justify-center gap-6 mt-[-20px]">
                                {macroData.map((entry, index) => (
                                    <div key={entry.name} className="flex flex-col items-center">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                            <span className="text-sm font-semibold">{entry.name}</span>
                                        </div>
                                        <span className="text-xs text-muted-foreground font-medium">{entry.value}g</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
