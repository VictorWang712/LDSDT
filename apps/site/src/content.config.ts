import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    // Publish all course and laboratory documents.
    loader: glob({
      base: './src/content/docs',
      pattern: ['course/*.{md,mdx}', 'labs/*.{md,mdx}'],
    }),
    schema: docsSchema(),
  }),
};
