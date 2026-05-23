import { Download, Eye, Linkedin } from "lucide-react";
import DetailItem from "./DetailItem";

export default function CertificateCard({ certificate }) {
  const details = certificate?.data || certificate;
  const {
    name,
    certificate_id: certificateId,
    event_name: eventName,
    view_url: viewUrl,
    download_url: downloadUrl,
    preview_url: pdfPreviewUrl,
  } = details;

  const certificatePageUrl = `${window.location.origin}/${encodeURIComponent(
    certificateId
  )}`;
  const certificateTitle = `${eventName || "Teranis"} Certificate`;
  const linkedInCertificateUrl = new URL("https://www.linkedin.com/profile/add");

  linkedInCertificateUrl.search = new URLSearchParams({
    startTask: "CERTIFICATION_NAME",
    name: certificateTitle,
    organizationName: "Teranis",
    certId: certificateId,
    certUrl: certificatePageUrl,
    issueYear: String(new Date().getFullYear()),
    media: pdfPreviewUrl || viewUrl || downloadUrl || certificatePageUrl,
  }).toString();

  return (
    <div className="space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl md:p-8">
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
        <h2 className="text-3xl font-bold text-emerald-400">Valid Certificate</h2>

        <p className="mt-2 text-gray-300">
          This certificate has been successfully verified.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/20 p-6">
        <h3 className="mb-6 text-2xl font-semibold">Certificate Details</h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <DetailItem label="Name" value={name} />
          <DetailItem label="Certificate ID" value={certificateId} />
          <DetailItem label="Event" value={eventName} />
        </div>
      </div>

      {(viewUrl || downloadUrl) && (
        <div className="flex flex-col gap-4 sm:flex-row">
          {viewUrl ? (
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 py-4 font-semibold transition hover:bg-indigo-500"
            >
              <Eye size={20} />
              View PDF
            </a>
          ) : null}

          {downloadUrl ? (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 font-semibold transition hover:bg-emerald-500"
            >
              <Download size={20} />
              Download PDF
            </a>
          ) : null}
        </div>
      )}

      <div className="flex justify-center">
        <a
          href={linkedInCertificateUrl.toString()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          <Linkedin size={18} />
          Add Certificate to LinkedIn
        </a>
      </div>

      {pdfPreviewUrl ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <div className="border-b border-white/10 px-5 py-4">
            <h3 className="text-xl font-semibold">Certificate Preview</h3>
          </div>

          <iframe
            title="Certificate Preview"
            src={pdfPreviewUrl}
            className="h-[750px] w-full bg-white"
          />
        </div>
      ) : null}
    </div>
  );
}