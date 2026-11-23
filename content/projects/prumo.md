# Prumo — Real Estate Platform

> **Status: in active development.** The source code is in a private repository, so this page describes the goals and the architecture at a high level only.

Prumo is a real estate platform I'm building to replace a stack of third-party tools and an n8n workflow with a single first-party system. It grows out of my WhatsApp assistant project (the Real Estate Assistant above): once that assistant was working in production, the next step was to own the whole stack — data, messaging, publishing and the public site — instead of gluing external services together.

## What it covers

- **CRM** for leads and conversations, with a live inbox where human agents take over from the AI and hand conversations back.
- **Property management**: listings, photo uploads with resizing and signed URLs, and spreadsheet import.
- **WhatsApp AI assistant** rebuilt as a proper engine: message burst consolidation, typed conversation history, audio transcription, image understanding, search by code, criteria or embeddings, ad attribution, per-company versioned prompts, and structured model output validated deterministically against the database before anything is sent.
- **Portal publishing**: feed generation and validation for a major classifieds group, with daily reconciliation.
- **Public agency websites**: server-side rendered, with a theme per company, sitemap and robots handled natively, and a one-click WhatsApp button that carries the right property into the first message.

## Design principles

- **Multi-tenant from the first migration.** Every table is isolated per company with PostgreSQL row-level security, so onboarding a second client doesn't require a rewrite.
- **Ports and adapters.** External services (the AI provider, WhatsApp, email) sit behind interfaces, which lets the whole system be tested with in-memory doubles and real Postgres and Redis.
- **Written down before built.** A technical specification, architecture decision records and a backlog with acceptance criteria drive the work. A status document grades each story *criterion by criterion* against the code, so "done" means verified.

## Stack

TypeScript monorepo (pnpm workspaces) · Node.js · PostgreSQL with pgvector · Redis · S3-compatible object storage · Next.js · Docker · Vitest · ESLint, Prettier and Husky

Organized as separate apps (API, agent panel, public site, background workers) over shared packages (domain model, database, contracts, adapters, assistant engine).

## Where it stands

The core platform is built and tested: foundation and multi-tenancy, CRM and properties, the WhatsApp gateway, the assistant engine, the agent inbox, portal publishing and the public site. What remains is mostly finishing a few in-progress stories and the production cutover and migration phases, which have not started. The project is still unfinished and is not yet serving real traffic.
