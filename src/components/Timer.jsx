import { motion, AnimatePresence } from 'framer-motion';

const TimeBlock = ({ value, label }) => {
    return (
        <div className="flex flex-col items-center mx-2 md:mx-4 my-2">
            <div className="relative w-20 h-20 md:w-32 md:h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl ring-1 ring-white/5">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "backOut" }}
                        className="text-3xl md:text-6xl font-thin text-white absolute"
                    >
                        {value < 10 ? `0${value}` : value}
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="mt-4 text-[10px] md:text-sm font-light tracking-[0.2em] text-white/50 uppercase">{label}</span>
        </div>
    );
};

export const Timer = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="flex flex-wrap justify-center items-center z-10 w-full max-w-4xl">
            <TimeBlock value={days} label="Days" />
            <TimeBlock value={hours} label="Hours" />
            <TimeBlock value={minutes} label="Minutes" />
            <TimeBlock value={seconds} label="Seconds" />
        </div>
    );
};
