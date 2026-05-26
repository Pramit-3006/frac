export const modelRows = [
  { name: "YOLOv11", task: "Detection", confidence: 0.94, map50: 0.91, latency: 38, rank: 1 },
  { name: "RT-DETR", task: "Detection", confidence: 0.91, map50: 0.89, latency: 52, rank: 2 },
  { name: "Mask R-CNN", task: "Detection + Mask", confidence: 0.88, map50: 0.86, latency: 96, rank: 3 },
  { name: "nnU-Net", task: "Segmentation", confidence: 0.9, map50: 0.87, latency: 112, rank: 4 },
  { name: "TransUNet", task: "Segmentation", confidence: 0.87, map50: 0.84, latency: 128, rank: 5 }
];

export const metrics = [
  { label: "Studies", value: "1,248", delta: "+18%" },
  { label: "Fracture positive", value: "342", delta: "+7%" },
  { label: "Mean confidence", value: "92.4%", delta: "+2.1%" },
  { label: "Radiologist agreement", value: "0.87", delta: "+0.04" }
];

export const rocData = [
  { fpr: 0, tpr: 0 },
  { fpr: 0.05, tpr: 0.72 },
  { fpr: 0.12, tpr: 0.86 },
  { fpr: 0.22, tpr: 0.93 },
  { fpr: 0.4, tpr: 0.97 },
  { fpr: 1, tpr: 1 }
];

export const fractureTypes = [
  "Hairline",
  "Spiral",
  "Comminuted",
  "Oblique",
  "Transverse",
  "Greenstick",
  "Stress",
  "Compression",
  "Impacted",
  "Avulsion",
  "Dislocation"
];

