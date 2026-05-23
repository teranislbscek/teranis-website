export default function DetailItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
      <p className="text-sm text-slate-400">{label}</p>

      <p className="mt-2 break-words text-lg font-semibold text-white">
        {value || "-"}
      </p>
    </div>
  );
}