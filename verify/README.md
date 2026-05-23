# Teranis Verification App

Standalone React + Vite app for certificate verification.

## Routes

- `/` - certificate search interface
- `/:id` - automatic verification for a certificate ID

## Deployment on Vercel

Set the project root directory to `verify`.

Recommended build settings:

- Build Command: `pnpm build`
- Output Directory: `dist`

## Environment Variables

The 2025 and 2026 verification backends are hardcoded so the current flow works out of the box.
Configure future year backends in the Vercel project settings.
The app looks up the backend URL by certificate prefix, for example:

```bash
VITE_VERIFY_API_TF2026=https://example.com/verify
VITE_VERIFY_API_TF2027=https://example.com/verify
```

To add a new year, set a `VITE_VERIFY_API_<PREFIX>` environment variable (for example `VITE_VERIFY_API_TF2026`).

## Normalized JSON

All verification APIs should return the same snake_case shape:

```json
{
	"status": "valid",
	"valid": true,
	"data": {
		"certificate_id": "TF2026-COOD-001",
		"name": "Adityan P",
		"event_name": "Coordinators",
		"sheet_name": "Coordinators",
		"merged_doc_id": "1Kefm9_XJCbLI4R1X4Prd6toViC3Qv2Rh",
		"merged_doc_url": "https://drive.google.com/file/d/1Kefm9_XJCbLI4R1X4Prd6toViC3Qv2Rh/view?usp=drivesdk",
		"merged_doc_link": "https://drive.google.com/file/d/1Kefm9_XJCbLI4R1X4Prd6toViC3Qv2Rh/view?usp=drivesdk",
		"view_url": "https://drive.google.com/file/d/1Kefm9_XJCbLI4R1X4Prd6toViC3Qv2Rh/view?usp=drivesdk",
		"download_url": "https://drive.google.com/uc?export=download&id=1Kefm9_XJCbLI4R1X4Prd6toViC3Qv2Rh",
		"preview_url": "https://drive.google.com/file/d/1Kefm9_XJCbLI4R1X4Prd6toViC3Qv2Rh/preview"
	}
}
```

Example Apps Script response helper:

```javascript
function jsonResponse(data) {
	return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
		ContentService.MimeType.JSON,
	);
}

function normalizeCertificateRow(row, sheetName) {
	const mergedDocId = row.merged_doc_id || row.MERGED_DOC_ID || "";
	const mergedDocUrl = row.merged_doc_url || row.MERGED_DOC_URL || "";
	const mergedDocLink = row.merged_doc_link || row.LINK_TO_MERGED_DOC || "";
	const viewUrl = mergedDocUrl || mergedDocLink || "";

	return {
		certificate_id: row.cert_id || row.CERT_ID || "",
		name: row.name || row.NAME || "",
		event_name: sheetName,
		sheet_name: sheetName,
		merged_doc_id: mergedDocId,
		merged_doc_url: mergedDocUrl,
		merged_doc_link: mergedDocLink,
		view_url: viewUrl,
		download_url: mergedDocId
			? `https://drive.google.com/uc?export=download&id=${mergedDocId}`
			: viewUrl,
		preview_url: mergedDocId
			? `https://drive.google.com/file/d/${mergedDocId}/preview`
			: viewUrl,
	};
}

function doGet(e) {
	const data = normalizeCertificateRow(row, sheetName);
	return jsonResponse({ status: "valid", valid: true, data });
}
```

## Environment-based registry (required)

All verification backends must be provided via environment variables. Define variables named `VITE_VERIFY_API_<PREFIX>` (for example `VITE_VERIFY_API_TF2026`) in your deployment platform (Vercel) or in a local `.env` file. The app reads these at build time and exposes only configured prefixes.

Example (Vercel or local `.env`):

```bash
VITE_VERIFY_API_TF2026=https://script.google.com/macros/s/XXXXXXXXXX/exec
VITE_VERIFY_API_TF2027=https://example.com/verify
```

After setting env vars, rebuild or redeploy the `verify` app so the values are included in the build.

