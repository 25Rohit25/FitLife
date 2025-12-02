import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const VoiceAssistant = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    // Browser compatibility check
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    useEffect(() => {
        if (!SpeechRecognition) {
            // Silently fail or log if not supported, to not clutter UI for unsupported browsers
            console.log("Voice control not supported in this browser.");
        }
    }, [SpeechRecognition]);

    const startListening = () => {
        if (!SpeechRecognition) {
            alert("Voice control is not supported in this browser. Try Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            setIsListening(true);
            setFeedback("Listening...");
        };

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript.toLowerCase();
            setTranscript(text);
            processCommand(text);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
            setFeedback("Didn't catch that. Try again.");
        };

        recognition.onend = () => {
            setIsListening(false);
            // Clear feedback after a delay
            setTimeout(() => {
                setTranscript('');
                setFeedback('');
            }, 3000);
        };

        recognition.start();
    };

    const processCommand = (text) => {
        if (text.includes('dashboard') || text.includes('home')) {
            navigate('/');
            setFeedback("Navigating to Dashboard...");
        } else if (text.includes('workout') || text.includes('exercise') || text.includes('log')) {
            navigate('/workouts');
            setFeedback("Opening Workout Logger...");
        } else if (text.includes('diet') || text.includes('food') || text.includes('meal') || text.includes('eat')) {
            navigate('/diet');
            setFeedback("Opening Diet Tracker...");
        } else if (text.includes('coach') || text.includes('ai') || text.includes('help')) {
            navigate('/coach');
            setFeedback("Opening AI Coach...");
        } else if (text.includes('leaderboard') || text.includes('rank') || text.includes('top')) {
            navigate('/leaderboard');
            setFeedback("Checking Leaderboard...");
        } else if (text.includes('profile') || text.includes('settings') || text.includes('goal')) {
            navigate('/profile');
            setFeedback("Opening Profile...");
        } else {
            setFeedback("Unknown command. Try 'Go to Workouts'");
        }
    };

    if (!SpeechRecognition) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {(isListening || feedback) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-background/90 backdrop-blur-md text-foreground px-4 py-3 rounded-xl border border-primary/20 shadow-2xl mb-2 max-w-xs text-right"
                    >
                        <p className="text-sm font-bold text-primary">{feedback}</p>
                        {transcript && <p className="text-xs text-muted-foreground mt-1 italic">"{transcript}"</p>}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={startListening}
                className={`p-4 rounded-full shadow-2xl border transition-all duration-300 flex items-center justify-center ${isListening
                        ? 'bg-red-500 border-red-400 animate-pulse ring-4 ring-red-500/30'
                        : 'bg-primary border-primary/50 hover:bg-primary/90'
                    }`}
            >
                {isListening ? (
                    <Activity className="h-6 w-6 text-white animate-bounce" />
                ) : (
                    <Mic className="h-6 w-6 text-white" />
                )}
            </motion.button>
        </div>
    );
};

export default VoiceAssistant;
