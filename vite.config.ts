
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import devServer from '@hono/vite-dev-server';

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [react()],
      build: {
        rollupOptions: {
          input: './index.html',
        },
      },
    };
  }

  return {
    plugins: [
      react(),
      devServer({
        entry: 'server.ts',
        exclude: [
            /.*\.tsx?$/, 
            /.*\.ts?$/, 
            /.*\.css$/, 
            /.*\.png$/, 
            /.*\.jpg$/, 
            /.*\.svg$/, 
            /.*\.json$/,
            /^\/@.+$/, 
            /^\/node_modules\/.+$/
        ],
      }),
    ],
    server: {
        port: 5173
    }
  };
});
