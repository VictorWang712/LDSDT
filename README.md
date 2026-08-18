# LLM-Driven Software Development and Testing

The source repository for the **LLM-Driven Software Development and Testing**
course website.

## Repository structure

```text
apps/site/  Astro + Starlight course website
```

The student starter kit, assignment implementation, and private evaluation
infrastructure are maintained in separate repositories.

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
