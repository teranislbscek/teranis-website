import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { Eye, Download, AlertTriangle } from "lucide-react";
import Loading from "./Loading";

const API_URL =
  "https://script.google.com/macros/s/AKfycbwS-YHTgvACvH7y6TibroWMZwMA4kAgRkYUU73npOyKF9WRUpfrIGpaH2b7jy1vUK-H/exec";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const DetailItem = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
    <p className="text-sm text-gray-400">{label}</p>

    <p className="mt-2 break-words text-lg font-semibold text-white">
      {value || "-"}
    </p>
  </div>
);

DetailItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const getCertificateTitle = (sheetName, fallback = "Teranis") => {
  if (!sheetName) return `${fallback} Certificate`;

  const normalizedName = String(sheetName).trim();

  return `${normalizedName.replace(/_/g, " ")} Certificate`;
};

const getSheetSuffix = (sheetName) =>
  String(sheetName || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

const getCertificateValue = (data, fieldBaseName, sheetName) => {
  if (!data) return "";

  const suffix = getSheetSuffix(sheetName);
  const candidates = suffix
    ? [
        `${fieldBaseName}_${suffix}`,
        `${fieldBaseName}__${suffix}`,
        `${fieldBaseName}`,
      ]
    : [fieldBaseName];

  for (const key of candidates) {
    const value = data[key];
    if (value && String(value).trim()) {
      return String(value).trim();
    }
  }

  return "";
};

const CertificateVerifier = () => {
  const query = useQuery();

  const initialCertId =
    query.get("id")?.trim() || query.get("uc")?.trim() || "";

  const [inputCertId, setInputCertId] = useState(initialCertId);

  const [certificateData, setCertificateData] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const fetchCertificateInfo = async (certificateId) => {
    const normalizedId = certificateId.trim();

    if (!normalizedId) {
      setCertificateData(null);
      setError("Please enter a certificate ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setCertificateData(null);

    try {
      const response = await axios.get(
        `${API_URL}?id=${encodeURIComponent(normalizedId)}`
      );

      if (response.data?.valid) {
        setCertificateData(response.data.data);
      } else {
        setError("Page doesn't exist.");
      }
    } catch (err) {
      console.error(err);

      setError("Page doesn't exist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialCertId) {
      fetchCertificateInfo(initialCertId);
    }
  }, [initialCertId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetchCertificateInfo(inputCertId);
  };

  const certificateSheetName = certificateData?.EVENT_SHEET || certificateData?.EVENT;

  const mergedDocId = getCertificateValue(
    certificateData,
    "MERGED_DOC_ID",
    certificateSheetName
  );

  const mergedDocUrl = getCertificateValue(
    certificateData,
    "MERGED_DOC_URL",
    certificateSheetName
  );

  const mergedDocLink = getCertificateValue(
    certificateData,
    "LINK_TO_MERGED_DOC",
    certificateSheetName
  );

  const certificateViewLink =
    mergedDocUrl || mergedDocLink || certificateData?.PDF_URL || "";

  const mergedPdfPreview = mergedDocId
    ? `https://drive.google.com/file/d/${mergedDocId}/preview`
    : mergedDocUrl || mergedDocLink || null;

  const mergedPdfDownload = mergedDocId
    ? `https://drive.google.com/uc?export=download&id=${mergedDocId}`
    : mergedDocUrl || mergedDocLink || certificateViewLink || "";

  const verificationUrl = `${window.location.origin}/verify?id=${encodeURIComponent(
    certificateData?.CERT_ID || inputCertId
  )}`;

  const certificateTitle = getCertificateTitle(certificateSheetName);

  const certificatePdfMedia =
    mergedPdfPreview || mergedDocUrl || certificateViewLink || verificationUrl;

  const linkedInCertificateUrl = new URL(
    "https://www.linkedin.com/profile/add"
  );

  linkedInCertificateUrl.search = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: certificateTitle,
    organizationName: "Teranis",
    certId: certificateData?.CERT_ID || inputCertId,
    certUrl: verificationUrl,
    issueYear: String(new Date().getFullYear()),
    media: certificatePdfMedia,
  }).toString();

  const renderVerificationForm = (buttonLabel) => (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-lg"
    >
      <div>
        <label
          htmlFor="certificate-id"
          className="mb-2 block text-sm font-medium text-gray-300"
        >
          Enter Certificate ID
        </label>

        <input
          id="certificate-id"
          type="text"
          value={inputCertId}
          onChange={(event) => setInputCertId(event.target.value)}
          placeholder="TF2026-COOD-001"
          className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-xl bg-cyan-600 px-4 py-3 font-semibold text-white transition hover:bg-cyan-500"
      >
        {buttonLabel}
      </button>
    </form>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4 pt-32 pb-10 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="border-b border-white/10 px-6 py-8 text-center">
            <h1 className="text-3xl font-bold md:text-4xl">
              Certificate Verification
            </h1>

            <p className="mt-3 text-gray-400">
              Verify Techfest certificates instantly and securely.
            </p>
          </div>

          {/* Body */}
          <div className="space-y-8 p-6 md:p-8">
            {/* Verification Form */}
            {renderVerificationForm(
              certificateData ? "Verify Another" : "Verify Certificate"
            )}

            {/* Loading */}
            {loading && (
              <div className="flex justify-center py-10">
                <Loading />
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
                <AlertTriangle className="mx-auto mb-4 h-14 w-14 text-red-400" />

                <h2 className="text-2xl font-bold text-red-300">
                  Page doesn't exist
                </h2>

                <p className="mt-3 text-gray-300">{error}</p>

                <div className="mt-6 flex justify-center">
                  <a
                    href="/"
                    className="rounded-2xl bg-cyan-600 px-6 py-3 font-semibold transition hover:bg-cyan-500"
                  >
                    Go to Home
                  </a>
                </div>
              </div>
            )}

            {/* Success */}
            {!loading && certificateData && (
              <>
                {/* Success Banner */}
                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-6 text-center">
                  <h2 className="text-3xl font-bold text-green-400">
                    Valid Certificate
                  </h2>

                  <p className="mt-2 text-gray-300">
                    This certificate has been successfully verified.
                  </p>
                </div>

                {/* Details */}
                <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
                  <h3 className="mb-6 text-2xl font-semibold">
                    Certificate Details
                  </h3>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    <DetailItem
                      label="Name"
                      value={certificateData?.NAME}
                    />

                    <DetailItem
                      label="Certificate ID"
                      value={certificateData?.CERT_ID}
                    />

                    <DetailItem
                      label="Event"
                      value={
                        certificateData?.EVENT_SHEET ||
                        certificateData?.EVENT ||
                        "-"
                      }
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                {(mergedPdfPreview || mergedPdfDownload) && (
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a
                      href={mergedPdfPreview || mergedPdfDownload}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold transition hover:bg-indigo-500"
                    >
                      <Eye size={20} />
                      View PDF
                    </a>

                    <a
                      href={mergedPdfDownload || mergedPdfPreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 font-semibold transition hover:bg-emerald-500"
                    >
                      <Download size={20} />
                      Download PDF
                    </a>
                  </div>
                )}

                {/* PDF Preview */}
                {mergedPdfPreview && (
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <div className="border-b border-white/10 px-5 py-4">
                      <h3 className="text-xl font-semibold">
                        Certificate Preview
                      </h3>
                    </div>

                    <iframe
                      title="Certificate Preview"
                      src={mergedPdfPreview}
                      className="h-[750px] w-full bg-white"
                    />
                  </div>
                )}

                {/* LinkedIn Certificate Add */}
                <div className="flex justify-center">
                  <a
                    href={linkedInCertificateUrl.toString()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl bg-blue-700 px-6 py-3 font-semibold transition hover:bg-blue-600"
                  >
                    Add Certificate to LinkedIn
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateVerifier;
