import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/backend': 'http://localhost:3000'
  //   }
  // }
})
// import { defineConfig } from 'vite';

// export default defineConfig({
//   esbuild: {
//     loader: {
//       '.js': 'jsx',
//     },
//   },
// });
