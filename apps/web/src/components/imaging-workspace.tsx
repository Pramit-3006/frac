"use client";

import { Crosshair, Maximize2, Ruler, ScanLine, SlidersHorizontal } from "lucide-react";
import { AnalysisResult, resultFromUpload } from "@/lib/analysis";
import { fractureTypes } from "@/lib/mock-data";
import { Panel, PanelHeader } from "./ui";

function ViewerPane({ title, overlay, active }: { title: string; overlay?: "heatmap" | "mask" | "boxes"; active: boolean }) {
  return (
    <div className="relative min-h-72 overflow-hidden rounded-md border border-white/10 bg-[#06090c] xray-grid">
      <div className="absolute left-3 top-3 z-10 rounded bg-black/50 px-2 py-1 text-xs text-slate-200">{title}</div>
      <div className="absolute inset-8 rounded-[48%] border border-slate-500/30 bg-gradient-to-b from-slate-300/20 via-slate-200/10 to-transparent blur-[1px]" />
      <div className="absolute left-[46%] top-[18%] h-[66%] w-8 rotate-[-8deg] rounded-full border border-slate-200/35 bg-slate-100/15" />
      <div className="absolute left-[53%] top-[39%] h-28 w-[3px] rotate-[28deg] bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.75)]" />
      {active && overlay === "heatmap" && <div className="heatmap absolute inset-0 mix-blend-screen" />}
      {active && overlay === "mask" && <div className="absolute left-[48%] top-[40%] h-32 w-14 rotate-[12deg] rounded-full border-2 border-[#7bdcb5] bg-[#2b7a78]/25" />}
      {active && overlay === "boxes" && <div className="absolute left-[44%] top-[38%] h-36 w-28 rounded border-2 border-signal" />}
      {!active && <div className="absolute inset-x-4 bottom-4 rounded bg-black/45 px-3 py-2 text-xs text-slate-400">Upload an X-ray or run demo ensemble to render AI overlays.</div>}
      <div className="absolute bottom-3 right-3 flex gap-2">
        {[
          { label: "Measure", icon: Ruler },
          { label: "Localize", icon: Crosshair },
          { label: "Fullscreen", icon: Maximize2 }
        ].map(({ label, icon: Icon }) => (
          <button key={label} type="button" className="rounded border border-white/10 bg-black/40 p-2 text-slate-200" title={label}>
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ImagingWorkspace({
  analysis,
  hasUploaded,
  onAnalysis
}: {
  analysis: AnalysisResult;
  hasUploaded: boolean;
  onAnalysis: (analysis: AnalysisResult) => void;
}) {
  const measurements = analysis.clinical.measurements;
  const getMeasurement = (name: string) => measurements.find((item) => item.name === name);
  const displacement = getMeasurement("Displacement");
  const angle = getMeasurement("Angular deviation");

  return (
    <Panel className="col-span-12 xl:col-span-8">
      <PanelHeader
        title="AI Analysis Workspace"
        action={
          <div className="flex items-center gap-2">
            <button type="button" className="rounded-md border border-white/10 px-3 py-1.5 text-xs text-slate-200">DICOM</button>
            <button type="button" onClick={() => onAnalysis(resultFromUpload(analysis.filename))} className="rounded-md bg-clinical px-3 py-1.5 text-xs font-medium text-white">Run Ensemble</button>
          </div>
        }
      />
      <div className="grid gap-4 p-4 xl:grid-cols-2">
        <ViewerPane title={`Original X-ray | ${analysis.filename}`} active={hasUploaded} />
        <ViewerPane title="Enhanced + Detection Boxes" overlay="boxes" active={hasUploaded} />
        <ViewerPane title="Segmentation Mask" overlay="mask" active={hasUploaded} />
        <ViewerPane title="XAI Heatmap" overlay="heatmap" active={hasUploaded} />
      </div>
      <div className="grid gap-4 border-t border-white/10 p-4 lg:grid-cols-4">
        <div className="rounded-md border border-white/10 bg-[#121b23] p-3">
          <p className="text-xs text-slate-400">Fracture type</p>
          <p className="mt-2 text-lg font-semibold text-white">{analysis.fusion.ensemble_label}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-[#121b23] p-3">
          <p className="text-xs text-slate-400">Severity score</p>
          <p className="mt-2 text-lg font-semibold text-amber">{analysis.fusion.severity_score.toFixed(1)} / 10</p>
        </div>
        <div className="rounded-md border border-white/10 bg-[#121b23] p-3">
          <p className="text-xs text-slate-400">Displacement</p>
          <p className="mt-2 text-lg font-semibold text-white">{displacement ? `${displacement.value} ${displacement.unit}` : "Pending"}</p>
        </div>
        <div className="rounded-md border border-white/10 bg-[#121b23] p-3">
          <p className="text-xs text-slate-400">Angular deviation</p>
          <p className="mt-2 text-lg font-semibold text-white">{angle ? `${angle.value} ${angle.unit}` : "Pending"}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 p-4">
        <span className="flex items-center gap-2 text-xs text-slate-400"><ScanLine size={14} /> Supported labels</span>
        {fractureTypes.map((type) => (
          <span key={type} className="rounded border border-white/10 px-2 py-1 text-xs text-slate-300">{type}</span>
        ))}
        <button type="button" className="ml-auto flex items-center gap-2 rounded-md border border-white/10 px-3 py-1 text-xs text-slate-200">
          <SlidersHorizontal size={14} /> Calibrate
        </button>
      </div>
    </Panel>
  );
}
