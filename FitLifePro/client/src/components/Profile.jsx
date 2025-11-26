import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Target, Save, Ruler, Weight, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        physical: {
            height: '',
            weight: '',
            age: '',
            gender: 'Prefer not to say'
        },
        goals: {
            dailySteps: 10000,
            targetWeight: 70,
            dailyCalories: 2000,
            weeklyWorkouts: 4
        }
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/users/profile', {
                    headers: { 'x-auth-token': token }
                });

                // Merge with defaults to avoid nulls
                setFormData({
                    name: res.data.name,
                    physical: { ...formData.physical, ...res.data.physical },
                    goals: { ...formData.goals, ...res.data.goals }
                });
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (section, field, value) => {
        if (section === 'root') {
            setFormData({ ...formData, [field]: value });
        } else {
            setFormData({
                ...formData,
                [section]: {
                    ...formData[section],
                    [field]: value
                }
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/users/profile', formData, {
                headers: { 'x-auth-token': token }
            });
            alert('Profile updated successfully!');
        } catch (err) {
            console.error(err);
            alert('Error updating profile');
        }
    };

    if (loading) return <div className="p-8 text-center">Loading profile...</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">My Profile & Goals</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5 text-primary" /> Personal Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Name</label>
                            <Input
                                value={formData.name}
                                onChange={(e) => handleChange('root', 'name', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Age</label>
                            <Input
                                type="number"
                                value={formData.physical.age}
                                onChange={(e) => handleChange('physical', 'age', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Gender</label>
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={formData.physical.gender}
                                onChange={(e) => handleChange('physical', 'gender', e.target.value)}
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                                <option>Prefer not to say</option>
                            </select>
                        </div>
                    </CardContent>
                </Card>

                {/* Physical Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Ruler className="h-5 w-5 text-blue-500" /> Physical Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Height (cm)</label>
                            <Input
                                type="number"
                                value={formData.physical.height}
                                onChange={(e) => handleChange('physical', 'height', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Current Weight (kg)</label>
                            <Input
                                type="number"
                                value={formData.physical.weight}
                                onChange={(e) => handleChange('physical', 'weight', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-red-500" /> Fitness Goals
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Target Weight (kg)</label>
                            <Input
                                type="number"
                                value={formData.goals.targetWeight}
                                onChange={(e) => handleChange('goals', 'targetWeight', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Daily Calorie Goal</label>
                            <Input
                                type="number"
                                value={formData.goals.dailyCalories}
                                onChange={(e) => handleChange('goals', 'dailyCalories', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Daily Steps Goal</label>
                            <Input
                                type="number"
                                value={formData.goals.dailySteps}
                                onChange={(e) => handleChange('goals', 'dailySteps', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Weekly Workouts Goal</label>
                            <Input
                                type="number"
                                value={formData.goals.weeklyWorkouts}
                                onChange={(e) => handleChange('goals', 'weeklyWorkouts', e.target.value)}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" /> Save Profile
                </Button>
            </form>
        </div>
    );
};

export default Profile;
