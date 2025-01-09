import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import react from "@astrojs/react";
import node from '@astrojs/node';

dotenv.config();
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations:[react()],
  server: {
    proxy: {
      '/login': 'http://localhost:4321', // Redirige las solicitudes de login
    },
  },
});

