import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

const Leaderboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/leaderboard');
                setUsers(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    const getRankIcon = (index) => {
        if (index === 0) return <Crown className="h-6 w-6 text-yellow-400" fill="currentColor" />;
        if (index === 1) return <Medal className="h-6 w-6 text-gray-300" fill="currentColor" />;
        if (index === 2) return <Medal className="h-6 w-6 text-amber-600" fill="currentColor" />;
        return <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent inline-flex items-center gap-3">
                    <Trophy className="h-10 w-10 text-yellow-500" />
                    Global Leaderboard
                </h1>
                <p className="text-muted-foreground">Compete with the community and climb the ranks!</p>
            </div>

            <Card className="border-yellow-500/20 shadow-2xl shadow-yellow-500/10 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-0">
                    {loading ? (
                        <div className="p-8 text-center text-muted-foreground">Loading rankings...</div>
                    ) : (
                        <div className="divide-y divide-border/50">
                            {users.map((user, index) => (
                                <motion.div
                                    key={user._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`flex items-center justify-between p-4 hover:bg-accent/50 transition-colors ${index === 0 ? 'bg-yellow-500/10' : ''}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 flex justify-center">
                                            {getRankIcon(index)}
                                        </div>
                                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                            <User className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">{user.name}</h3>
                                            <p className="text-xs text-muted-foreground">Level {user.gamification.level}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="block font-bold text-xl text-primary">{user.gamification.xp.toLocaleString()} XP</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Leaderboard;
