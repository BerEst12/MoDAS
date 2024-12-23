/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '5rem',
                '2xl': '6rem',
            },
            screens: {
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
        },
        extend: {
            colors: {
                // Brand Colors
                brand: {
                    yellow: '#EBFE54', // Main brand color - neon yellow
                    green: '#4ADE80', // Secondary color - vibrant green
                },
                // Theme Colors
                background: {
                    DEFAULT: '#0A0A0A', // Main background
                    secondary: '#121212', // Secondary background
                },
                foreground: {
                    DEFAULT: '#FFFFFF',
                    secondary: '#A1A1AA',
                },
                // UI Elements
                primary: {
                    DEFAULT: '#EBFE54', // Using brand yellow as primary
                    foreground: '#000000',
                },
                secondary: {
                    DEFAULT: '#4ADE80', // Using vibrant green as secondary
                    foreground: '#000000',
                },
                muted: {
                    DEFAULT: '#27272A',
                    foreground: '#A1A1AA',
                },
                accent: {
                    DEFAULT: '#EBFE54',
                    foreground: '#000000',
                },
                destructive: {
                    DEFAULT: '#FF5555',
                    foreground: '#FFFFFF',
                },
                // Borders and inputs
                border: '#27272A',
                input: '#27272A',
                ring: '#EBFE54',
                // Chart colors
                chart: {
                    1: '#EBFE54', // Brand yellow
                    2: '#4ADE80', // Brand green
                    3: '#60A5FA', // Blue
                    4: '#F472B6', // Pink
                    5: '#A78BFA', // Purple
                },
            },
            borderRadius: {
                lg: "0.75rem",
                md: "0.5rem",
                sm: "0.25rem",
            },
        },
    },
    plugins: [animate],
};
