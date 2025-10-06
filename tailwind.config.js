export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", 
  ],

  theme: {
    extend: {
      colors: {
        primary: '#105594',
        pink: '#F12967'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        fredokaone: ['Fredoka One', 'sans-serif']
      }
    }
  },
  
  plugins: [
  ],
}