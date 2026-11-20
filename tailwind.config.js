export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: {
      ink: { 950: '#171717', 900: '#1E1E1E', 800: '#252525' },
      navy: { 800: '#2A3340', 700: '#4A7FA7' },
      glow: { DEFAULT: '#4A7FA7', soft: '#B3CFE5' },
      paper: '#F6FAFD', mist: '#B3CFE5', line: '#303030'
    },
    keyframes: { blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } } },
   animation: { blink: 'blink 0.5s steps(1) infinite' },
    fontFamily: { display: ['"Instrument Serif"', 'Georgia', 'serif'], sans: ['"DM Sans"', 'system-ui', 'sans-serif'] }
  } },
  plugins: []
}
