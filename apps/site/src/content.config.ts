import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
  docs: defineCollection({
    // Explicit publication allowlist: add a document here only after review.
    // Excluded documents remain local source files, without routes or search entries.
    loader: glob({
      base: './src/content/docs',
      pattern: ['labs/week-1.md'],
    }),
    schema: docsSchema(),
  }),
};
