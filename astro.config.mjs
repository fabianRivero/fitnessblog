import { defineConfig } from 'astro/config';
import dotenv from 'dotenv';
import react from "@astrojs/react";
import node from '@astrojs/node';
import netlify from '@astrojs/netlify/functions';

dotenv.config();
// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  adapter: netlify(),
  integrations:[react()],
  server: {
    proxy: {
      '/login': 'https://myfirstfitnessblog.netlify.app/',
    },
  },
});

