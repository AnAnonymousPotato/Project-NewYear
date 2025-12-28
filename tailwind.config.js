/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'midnight-blue': '#020617', // Very dark slate/blue
                'deep-violet': '#2e1065', // Deep violet
                'glass-black': 'rgba(0, 0, 0, 0.3)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
