export default function LoadingState({ label = "Verifying certificate" }) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-glow backdrop-blur-xl sm:p-10">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-cyan-400/25 border-t-cyan-300" />
        <h2 className="mt-6 text-2xl font-semibold text-white">{label}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Please wait while the certificate is routed to the correct year
          backend and verified.
        </p>
      </div>
    </div>
  );
}