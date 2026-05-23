const createRegistryEntry = ({ label, endpoint, queryParam = "id" }) => ({
  label,
  endpoint,
  queryParam,
  buildUrl(certificateId) {
    if (!endpoint) {
      return null;
    }

    const url = new URL(endpoint, window.location.origin);
    url.searchParams.set(queryParam, certificateId);

    return url.toString();
  },
});

// Build registry from environment variables prefixed with VITE_VERIFY_API_ (e.g. VITE_VERIFY_API_TF2026)
function loadEnvRegistry() {
  const env = import.meta.env || {};
  const registry = {};

  for (const key of Object.keys(env)) {
    if (!key.startsWith("VITE_VERIFY_API_")) continue;

    const prefix = key.replace(/^VITE_VERIFY_API_/, "").toUpperCase();
    const endpoint = env[key];

    if (endpoint && prefix) {
      registry[prefix] = endpoint;
    }
  }

  return registry;
}

const envRegistry = loadEnvRegistry();

// Registry is driven entirely by env vars. No hardcoded endpoints.
const API_REGISTRY = {};
for (const prefix of Object.keys(envRegistry)) {
  const endpoint = envRegistry[prefix];
  const yearLabel = prefix.startsWith("TF") ? prefix.slice(2) : prefix;

  API_REGISTRY[prefix] = createRegistryEntry({
    label: `Teranis ${yearLabel}`,
    endpoint,
  });
}

export { API_REGISTRY };

export function normalizeCertificateId(certificateId) {
  return String(certificateId || "")
    .trim()
    .toUpperCase();
}

export function getCertificatePrefix(certificateId) {
  const normalizedId = normalizeCertificateId(certificateId);
  const match = normalizedId.match(/^(TF\d{4})/i);

  return match ? match[1].toUpperCase() : "";
}

export function resolveRegistryEntry(certificateId) {
  const prefix = getCertificatePrefix(certificateId);

  if (!prefix) {
    return null;
  }

  const entry = API_REGISTRY[prefix];

  if (!entry || !entry.endpoint) {
    return null;
  }

  return { prefix, ...entry };
}
