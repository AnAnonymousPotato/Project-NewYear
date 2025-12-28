import { motion } from 'framer-motion';

export const Background = () => {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-midnight-blue">
            {/* Blob 1 - Top Left */}
            <motion.div
                animate={{
                    x: [-20, 20, -20],
                    y: [-20, 20, -20],
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
                animate={{
                    x: [20, -20, 20],
                    y: [20, -20, 20],
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

            {/* Blob 3 - Center */}
            <motion.div
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
