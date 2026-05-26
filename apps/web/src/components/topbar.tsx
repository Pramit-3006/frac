import { Bell, Moon, Search, Shield, SunMedium } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-[#121b23] px-5">
      <div className="flex w-full max-w-xl items-center gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2">
        <Search size={18} className="text-slate-400" />
        <input
          className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
          placeholder="Search patient, accession, model run, or report"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-md border border-white/10 p-2 text-slate-300" title="Light mode">
          <SunMedium size={18} />
        </button>
        <button className="rounded-md border border-white/10 p-2 text-slate-300" title="Dark mode">
          <Moon size={18} />
        </button>
        <button className="rounded-md border border-white/10 p-2 text-slate-300" title="Notifications">
          <Bell size={18} />
        </button>
        <div className="ml-2 flex items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-sm text-slate-200">
          <Shield size={16} className="text-[#7bdcb5]" />
          Radiologist
        </div>
      </div>
    </header>
  );
}

