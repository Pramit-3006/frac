import { Download, FileJson, FileText, Microscope, UploadCloud } from "lucide-react";
import { Panel, PanelHeader } from "./ui";

export function RightRail() {
  return (
    <aside className="col-span-4 space-y-4">
      <Panel>
        <PanelHeader title="Upload & PACS Intake" />
        <div className="p-4">
          <div className="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed border-white/20 bg-black/20 text-center">
            <UploadCloud className="text-[#7bdcb5]" />
            <p className="mt-3 text-sm font-medium text-white">Drop DICOM, PNG, or JPG</p>
            <p className="mt-1 text-xs text-slate-400">Batch upload and PACS retrieval ready</p>
          </div>
        </div>
      </Panel>
      <Panel>
        <PanelHeader title="Clinical Report Draft" />
        <div className="space-y-3 p-4 text-sm">
          <div className="grid grid-cols-2 gap-2 text-slate-300">
            <span>Patient ID</span><strong className="text-right text-white">P-20491</strong>
            <span>Bone</span><strong className="text-right text-white">Radius</strong>
            <span>Location</span><strong className="text-right text-white">Distal metaphysis</strong>
            <span>Urgency</span><strong className="text-right text-signal">High</strong>
          </div>
          <p className="rounded-md border border-white/10 bg-[#121b23] p-3 text-xs leading-5 text-slate-300">
            Ensemble findings suggest an oblique distal radial fracture with moderate displacement and measurable angular deviation. Human radiologist review is required before clinical use.
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

