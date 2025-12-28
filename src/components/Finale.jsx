import { motion } from 'framer-motion';

export const Finale = () => {
    return (
        <>
            {/* The Shockwave (Big Bang) */}
            <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 50, opacity: 0 }}
                transition={{ duration: 2.5, ease: "circOut" }}
                className="fixed inset-0 z-[100] bg-white rounded-full pointer-events-none origin-center"
            />

            {/* Flash Overlay (Secondary Fade) */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 4, ease: "easeOut", delay: 0.2 }}
                className="fixed inset-0 z-[90] bg-gradient-to-br from-amber-100 to-white pointer-events-none"
            />

            {/* The Reveal: 2026 */}
            <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center">
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 2, delay: 1, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-yellow-400 to-yellow-700 drop-shadow-2xl font-serif"
                >
                    2026
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, letterSpacing: "0.2em" }}
                    animate={{ opacity: 1, letterSpacing: "0.5em" }}
                    transition={{ duration: 3, delay: 1.5, ease: "easeOut" }}
                    className="text-yellow-600/80 mt-6 text-xl uppercase font-light"
                >
                    The Horizon is Here
                </motion.p>
            </div>

            {/* Golden Embers Particle System (CSS/SVG) */}
            <div className="fixed inset-0 z-[70] opacity-50 pointer-events-none mix-blend-plus-lighter">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-yellow-400 rounded-full blur-[2px]"
                        style={{
                            width: Math.random() * 4 + 2 + 'px',
                            height: Math.random() * 4 + 2 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                        }}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: -100 }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "linear"
                        }}
                    />
                ))}
            </div>
        </>
    );
};
