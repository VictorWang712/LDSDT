# LLM-Driven Software Development and Testing

The source repository for the course website and future teaching infrastructure
of **LLM-Driven Software Development and Testing**.

## Repository structure

```text
apps/site/           Astro + Starlight course website
docs/course-design/  Internal teaching design specifications
docs/decisions/      Architecture decision records
```

The course project asks each team to build an end-to-end autonomous software
development and testing system. Assignment starter kits, task specifications,
shared protocols, and evaluation services will be added when their interfaces
are stable.

## Prerequisites

- Node.js 24 or newer
- pnpm 11.9.0

## Local development

```bash
pnpm install
pnpm dev
```

Open the URL printed by Astro. The local site uses `/` as its base path; the
GitHub Pages workflow supplies `/LDSDT/` for production automatically.

## Validation

```bash
pnpm check
pnpm format:check
pnpm build
```

## Deployment
