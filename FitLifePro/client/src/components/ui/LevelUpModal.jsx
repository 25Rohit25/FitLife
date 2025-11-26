import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, X } from 'lucide-react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const LevelUpModal = ({ level, onClose }) => {
    const { width, height } = useWindowSize();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
                <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />

                <motion.div
                    initial={{ scale: 0.5, y: 100 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.5, y: 100 }}
                    className="relative bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/50 p-8 rounded-2xl shadow-2xl shadow-yellow-500/20 max-w-md w-full text-center overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/20 rounded-full blur-3xl pointer-events-none" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <motion.div
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-500/50"
                    >
                        <Trophy size={48} className="text-white" />
                    </motion.div>

                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 animate-gradient mb-2">
                        LEVEL UP!
                    </h2>

                    <p className="text-gray-300 text-lg mb-6">
                        Congratulations! You've reached <span className="text-yellow-400 font-bold text-xl">Level {level}</span>
                    </p>

                    <div className="flex justify-center gap-2 mb-8">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.2) }}
                            >
                                <Star className="text-yellow-400 fill-yellow-400 h-8 w-8" />
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={onClose}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/25"
                    >
                        Claim Rewards
                    </button>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default LevelUpModal;
