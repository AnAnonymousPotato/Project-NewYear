import { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Timer } from './components/Timer';
import { Finale } from './components/Finale';
import { useCountdown } from './hooks/useCountdown';
import { useAudio } from './hooks/useAudio';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
    const { days, hours, minutes, seconds } = useCountdown();
    const { playRiser, playImpact, playDrone, initAudio } = useAudio();

    // Sequence State: 'idle' -> 'buildup' -> 'implosion' -> 'supernova'
    const [sequenceState, setSequenceState] = useState('idle');

    useEffect(() => {
        // T-Minus 10s: The Buildup
        if (days === 0 && hours === 0 && minutes === 0 && seconds <= 10 && seconds > 0 && sequenceState === 'idle') {
            setSequenceState('buildup');
            playRiser();
        }

        // T-Minus 0s: The Implosion
        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0 && sequenceState === 'buildup') {
            setSequenceState('implosion');
            playImpact();

            // The Big Bang (0.5s delay for the void)
            setTimeout(() => {
                setSequenceState('supernova');
                playDrone();
            }, 500);
        }
    }, [days, hours, minutes, seconds, sequenceState, playRiser, playImpact, playDrone]);

    return (
        <div
            className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden"
            onClick={initAudio} // Initialize audio context on click
        >
            <Background sequenceState={sequenceState} />

            {/* Render Finale Overlay on Supernova */}
            {sequenceState === 'supernova' && <Finale />}

            {/* Main UI - Implodes at T-0 */}
            <AnimatePresence>
                {sequenceState !== 'supernova' && (
                    <motion.main
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0, transition: { duration: 0.5, ease: "backIn" } }}
                        className="relative z-10 flex flex-col items-center w-full max-w-5xl text-center"
                    >
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
                            <Timer
                                days={days}
                                hours={hours}
                                minutes={minutes}
                                seconds={seconds}
                                sequenceState={sequenceState}
                            />
                        </motion.div>
                    </motion.main>
                )}
            </AnimatePresence>

            <footer className="absolute bottom-8 z-10 pointer-events-none">
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: sequenceState === 'supernova' ? 0 : 1 }}
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
