export default function AppShell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_36%),radial-gradient(circle_at_bottom_right,_rgba(15,118,110,0.2),_transparent_34%)]" />

      <div className="pointer-events-none absolute left-[-8rem] top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-[-7rem] h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 pt-32 pb-10 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}