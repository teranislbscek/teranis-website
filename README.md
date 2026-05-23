# Teranis 2026 Website

# Teranis Monorepo

## Overview

Teranis is organized as a small monorepo with two independent frontend apps: the main Teranis website and a dedicated certificate verification app.

## Structure

```txt
repo/
├── client/   -> teranis.in
├── verify/   -> verify.teranis.in
└── README.md
```

## Apps

- **client/** - Main Teranis website with festival information, highlights, and media.
- **verify/** - Permanent verification app for certificate QR codes and direct certificate links.

## Deployment

- Deploy [client](client) with Vercel root directory set to `client`.
- Deploy [verify](verify) with Vercel root directory set to `verify`.
- Recommended domain mapping:

```txt
client/  -> teranis.in
verify/  -> verify.teranis.in
```

## Verification Routing

- Legacy certificate links continue to use `/verify?uc=<id>` in the main website.
- `verify.teranis.in` is the permanent QR domain for certificate verification.
- 2025 verification is hardcoded for backward compatibility.
- 2026 is the current certificate year, and newer years are routed through the registry in the verify app.

## Local Development

Install once from the repository root:

```bash
pnpm install
```

Run either app directly:

```bash
pnpm dev:client
pnpm dev:verify
```

Build both apps:

```bash
pnpm build
```

## Contributors

- **Umar Al Mukhtar Ibrahimkutty** - [GitHub](https://github.com/UmarAlMukhtar)

```bash
pnpm build
```

## Contributors

- **Umar Al Mukhtar Ibrahimkutty** - [GitHub](https://github.com/UmarAlMukhtar)

