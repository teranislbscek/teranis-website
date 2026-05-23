# Teranis 2026 Website

## Overview
Teranis is a frontend-only TechFest website that presents event information, highlights, certificates, and related festival content.

## Important Verification Route
> Legacy certificate QR codes should use the verification endpoint at /verify?uc=<id>.
> The QR domain verify.teranis.in is reserved for this flow and hard-codes redirects to the active verification year.

##  Features
- **TechFest Information Hub** – Showcases the festival, events, and important details
- **Event section** – Present event information, schedules, and related content
- **Certificate Verification Redirect** – Supports legacy QR codes through `/verify?uc=<id>` and the `verify.teranis.in` QR domain, which hard-codes redirects to the active verification year
- **Magazine / Media Section** – Includes festival media and embedded content

## Tech Stack
- **Frontend:** React.js / Vite
- **Deployment:** Vercel

## Setup & Installation
### Clone the Repository
```bash
git clone https://github.com/UmarAlMukhtar/teranis.git
cd teranis
```

### Install Dependencies
```bash
pnpm install
```
### Running the Project
#### **Start Frontend**
```bash
cd client
pnpm dev
```

## Contributors
- **Umar Al Mukhtar Ibrahimkutty** - [GitHub](https://github.com/UmarAlMukhtar)

