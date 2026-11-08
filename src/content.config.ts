import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.mdoc", base: "./src/content/blog" }),
  // Abilitiamo ({ image }) per l'ottimizzazione automatica delle copertine su Aruba
  schema: ({ image }) => z.object({
    titolo: z.string(),
    bozza: z.boolean().default(false).optional(),
    dataPubblicazione: z.coerce.date().optional().nullable(),
    categoria: z.enum(['arteterapia', 'artista', 'generico']).default('generico').optional(),
    riassunto: z.string().optional(),
    immagineCopertina: image().optional(),
  }),
});

export const collections = {
  'blog': blogCollection,
};