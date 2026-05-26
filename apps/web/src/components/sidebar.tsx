import { Activity, Archive, BarChart3, FileText, Layers3, ShieldCheck, UploadCloud } from "lucide-react";

const nav = [
  { label: "Dashboard", icon: Activity },
  { label: "Upload", icon: UploadCloud },
  { label: "AI Workspace", icon: Layers3 },
  { label: "Benchmarking", icon: BarChart3 },
  { label: "Reports", icon: FileText },
  { label: "PACS", icon: Archive },
  { label: "Compliance", icon: ShieldCheck }
];

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#101820]">
      <div className="border-b border-white/10 px-5 py-5">
        <div className="text-xl font-semibold text-white">FractureIQ</div>
        <div className="mt-1 text-xs text-slate-400">Radiology AI workstation</div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex h-10 w-full items-center gap-3 rounded-md px-3 text-left text-sm ${
                index === 2 ? "bg-clinical text-white" : "text-slate-300 hover:bg-white/[0.08]"
              }`}
              title={item.label}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-4 text-xs text-slate-400">
        HIPAA-ready design | Audit logging enabled | Human review required
      </div>
    </aside>
  );
}
