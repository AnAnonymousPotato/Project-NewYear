import { useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

const TimeBlock = ({ value, label }) => {
    const ref = useRef(null);

    // Mouse position for tilt (normalized 0 to 1)
    const x = useMotionValue(0.5);
    const y = useMotionValue(0.5);

    const springX = useSpring(x, { stiffness: 300, damping: 30 });
    const springY = useSpring(y, { stiffness: 300, damping: 30 });

    // 18 degrees tilt as requested
    const rotateX = useTransform(springY, [0, 1], [18, -18]);
    const rotateY = useTransform(springX, [0, 1], [-18, 18]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        // Update CSS Vars for spotlight
        ref.current.style.setProperty('--x', `${localX}px`);
        ref.current.style.setProperty('--y', `${localY}px`);

        // Update Motion Values for tilt
        x.set(localX / rect.width);
        y.set(localY / rect.height);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
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
                    transformStyle: "preserve-3d",
                    "--x": "50%",
                    "--y": "50%",
                }}
                className="relative w-28 h-32 md:w-40 md:h-52 rounded-2xl cursor-default group"
            >
                {/* Border Glow */}
                <div
                    className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `radial-gradient(300px circle at var(--x) var(--y), rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 40%, transparent 80%)`
                    }}
                />

                {/* Main Card Content */}
                <div className="relative w-full h-full bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
                    {/* Number Animation */}
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={value}
                            initial={{ y: "150%", opacity: 0, filter: "blur(10px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: "-150%", opacity: 0, filter: "blur(10px)" }}
                            transition={{
                                type: "spring",
                                damping: 20,
                                stiffness: 300,
                                mass: 1
                            }}
                            className="text-4xl md:text-7xl font-thin text-white z-10 tabular-nums shadow-sm"
                        >
                            {value < 10 ? `0${value}` : value}
                        </motion.span>
                    </AnimatePresence>

                    {/* Spotlight Shine - Reduced opacity by 5% (0.2 -> 0.15) */}
                    <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
                        style={{
                            background: `radial-gradient(600px circle at var(--x) var(--y), rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)`
                        }}
                    />

                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
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
