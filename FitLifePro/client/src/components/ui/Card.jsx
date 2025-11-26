import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const Card = ({ children, className, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={cn(
                'rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm text-card-foreground shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-primary/10',
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export const CardHeader = ({ className, ...props }) => (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
    <div className={cn('p-6 pt-0', className)} {...props} />
);
