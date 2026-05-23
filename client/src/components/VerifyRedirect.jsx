import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

function VerifyRedirect() {
  const location = useLocation();

  const certificateId = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get("uc");
  }, [location.search]);

  useEffect(() => {
    if (!certificateId) {
      return;
    }

    const redirectUrl = `https://2025.teranis.in/verify?uc=${encodeURIComponent(
      certificateId
    )}`;

    window.location.replace(redirectUrl);
  }, [certificateId]);

  if (!certificateId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/70">
            Teranis Verification
          </p>
          <h1 className="mt-4 text-2xl font-semibold text-white">
            Invalid verification link
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            This link is missing a certificate identifier. Please scan the QR
            code again or open the verification link from the certificate.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 px-4 text-white">
      <div className="relative flex w-full max-w-md flex-col items-center rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_55%)]" />
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-300" />
        <p className="mt-6 text-xs uppercase tracking-[0.35em] text-cyan-300/70">
          Teranis Verification
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-white">
          Redirecting to 2025 verification
        </h1>
        <p className="mt-3 max-w-sm text-sm leading-6 text-gray-300">
          Please wait while we open the current certificate verification page.
        </p>
      </div>
    </div>
  );
}

export default VerifyRedirect;