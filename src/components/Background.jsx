import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const Background = ({ sequenceState }) => {
    // Mouse tracking - Fluid Lag Physics
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Damping = "Drag" in liquid. Stiffness = "Tension".
    // Low stiffness + High damping = Gooey/Liquid feel.
    const springConfig = { damping: 20, stiffness: 50 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            // Normalized -1 to 1
            mouseX.set(((e.clientX / window.innerWidth) - 0.5) * 2);
            mouseY.set(((e.clientY / window.innerHeight) - 0.5) * 2);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Mesh Transforms - Non-linear morphing
    const x1 = useTransform(springX, [-1, 1], [-100, 100]);
    const y1 = useTransform(springY, [-1, 1], [-100, 100]);

    const x2 = useTransform(springX, [-1, 1], [100, -100]); // Opposing
    const y2 = useTransform(springY, [-1, 1], [100, -100]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-midnight-blue">

            {/* Liquid Mesh Layer 1 - Deep Indigo/Purple */}
            <motion.div
                style={{ x: x1, y: y1 }}
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-60 mix-blend-overlay transition-colors duration-[2000ms] ${sequenceState === 'supernova' ? 'bg-amber-100' : 'bg-gradient-to-r from-indigo-600 to-purple-800'}`}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: sequenceState === 'buildup' ? 2 : 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Liquid Mesh Layer 2 - Cyan/Teal Highlight */}
            <motion.div
                style={{ x: x2, y: y2 }}
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -60, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className={`absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-50 mix-blend-overlay transition-colors duration-[2000ms] ${sequenceState === 'supernova' ? 'bg-orange-200' : 'bg-gradient-to-t from-blue-700 via-cyan-600 to-teal-500'}`}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: sequenceState === 'buildup' ? 3 : 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Subtler Center Ambient */}
            <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/40 pointer-events-none' />

            {/* Grain Texture */}
            <div className='absolute inset-0 z-[2] opacity-20 pointer-events-none mix-blend-overlay'
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            />

            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-[1]" />
        </div>
    );
};
