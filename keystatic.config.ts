import { config, fields, collection } from '@keystatic/core';

export default config({
  // Verifica che il nome del repo GitHub corrisponda a quello collegato a mio_sito_v4
  storage: process.env.NODE_ENV === 'development' 
    ? { kind: 'local' } 
    : { kind: 'github', repo: 'KrisScop/sito-cristiana' },
  collections: {
    blog: collection({
      label: 'Blog Unificato (Arteterapia & Artista)',
      slugField: 'titolo',
      path: 'src/content/blog/*',
      format: { contentField: 'contenuto' },
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo Articolo' } }),
        bozza: fields.checkbox({ label: 'Bozza (Non pubblicare)', defaultValue: false }),
        dataPubblicazione: fields.date({ 
          label: 'Data di Pubblicazione',
          validation: { isRequired: true }
        }),
        categoria: fields.select({
          label: 'Sezione di Appartenenza',
          options: [
            { label: 'Arteterapia', value: 'arteterapia' },
            { label: 'Artista', value: 'artista' },
            { label: 'Generico / Trasversale', value: 'generico' }
          ],
          defaultValue: 'arteterapia'
        }),
        riassunto: fields.text({ 
          label: 'Riassunto breve (per anteprima e SEO)',
          multiline: true 
        }),
        // La copertina va in src/assets per essere ottimizzata da Astro in fase di build
        immagineCopertina: fields.image({
          label: 'Immagine di Copertina',
          directory: 'src/assets/blog',
          publicPath: '../../assets/blog/',
        }),
        // Le immagini interne al testo restano in public per stabilità dell'editor Keystatic
        contenuto: fields.document({
          label: 'Contenuto dell\'Articolo',
          formatting: true,
          dividers: true,
          links: true,
          images: { 
            directory: 'public/immagini-blog', 
            publicPath: '/immagini-blog/' 
          },
        }),
      },
    }),
  },
});