"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { modelRows, metrics, rocData } from "@/lib/mock-data";
import { Metric, Panel, PanelHeader } from "./ui";

export function DashboardPanels() {
  return (
    <>
      <div className="col-span-12 grid gap-4 lg:grid-cols-4">
        {metrics.map((metric) => <Metric key={metric.label} {...metric} />)}
      </div>
      <Panel className="col-span-4">
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
      <Panel className="col-span-4">
        <PanelHeader title="ROC Curve" />
        <div className="h-72 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rocData}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="fpr" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#101820", border: "1px solid rgba(255,255,255,0.1)" }} />
              <Line type="monotone" dataKey="tpr" stroke="#7bdcb5" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Panel>
      <Panel className="col-span-4">
        <PanelHeader title="Human vs AI Agreement" />
        <div className="h-72 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { metric: "IoU", value: 0.82 },
              { metric: "Dice", value: 0.86 },
              { metric: "F1", value: 0.89 },
              { metric: "Sens.", value: 0.93 },
              { metric: "Spec.", value: 0.88 }
            ]}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="metric" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#101820", border: "1px solid rgba(255,255,255,0.1)" }} />
              <Bar dataKey="value" fill="#2b7a78" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Panel>
    </>
  );
}
