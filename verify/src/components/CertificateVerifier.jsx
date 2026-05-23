import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import CertificateCard from "./CertificateCard";
import { normalizeCertificateId, resolveRegistryEntry } from "../config/apiRegistry";
import { normalizeVerificationResponse } from "../lib/certificate";

const initialState = {
  status: "idle",
  message: "",
  certificate: null,
};

export default function CertificateVerifier() {
  const { id = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [inputCertId, setInputCertId] = useState("");
  const [state, setState] = useState(initialState);

  const initialCertId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);

    return normalizeCertificateId(
      id || searchParams.get("id") || searchParams.get("uc") || ""
    );
  }, [id, location.search]);

  useEffect(() => {
    setInputCertId(initialCertId);
  }, [initialCertId]);

  useEffect(() => {
    let isActive = true;

    async function verifyCertificate(certificateId) {
      if (!certificateId) {
        setState({
          status: "idle",
          message: "",
          certificate: null,
        });
        return;
      }

      const registryEntry = resolveRegistryEntry(certificateId);

      if (!registryEntry) {
        setState({
          status: "invalid",
          message:
            "This certificate prefix is not configured in the verification registry.",
          certificate: null,
        });
        return;
      }

      const requestUrl = registryEntry.buildUrl(certificateId);

      if (!requestUrl) {
        setState({
          status: "invalid",
          message: "The verification backend for this prefix is not configured.",
          certificate: null,
        });
        return;
      }

      setState({ status: "loading", message: "", certificate: null });

      try {
        const response = await fetch(requestUrl, {
          headers: {
            Accept: "application/json",
          },
        });

        const json = await response.json().catch(() => null);
        const verification = normalizeVerificationResponse(json);

        if (!isActive) {
          return;
        }

        if (!response.ok || !verification.valid) {
          setState({
            status: "invalid",
            message: "Invalid certificate.",
            certificate: null,
          });
          return;
        }

        setState({
          status: "valid",
          message: "",
          certificate: verification,
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        setState({
          status: "invalid",
          message: "Invalid certificate.",
          certificate: null,
        });
      }
    }

    verifyCertificate(initialCertId);

    return () => {
      isActive = false;
    };
  }, [initialCertId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedId = normalizeCertificateId(inputCertId);

    if (!normalizedId) {
      setState({
        status: "invalid",
        message: "Please enter a certificate ID.",
        certificate: null,
      });
      return;
    }

    navigate(`/${encodeURIComponent(normalizedId)}`);
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
        <div className="border-b border-white/10 px-6 py-8 text-center">
          <h1 className="text-3xl font-bold md:text-4xl">
            Certificate Verification
          </h1>

          <p className="mt-3 text-gray-400">
            Verify Teranis certificates instantly and securely.
          </p>
        </div>

        <div className="space-y-8 p-6 md:p-8">
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
              {state.status === "valid" ? "Verify Another" : "Verify Certificate"}
            </button>
          </form>

          {state.status === "loading" ? (
            <div className="flex justify-center py-10">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-300" />
            </div>
          ) : null}

          {state.status === "valid" && state.certificate ? (
            <CertificateCard certificate={state.certificate} />
          ) : null}

          {!state.certificate && state.status === "invalid" ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-center">
              <AlertTriangle className="mx-auto mb-4 h-14 w-14 text-red-400" />

              <h2 className="text-2xl font-bold text-red-300">
                Page doesn't exist
              </h2>

              <p className="mt-3 text-gray-300">{state.message}</p>

              <div className="mt-6 flex justify-center">
                <Link
                  to="/"
                  className="rounded-2xl bg-cyan-600 px-6 py-3 font-semibold transition hover:bg-cyan-500"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}