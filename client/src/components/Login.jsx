import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { motion } from 'framer-motion';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await login(formData.email, formData.password);
            navigate('/');
        } catch (err) {
            console.error(err);
            console.error(err);
            console.error(err);
            let errorMessage = 'Login failed';
            let statusCode = 'N/A';

            if (err.response) {
                statusCode = `${err.response.status} ${err.response.statusText}`;
                if (err.response.data) {
                    errorMessage = typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data);
                } else {
                    errorMessage = "Server returned empty response.";
                }
            } else if (err.request) {
                errorMessage = 'No response from server. Check your internet connection or backend status.';
            } else {
                errorMessage = err.message;
            }
            alert(`Error: ${errorMessage}\nStatus: ${statusCode}\nAPI URL: ${axios.defaults.baseURL}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm shadow-2xl shadow-primary/5">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                            Welcome Back
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Enter your credentials to access your account
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Email
                                </label>
                                <Input
                                    type="email"
                                    placeholder="m@example.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Password
                                </label>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            <span className="text-muted-foreground">Don't have an account? </span>
                            <Link to="/register" className="text-primary hover:underline font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default Login;
