import { modelRows, metrics, rocData } from "@/lib/mock-data";
import { Metric, Panel, PanelHeader } from "./ui";

const agreement = [
  { metric: "IoU", value: 0.82 },
  { metric: "Dice", value: 0.86 },
  { metric: "F1", value: 0.89 },
  { metric: "Sens.", value: 0.93 },
  { metric: "Spec.", value: 0.88 }
];

function RocChart() {
  const points = rocData
    .map((point) => `${point.fpr * 260 + 24},${244 - point.tpr * 200}`)
    .join(" ");

  return (
    <svg viewBox="0 0 320 260" className="h-full w-full" role="img" aria-label="ROC curve">
      <line x1="24" y1="244" x2="292" y2="244" stroke="rgba(255,255,255,0.18)" />
      <line x1="24" y1="244" x2="24" y2="28" stroke="rgba(255,255,255,0.18)" />
      <line x1="24" y1="244" x2="292" y2="44" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 5" />
      <polyline fill="none" stroke="#7bdcb5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" points={points} />
      <text x="26" y="24" fill="#94a3b8" fontSize="12">AUC 0.94</text>
      <text x="242" y="256" fill="#94a3b8" fontSize="10">FPR</text>
      <text x="2" y="42" fill="#94a3b8" fontSize="10">TPR</text>
    </svg>
  );
}

function AgreementBars() {
  return (
    <div className="flex h-full items-end gap-4 px-2 pb-2 pt-6">
      {agreement.map((item) => (
        <div key={item.metric} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <div className="flex w-full flex-1 items-end rounded bg-black/20">
            <div
              className="w-full rounded-t bg-clinical"
              style={{ height: `${Math.round(item.value * 100)}%` }}
              title={`${item.metric}: ${item.value}`}
            />
          </div>
          <span className="text-xs text-slate-400">{item.metric}</span>
        </div>
      ))}
    </div>
  );
}

export function DashboardPanels() {
  return (
    <>
      <div className="col-span-12 grid gap-4 lg:grid-cols-4">
        {metrics.map((metric) => <Metric key={metric.label} {...metric} />)}
      </div>
      <Panel className="col-span-12 lg:col-span-4">
        <PanelHeader title="Model Benchmark Ranking" />
        <div className="divide-y divide-white/10">
          {modelRows.map((row) => (
            <div key={row.name} className="grid grid-cols-[1fr_auto] gap-3 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-white">{row.name}</p>
                <p className="text-xs text-slate-400">{row.task} | mAP50 {row.map50}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-[#7bdcb5]">{Math.round(row.confidence * 100)}%</p>
                <p className="text-xs text-slate-500">{row.latency} ms</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <Panel className="col-span-12 lg:col-span-4">
        <PanelHeader title="ROC Curve" />
        <div className="h-72 p-4">
          <RocChart />
        </div>
      </Panel>
      <Panel className="col-span-12 lg:col-span-4">
        <PanelHeader title="Human vs AI Agreement" />
        <div className="h-72 p-4">
          <AgreementBars />
        </div>
      </Panel>
    </>
  );
}
