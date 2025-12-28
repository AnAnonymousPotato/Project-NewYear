import { useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TimeBlock = ({ value, label }) => {
    const ref = useRef(null);

    // Mouse position relative to center of card
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    // 3D Tilt Transforms
    const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]); // Tilt up/down
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]); // Tilt left/right

    // Glare moves opposite to sim reflection
    const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Normalize to -0.5 to 0.5
        const offsetX = e.clientX - rect.left - width / 2;
        const offsetY = e.clientY - rect.top - height / 2;

        x.set(offsetX / width);
        y.set(offsetY / height);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="flex flex-col items-center mx-2 md:mx-4 my-2 perspective-1000">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                }}
                className="relative w-24 h-28 md:w-36 md:h-44 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl ring-1 ring-white/5 cursor-default group"
            >
                <div
                    className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center transform-style-3d bg-gradient-to-br from-white/5 to-transparent"
                >
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={value}
                            initial={{ y: "150%", opacity: 0, filter: "blur(10px)" }} // Enter from bottom, blurry
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}       // Snap to center, clear
                            exit={{ y: "-150%", opacity: 0, filter: "blur(10px)" }}   // Exit to top, blurry
                            transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 300,
                                mass: 1
                            }}
                            className="text-4xl md:text-7xl font-thin text-white z-10 tabular-nums"
                        >
                            {value < 10 ? `0${value}` : value}
                        </motion.span>
                    </AnimatePresence>

                    {/* Holographic Glare */}
                    <motion.div
                        style={{
                            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, transparent 100%)`
                        }}
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-overlay"
                    />
                </div>
            </motion.div>
            <span className="mt-6 text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/30 uppercase">{label}</span>
        </div>
    );
};

export const Timer = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="flex flex-wrap justify-center items-center z-10 w-full max-w-5xl">
            <TimeBlock value={days} label="Days" />
            <TimeBlock value={hours} label="Hours" />
            <TimeBlock value={minutes} label="Minutes" />
            <TimeBlock value={seconds} label="Seconds" />
        </div>
    );
};
