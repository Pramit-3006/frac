"use client";

import { useState } from "react";
import { DashboardPanels } from "@/components/dashboard-panels";
import { Sidebar, type AppView } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { BenchmarkingView, ComplianceView, PacsView, ReportsView, UploadView, WorkspaceView } from "@/components/workflow-views";
import { AnalysisResult, demoAnalysis } from "@/lib/analysis";

export default function Home() {
  const [activeView, setActiveView] = useState<AppView>("workspace");
  const [analysis, setAnalysis] = useState<AnalysisResult>(demoAnalysis);
  const [hasUploaded, setHasUploaded] = useState(false);

  function handleAnalysis(nextAnalysis: AnalysisResult) {
    setAnalysis(nextAnalysis);
    setHasUploaded(true);
    setActiveView("workspace");
  }

  return (
    <main className="flex min-h-screen bg-[#0f151b] text-slate-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <div className="min-w-0 flex-1">
        <Topbar />
        <div className="grid grid-cols-12 gap-4 p-5">
          {activeView === "dashboard" && <DashboardPanels />}
          {activeView === "upload" && <UploadView analysis={analysis} onAnalysis={handleAnalysis} onOpenReports={() => setActiveView("reports")} />}
          {activeView === "workspace" && (
            <WorkspaceView analysis={analysis} hasUploaded={hasUploaded} onAnalysis={handleAnalysis} onOpenReports={() => setActiveView("reports")} />
          )}
          {activeView === "benchmarking" && <BenchmarkingView analysis={analysis} />}
          {activeView === "reports" && <ReportsView analysis={analysis} />}
          {activeView === "pacs" && <PacsView />}
          {activeView === "compliance" && <ComplianceView />}
        </div>
      </div>
    </main>
  );
}
