import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Background = () => {
    // Mouse tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 400 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalized -0.5 to 0.5
            mouseX.set((e.clientX / window.innerWidth) - 0.5);
            mouseY.set((e.clientY / window.innerHeight) - 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Parallax transforms - deeply layered feeling
    const x1 = useTransform(springX, [-0.5, 0.5], [-50, 50]);
    const y1 = useTransform(springY, [-0.5, 0.5], [-50, 50]);

    const x2 = useTransform(springX, [-0.5, 0.5], [100, -100]); // Moves opposite
    const y2 = useTransform(springY, [-0.5, 0.5], [100, -100]);

    const x3 = useTransform(springX, [-0.5, 0.5], [-30, 30]);
    const y3 = useTransform(springY, [-0.5, 0.5], [30, -30]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-midnight-blue">
            {/* Blob 1 - Top Left */}
            <motion.div
                style={{ x: x1, y: y1 }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-deep-violet rounded-full blur-[120px] mix-blend-screen"
            />

            {/* Blob 2 - Bottom Right */}
            <motion.div
                style={{ x: x2, y: y2 }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-blue-900 rounded-full blur-[130px] mix-blend-screen"
            />

            {/* Blob 3 - Center (Subtle) */}
            <motion.div
                style={{ x: x3, y: y3 }}
                animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-indigo-900 rounded-full blur-[150px] opacity-20"
            />

            <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
        </div>
    );
};
