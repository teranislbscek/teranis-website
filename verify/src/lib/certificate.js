function toText(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function firstText(...values) {
  for (const value of values) {
    const text = toText(value);

    if (text) {
      return text;
    }
  }

  return "";
}

function normalizeSuffix(value) {
  return toText(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function pickField(source, keys, sheetName = "") {
  const suffix = normalizeSuffix(sheetName);
  const suffixKeys = suffix
    ? keys.flatMap((key) => [key, `${key}_${suffix}`])
    : keys;

  return firstText(...suffixKeys.map((key) => source?.[key]));
}

function extractDriveFileId(url) {
  const text = toText(url);

  if (!text) {
    return "";
  }

  const patterns = [
    /\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/folders\/([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return "";
}

function toPreviewUrl(...values) {
  const text = firstText(...values);

  if (!text) {
    return "";
  }

  if (/drive\.google\.com/i.test(text)) {
    const fileId = extractDriveFileId(text);

    if (fileId) {
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }

  return text;
}

function normalizeCertificateRecord(record) {
  const source = record && typeof record === "object" ? record : {};

  const sheetName = pickField(source, [
    "sheet_name",
    "sheetName",
    "EVENT_SHEET",
    "eventSheet",
  ]);

  const certificateId = pickField(
    source,
    ["certificate_id", "certificateId", "CERT_ID", "certId"],
    sheetName,
  );

  const name = pickField(
    source,
    ["name", "NAME", "student_name", "studentName"],
    sheetName,
  );

  const eventName =
    pickField(
      source,
      ["event_name", "eventName", "EVENT", "event"],
      sheetName,
    ) || sheetName;

  const mergedDocId = pickField(
    source,
    ["merged_doc_id", "mergedDocId", "MERGED_DOC_ID"],
    sheetName,
  );

  const mergedDocUrl = pickField(
    source,
    ["merged_doc_url", "mergedDocUrl", "MERGED_DOC_URL"],
    sheetName,
  );

  const mergedDocLink = pickField(
    source,
    [
      "merged_doc_link",
      "mergedDocLink",
      "link_to_merged_doc",
      "linkToMergedDoc",
      "LINK_TO_MERGED_DOC",
    ],
    sheetName,
  );

  const viewUrl = firstText(
    pickField(
      source,
      ["view_url", "viewUrl", "view_link", "viewLink"],
      sheetName,
    ),
    source.PDF_URL,
    source.pdfUrl,
    mergedDocUrl,
    mergedDocLink,
  );

  const downloadUrl = firstText(
    pickField(
      source,
      ["download_url", "downloadUrl", "download_link", "downloadLink"],
      sheetName,
    ),
    mergedDocUrl,
    mergedDocLink,
    viewUrl,
  );

  const previewUrl = toPreviewUrl(
    pickField(
      source,
      ["preview_url", "previewUrl", "preview_link", "previewLink"],
      sheetName,
    ),
    mergedDocId ? `https://drive.google.com/file/d/${mergedDocId}/preview` : "",
    mergedDocUrl,
    mergedDocLink,
    viewUrl,
  );

  return {
    certificate_id: certificateId,
    name,
    event_name: eventName,
    sheet_name: sheetName,
    merged_doc_id: mergedDocId,
    merged_doc_url: mergedDocUrl,
    merged_doc_link: mergedDocLink,
    view_url: viewUrl,
    download_url: downloadUrl,
    preview_url: previewUrl,
  };
}

export function normalizeVerificationResponse(payload) {
  const envelope = payload && typeof payload === "object" ? payload : {};
  const rootData =
    envelope.data &&
    typeof envelope.data === "object" &&
    !Array.isArray(envelope.data)
      ? envelope.data
      : envelope;

  const certificateData =
    rootData.data &&
    typeof rootData.data === "object" &&
    !Array.isArray(rootData.data)
      ? rootData.data
      : rootData;

  const normalizedData = normalizeCertificateRecord(certificateData);

  const explicitValidity = [
    envelope.valid,
    rootData.valid,
    certificateData.valid,
    envelope.isValid,
    rootData.isValid,
    certificateData.isValid,
  ].find((value) => value !== undefined);

  const valid =
    explicitValidity === undefined
      ? Boolean(
          normalizedData.certificate_id &&
          normalizedData.name &&
          normalizedData.event_name,
        )
      : Boolean(explicitValidity);

  return {
    valid,
    status: valid ? "valid" : "invalid",
    data: normalizedData,
  };
}
