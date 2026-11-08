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
  sitemap({
    filter: (page) => !page.includes('/sociologa') && !page.includes('/keystatic'),
  }), 
  // Keystatic si attiva SOLO se NON stiamo costruendo per Aruba
  ...(process.env.E_ARUBA !== 'si' ? [keystatic()] : [])
];

export default defineConfig({
  site: 'https://www.cristianascoppetta.it',
  base: process.env.E_ARUBA === 'si' ? '/saa' : '/',
  integrations: mieIntegrazioni,
  
  // "Camaleonte": Se siamo su Aruba, output statico. Altrimenti, ibrido per il CMS!
  output: process.env.E_ARUBA === 'si' ? 'static' : 'server',
  
  // Se siamo su Aruba niente adattatore. Altrimenti, usiamo Vercel!
  adapter: process.env.E_ARUBA === 'si' ? undefined : vercel(),
  
  vite: {
    plugins: [tailwindcss()]
  }
});