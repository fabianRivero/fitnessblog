import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import react from "@astrojs/react";

dotenv.config();
// https://astro.build/config
export default defineConfig({
  integrations:[react()],
  server: {
    proxy: {
      '/login': 'http://localhost:4321', // Redirige las solicitudes de login
    },
  },
});

