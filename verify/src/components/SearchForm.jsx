import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { normalizeCertificateId } from "../config/apiRegistry";

export default function SearchForm() {
  const navigate = useNavigate();
  const [certificateId, setCertificateId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedId = normalizeCertificateId(certificateId);

    if (!normalizedId) {
      return;
    }

    navigate(`/${encodeURIComponent(normalizedId)}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-3xl border border-white/10 bg-black/30 p-5 shadow-glow backdrop-blur-xl sm:p-6"
    >
      <div>
        <label
          htmlFor="certificate-id"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Certificate ID
        </label>

        <input
          id="certificate-id"
          type="text"
          autoComplete="off"
          spellCheck="false"
          placeholder="TF2026-COOD-001"
          value={certificateId}
          onChange={(event) => setCertificateId(event.target.value)}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 font-mono text-sm tracking-[0.12em] text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/15"
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Verify Certificate
      </button>
    </form>
  );
}