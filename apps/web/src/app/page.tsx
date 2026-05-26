import { DashboardPanels } from "@/components/dashboard-panels";
import { ImagingWorkspace } from "@/components/imaging-workspace";
import { RightRail } from "@/components/right-rail";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#0f151b] text-slate-100">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <Topbar />
        <div className="grid grid-cols-12 gap-4 p-5">
          <DashboardPanels />
          <ImagingWorkspace />
          <RightRail />
        </div>
      </div>
    </main>
  );
}

