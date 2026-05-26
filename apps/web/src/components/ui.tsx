import { type ReactNode } from "react";

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-md border border-white/10 bg-white/[0.045] shadow-workstation ${className}`}>
      {children}
    </section>
  );
}

export function PanelHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex min-h-12 items-center justify-between border-b border-white/10 px-4">
      <h2 className="text-sm font-semibold tracking-wide text-slate-100">{title}</h2>
      {action}
    </div>
  );
}

export function Metric({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-[#141d25] p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-2xl font-semibold text-white">{value}</strong>
        <span className="text-xs font-medium text-[#7bdcb5]">{delta}</span>
      </div>
    </div>
  );
}

