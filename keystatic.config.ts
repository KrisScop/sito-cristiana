import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'development' ? { kind: 'local' } : { kind: 'github', repo: 'KrisScop/sito-cristiana' },
  collections: {
    blog: collection({
      label: 'Blog Unificato',
      slugField: 'titolo',
      path: 'src/content/blog/*',
      format: { contentField: 'contenuto' },
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo Articolo' } }),
        bozza: fields.checkbox({ label: 'Bozza (Non pubblicare)', defaultValue: false }),
        dataPubblicazione: fields.date({ label: 'Data di Pubblicazione' }),
        categoria: fields.select({
          label: 'Sezione di Appartenenza',
          options: [
            { label: 'Arteterapia', value: 'arteterapia' },
            { label: 'Artista', value: 'artista' },
            { label: 'Generico', value: 'generico' }
          ],
          defaultValue: 'generico'
        }),
        riassunto: fields.text({ label: 'Riassunto breve' }),
        immagineCopertina: fields.image({
          label: 'Immagine di Copertina',
          directory: 'src/assets/blog',
          publicPath: '../../assets/blog/',
        }),
        contenuto: fields.document({
          label: 'Contenuto',
          formatting: true, dividers: true, links: true,
          images: { directory: 'public/immagini-blog', publicPath: '/immagini-blog/' },
        }),
      },
    }),
  },
});