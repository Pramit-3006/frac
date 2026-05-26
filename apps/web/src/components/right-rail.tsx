"use client";

import { ChangeEvent, useMemo, useState } from "react";
import { Download, FileJson, FileText, Loader2, Microscope, UploadCloud } from "lucide-react";
import { Panel, PanelHeader } from "./ui";

type ClinicalResult = {
  fractureType: string;
  location: string;
  confidence: string;
  urgency: string;
  summary: string;
};

const demoResult: ClinicalResult = {
  fractureType: "Oblique distal radius fracture",
  location: "Distal metaphysis",
  confidence: "92%",
  urgency: "High",
  summary:
    "Demo ensemble suggests an oblique distal radial fracture with moderate displacement and measurable angular deviation. Radiologist review is required before clinical use."
};

export function RightRail() {
  const [fileName, setFileName] = useState<string>("No file selected");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ClinicalResult>(demoResult);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const intakeStatus = useMemo(() => {
    if (isAnalyzing) return "Analyzing image";
    if (fileName !== "No file selected") return "Ready for review";
    return "Waiting for study";
  }, [fileName, isAnalyzing]);

  async function analyzeFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsAnalyzing(true);

    try {
      if (apiUrl) {
        const body = new FormData();
        body.append("file", file);
        const response = await fetch(`${apiUrl}/analysis/fracture`, {
          method: "POST",
          body
        });

        if (!response.ok) {
          throw new Error(`Analysis failed with ${response.status}`);
        }

        const data = await response.json();
        setResult({
          fractureType: data.fusion?.ensemble_label ?? demoResult.fractureType,
          location: data.clinical?.fracture_location ?? demoResult.location,
          confidence: `${Math.round((data.fusion?.ensemble_confidence ?? 0.92) * 100)}%`,
          urgency: data.clinical?.urgency ?? demoResult.urgency,
          summary: data.clinical?.impression ?? demoResult.summary
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
        setResult(demoResult);
      }
    } catch {
      setResult({
        ...demoResult,
        summary:
          "The frontend is running, but the AI backend is not reachable. Showing the built-in demo result until NEXT_PUBLIC_API_URL points to the deployed FastAPI service."
      });
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <aside className="col-span-12 space-y-4 xl:col-span-4">
      <Panel>
        <PanelHeader title="Upload & PACS Intake" />
        <div className="p-4">
          <label className="flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-white/20 bg-black/20 text-center hover:border-[#7bdcb5]/70">
            {isAnalyzing ? <Loader2 className="animate-spin text-[#7bdcb5]" /> : <UploadCloud className="text-[#7bdcb5]" />}
            <p className="mt-3 text-sm font-medium text-white">Drop or select DICOM, PNG, or JPG</p>
            <p className="mt-1 max-w-64 text-xs text-slate-400">{fileName}</p>
            <input className="sr-only" type="file" accept=".dcm,.dicom,image/png,image/jpeg" onChange={analyzeFile} />
          </label>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>{intakeStatus}</span>
            <span>PACS-ready</span>
          </div>
        </div>
      </Panel>
      <Panel>
        <PanelHeader title="Clinical Report Draft" />
        <div className="space-y-3 p-4 text-sm">
          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <span>Patient ID</span><strong className="text-right text-white">P-20491</strong>
            <span>Finding</span><strong className="text-right text-white">{result.fractureType}</strong>
            <span>Location</span><strong className="text-right text-white">{result.location}</strong>
            <span>Confidence</span><strong className="text-right text-[#7bdcb5]">{result.confidence}</strong>
            <span>Urgency</span><strong className="text-right text-signal">{result.urgency}</strong>
          </div>
          <p className="rounded-md border border-white/10 bg-[#121b23] p-3 text-xs leading-5 text-slate-300">
            {result.summary}
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button className="flex items-center justify-center gap-1 rounded-md border border-white/10 px-2 py-2 text-xs text-slate-200"><FileText size={14} /> PDF</button>
            <button className="flex items-center justify-center gap-1 rounded-md border border-white/10 px-2 py-2 text-xs text-slate-200"><FileJson size={14} /> JSON</button>
            <button className="flex items-center justify-center gap-1 rounded-md border border-white/10 px-2 py-2 text-xs text-slate-200"><Download size={14} /> SR</button>
          </div>
        </div>
      </Panel>
      <Panel>
        <PanelHeader title="Research Controls" />
        <div className="space-y-2 p-4">
          {["Run ablation study", "Export annotation set", "Fine-tune segmentation", "Generate paper figures"].map((item) => (
            <button key={item} className="flex w-full items-center gap-2 rounded-md border border-white/10 px-3 py-2 text-left text-sm text-slate-200">
              <Microscope size={16} className="text-amber" /> {item}
            </button>
          ))}
        </div>
      </Panel>
    </aside>
  );
}
