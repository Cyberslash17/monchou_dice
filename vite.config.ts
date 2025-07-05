import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/monchou_dice/',
  build: {
    target: 'esnext',
    sourcemap: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});
