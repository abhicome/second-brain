import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/second-brain/',
  plugins: [react()],
  server: {
    port: 3000
  }
});