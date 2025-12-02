import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { motion, AnimatePresence } from 'framer-motion';

const AICoach = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Hello! I am your personal AI Fitness Coach. Ask me anything about workouts, nutrition, or motivation!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:5000/api/ai/ask', {
                prompt: input,
                context: 'User is looking for fitness advice.'
            });

            const aiMessage = { role: 'assistant', content: res.data.answer };
            setMessages(prev => [...prev, aiMessage]);
        } catch (err) {
            console.error(err);
            const errorMessage = {
                role: 'assistant',
                content: err.response?.data?.error || "I'm having trouble connecting to the server. Please check your API key or try again later."
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-[85vh] flex flex-col">
            <div className="relative mb-6 rounded-2xl overflow-hidden shadow-2xl group">
                {/* 4K High Res Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2560&auto=format&fit=crop"
                        alt="AI Coach Background"
                        className="w-full h-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
                </div>

                <div className="relative z-10 p-8">
                    <h1 className="text-4xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent flex items-center gap-3 drop-shadow-lg">
                        <Sparkles className="text-cyan-400 w-8 h-8" /> AI Personal Coach
                    </h1>
                    <p className="text-gray-300 mt-2 text-lg font-medium max-w-xl">
                        Your 24/7 intelligent fitness companion. Powered by advanced AI to guide your nutrition, workouts, and wellness journey.
                    </p>
                </div>
            </div>

            <Card className="flex-1 flex flex-col overflow-hidden border-blue-500/20 shadow-2xl shadow-blue-500/5">
                <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                    <AnimatePresence>
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex items-start gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-blue-500/10 text-blue-500'
                                        }`}>
                                        {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                                    </div>
                                    <div className={`p-4 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                                        : 'bg-accent/50 text-foreground rounded-tl-none border border-border'
                                        }`}>
                                        <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {loading && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <Bot size={16} />
                                </div>
                                <div className="bg-accent/50 p-4 rounded-2xl rounded-tl-none border border-border">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                </CardContent>

                <div className="p-4 bg-card border-t border-border">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask for a workout plan, diet tips, or motivation..."
                            className="flex-1"
                            disabled={loading}
                        />
                        <Button type="submit" disabled={loading || !input.trim()} className="bg-blue-600 hover:bg-blue-700">
                            <Send size={18} />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default AICoach;
