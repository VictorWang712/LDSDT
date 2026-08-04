# ADR 0001: Course website architecture

- Status: Accepted
- Date: 2026-08-04

## Context

The course needs a durable public home for lecture notes and resources. The site
must be easy for teaching staff to maintain, visually distinctive, inexpensive to
host, and ready for a richer animated homepage in the future. Evaluation services
may be added later, but they must not be coupled to the availability of the course
notes.

## Decision

1. Build the content site with Astro and Starlight.
2. Keep course content in Markdown or MDX and validate it during the build.
3. Use a custom Astro route for the homepage and Starlight for documentation.
4. Generate a static site and deploy it to GitHub Pages with GitHub Actions.
5. Keep future evaluators in separate services while sharing the same monorepo.
6. Use Git tags for semester snapshots until multiple actively maintained versions
   justify an in-site version switcher.

## Consequences

- No application server or database is required for the first version.
- The homepage may later use isolated client-side animation, Canvas, or WebGL
  without adding that cost to documentation pages.
- Moving from the project URL to a university subdomain requires only a deployment
  base-path change and DNS configuration.
- Course text, third-party assets, datasets, and student work need explicit licensing
  decisions separate from the repository's software license.
