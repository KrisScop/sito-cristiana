import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap'; 

const mieIntegrazioni = [
  react(),
  markdoc(),
  sitemap(), 
  ...(process.env.E_ARUBA !== 'si' ? [keystatic()] : [])
];

export default defineConfig({
  site: 'https://www.cristianascoppetta.it',
  base: process.env.E_ARUBA === 'si' ? '/saa' : '/',
  integrations: mieIntegrazioni,
  
  output: process.env.E_ARUBA === 'si' ? 'static' : 'server',
  adapter: process.env.E_ARUBA === 'si' ? undefined : vercel(),
  
  vite: {
    plugins: [tailwindcss()]
  }
});