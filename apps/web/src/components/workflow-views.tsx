"use client";

import { CheckCircle2, Database, FileText, LockKeyhole, Network, ShieldCheck } from "lucide-react";
import { AnalysisResult } from "@/lib/analysis";
import { Panel, PanelHeader } from "./ui";
import { ImagingWorkspace } from "./imaging-workspace";
import { RightRail } from "./right-rail";

export function WorkspaceView({
  analysis,
  hasUploaded,
  onAnalysis,
  onOpenReports
}: {
  analysis: AnalysisResult;
  hasUploaded: boolean;
  onAnalysis: (analysis: AnalysisResult) => void;
  onOpenReports: () => void;
}) {
  return (
    <>
      <ImagingWorkspace analysis={analysis} hasUploaded={hasUploaded} onAnalysis={onAnalysis} />
      <RightRail analysis={analysis} onAnalysis={onAnalysis} onOpenReports={onOpenReports} />
    </>
  );
}

export function UploadView({
  analysis,
  onAnalysis,
  onOpenReports
}: {
  analysis: AnalysisResult;
  onAnalysis: (analysis: AnalysisResult) => void;
  onOpenReports: () => void;
}) {
  return (
    <>
      <Panel className="col-span-12 xl:col-span-8">
        <PanelHeader title="Study Intake Workflow" />
        <div className="grid gap-4 p-4 md:grid-cols-3">
          {[
            ["1", "Upload image", "DICOM, PNG, JPG, or PACS retrieval"],
            ["2", "Run AI pipeline", "Enhancement, detection, segmentation, XAI"],
            ["3", "Review report", "Radiologist sign-off and export"]
          ].map(([step, title, body]) => (
            <div key={step} className="rounded-md border border-white/10 bg-[#121b23] p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-clinical text-sm font-semibold text-white">{step}</div>
              <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-400">{body}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 p-4">
          <p className="text-sm text-slate-300">Current study: <strong className="text-white">{analysis.filename}</strong></p>
          <p className="mt-2 text-xs leading-5 text-slate-400">{analysis.clinical.impression}</p>
        </div>
      </Panel>
      <RightRail analysis={analysis} onAnalysis={onAnalysis} onOpenReports={onOpenReports} />
    </>
  );
}

export function BenchmarkingView({ analysis }: { analysis: AnalysisResult }) {
  return (
    <Panel className="col-span-12">
      <PanelHeader title="Multi-Model Benchmarking Engine" />
      <div className="overflow-x-auto p-4">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead className="text-left text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="border-b border-white/10 p-3">Model</th>
              <th className="border-b border-white/10 p-3">Task</th>
              <th className="border-b border-white/10 p-3">Finding</th>
              <th className="border-b border-white/10 p-3">Confidence</th>
              <th className="border-b border-white/10 p-3">Latency</th>
              <th className="border-b border-white/10 p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {analysis.predictions.map((row) => (
              <tr key={row.model_name} className="text-slate-200">
                <td className="border-b border-white/10 p-3 font-medium text-white">{row.model_name}</td>
                <td className="border-b border-white/10 p-3">{row.task}</td>
                <td className="border-b border-white/10 p-3">{row.fracture_type}</td>
                <td className="border-b border-white/10 p-3 text-[#7bdcb5]">{Math.round(row.confidence * 100)}%</td>
                <td className="border-b border-white/10 p-3">{row.latency_ms} ms</td>
                <td className="border-b border-white/10 p-3">ranked</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}

export function ReportsView({ analysis }: { analysis: AnalysisResult }) {
  function exportReport(format: "pdf" | "csv" | "json" | "dicom-sr") {
    const payload = {
      format,
      generated_at: new Date().toISOString(),
      analysis_id: analysis.analysis_id,
      patient_id: analysis.clinical.patient_id,
      finding: analysis.fusion.ensemble_label,
      location: analysis.clinical.fracture_location,
      confidence: analysis.fusion.ensemble_confidence,
      model_agreement: analysis.fusion.model_agreement,
      severity_score: analysis.fusion.severity_score,
      measurements: analysis.clinical.measurements,
      impression: analysis.clinical.impression
    };
    const mimeType = format === "json" ? "application/json" : "text/plain";
    const extension = format === "dicom-sr" ? "dcm.txt" : format === "pdf" ? "pdf.txt" : format;
    const content = format === "csv"
      ? `field,value\npatient_id,${payload.patient_id}\nfinding,${payload.finding}\nlocation,${payload.location}\nconfidence,${payload.confidence}\nseverity_score,${payload.severity_score}\n`
      : JSON.stringify(payload, null, 2);
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `fractureiq-report-${analysis.analysis_id}.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Panel className="col-span-12">
      <PanelHeader title="Radiology Report Generator" />
      <div className="grid gap-4 p-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-md border border-white/10 bg-[#121b23] p-5">
          <div className="flex items-center gap-2 text-sm font-semibold text-white"><FileText size={18} /> Draft Clinical Report</div>
          <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
            <div><dt className="text-slate-400">Patient ID</dt><dd className="mt-1 text-white">{analysis.clinical.patient_id}</dd></div>
            <div><dt className="text-slate-400">Bone analyzed</dt><dd className="mt-1 text-white">{analysis.clinical.bone_analyzed}</dd></div>
            <div><dt className="text-slate-400">Finding</dt><dd className="mt-1 text-white">{analysis.fusion.ensemble_label}</dd></div>
            <div><dt className="text-slate-400">Location</dt><dd className="mt-1 text-white">{analysis.clinical.fracture_location}</dd></div>
            <div><dt className="text-slate-400">Severity</dt><dd className="mt-1 text-amber">{analysis.fusion.severity_score.toFixed(1)} / 10</dd></div>
            <div><dt className="text-slate-400">Model agreement</dt><dd className="mt-1 text-[#7bdcb5]">{Math.round(analysis.fusion.model_agreement * 100)}%</dd></div>
          </dl>
          <p className="mt-5 rounded-md border border-white/10 bg-black/20 p-4 text-sm leading-6 text-slate-300">{analysis.clinical.impression}</p>
        </div>
        <div className="space-y-3">
          {[
            { label: "Export PDF", format: "pdf" as const },
            { label: "Export CSV", format: "csv" as const },
            { label: "Export JSON", format: "json" as const },
            { label: "Export DICOM-SR", format: "dicom-sr" as const }
          ].map((item) => (
            <button key={item.label} type="button" onClick={() => exportReport(item.format)} className="flex w-full items-center justify-between rounded-md border border-white/10 bg-[#121b23] px-4 py-3 text-sm text-white">
              {item.label}<CheckCircle2 size={16} className="text-[#7bdcb5]" />
            </button>
          ))}
        </div>
      </div>
    </Panel>
  );
}

export function PacsView() {
  return (
    <Panel className="col-span-12">
      <PanelHeader title="PACS / DICOM Integration" />
      <div className="grid gap-4 p-4 md:grid-cols-3">
        {[
          { icon: Network, title: "DICOMweb", body: "WADO-RS retrieval and study metadata mapping." },
          { icon: Database, title: "C-STORE", body: "Receiver boundary prepared for hospital PACS ingestion." },
          { icon: FileText, title: "DICOM-SR", body: "Structured findings export contract for report systems." }
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-md border border-white/10 bg-[#121b23] p-4">
            <Icon className="text-[#7bdcb5]" />
            <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">{body}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function ComplianceView() {
  return (
    <Panel className="col-span-12">
      <PanelHeader title="Security & Compliance Controls" />
      <div className="grid gap-4 p-4 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "RBAC", body: "Admin, radiologist, orthopedist, researcher, and technician roles." },
          { icon: LockKeyhole, title: "Audit trail", body: "Upload, inference, annotation, report, and export events are tracked." },
          { icon: Database, title: "Data governance", body: "PostgreSQL clinical schema, object storage, and de-identification boundary." }
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-md border border-white/10 bg-[#121b23] p-4">
            <Icon className="text-[#7bdcb5]" />
            <h3 className="mt-4 text-sm font-semibold text-white">{title}</h3>
            <p className="mt-2 text-xs leading-5 text-slate-400">{body}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
