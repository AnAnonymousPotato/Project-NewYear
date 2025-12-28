import { Background } from './components/Background';
import { Timer } from './components/Timer';
import { useCountdown } from './hooks/useCountdown';
import { motion } from 'framer-motion';

function App() {
    const { days, hours, minutes, seconds } = useCountdown();

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
            <Background />

            <main className="relative z-10 flex flex-col items-center w-full max-w-5xl text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                    className="text-sm md:text-lg font-light tracking-[0.3em] uppercase text-white/70 mb-4"
                >
                    New Year 2026
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                    className="text-4xl md:text-7xl font-thin tracking-tighter text-white mb-16 drop-shadow-lg"
                >
                    The Horizon Awaits
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
                    className="w-full flex justify-center"
                >
                    {days === 0 && hours === 0 && minutes === 0 && seconds === 0 ? (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, type: "spring" }}
                            className="text-center"
                        >
                            <motion.h2
                                animate={{ opacity: [0.5, 1, 0.5], textShadow: ["0px 0px 10px rgba(168, 85, 247, 0.5)", "0px 0px 30px rgba(168, 85, 247, 1)", "0px 0px 10px rgba(168, 85, 247, 0.5)"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-5xl md:text-8xl font-bold text-white drop-shadow-2xl"
                            >
                                2026
                            </motion.h2>
                            <p className="text-white/60 mt-4 text-xl tracking-widest uppercase">Welcome to the future</p>
                        </motion.div>
                    ) : (
                        <Timer days={days} hours={hours} minutes={minutes} seconds={seconds} />
                    )}
                </motion.div>
            </main>

            <footer className="absolute bottom-8 z-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="text-white/20 text-xs font-light tracking-widest"
                >
                    DESIGNED FOR THE FUTURE
                </motion.p>
            </footer>
        </div>
    );
}

export default App;
