export type AnalysisPrediction = {
  model_name: string;
  task: string;
  confidence: number;
  fracture_type: string;
  anatomical_region: string;
  latency_ms: number;
};

export type AnalysisMeasurement = {
  name: string;
  value: number;
  unit: string;
  confidence: number;
};

export type AnalysisResult = {
  analysis_id: string;
  filename: string;
  predictions: AnalysisPrediction[];
  fusion: {
    ensemble_label: string;
    ensemble_confidence: number;
    model_agreement: number;
    severity_score: number;
    uncertainty_interval: [number, number];
  };
  clinical: {
    patient_id: string;
    bone_analyzed: string;
    fracture_location: string;
    urgency: string;
    impression: string;
    measurements: AnalysisMeasurement[];
  };
};

export const demoAnalysis: AnalysisResult = {
  analysis_id: "demo-analysis-001",
  filename: "demo-wrist-xray.png",
  predictions: [
    { model_name: "YOLOv11", task: "detection", confidence: 0.94, fracture_type: "oblique fracture", anatomical_region: "distal radius", latency_ms: 38 },
    { model_name: "RT-DETR", task: "detection", confidence: 0.91, fracture_type: "oblique fracture", anatomical_region: "distal radius", latency_ms: 52 },
    { model_name: "Mask R-CNN", task: "detection+mask", confidence: 0.88, fracture_type: "oblique fracture", anatomical_region: "distal radius", latency_ms: 96 },
    { model_name: "nnU-Net", task: "segmentation", confidence: 0.9, fracture_type: "cortical disruption", anatomical_region: "distal radius", latency_ms: 112 }
  ],
  fusion: {
    ensemble_label: "Oblique distal radius fracture",
    ensemble_confidence: 0.92,
    model_agreement: 0.87,
    severity_score: 7.8,
    uncertainty_interval: [0.86, 0.98]
  },
  clinical: {
    patient_id: "P-20491",
    bone_analyzed: "Radius",
    fracture_location: "Distal metaphysis",
    urgency: "urgent",
    impression:
      "AI ensemble suggests an oblique distal radius fracture with moderate displacement, measurable angular deviation, and high inter-model agreement. Radiologist review required.",
    measurements: [
      { name: "Fracture length", value: 18.4, unit: "mm", confidence: 0.88 },
      { name: "Fracture gap", value: 2.8, unit: "mm", confidence: 0.84 },
      { name: "Displacement", value: 4.2, unit: "mm", confidence: 0.86 },
      { name: "Angular deviation", value: 12.6, unit: "deg", confidence: 0.82 },
      { name: "Cortical disruption", value: 34, unit: "percent", confidence: 0.8 }
    ]
  }
};

export function resultFromUpload(filename: string): AnalysisResult {
  return {
    ...demoAnalysis,
    analysis_id: `local-${Date.now()}`,
    filename,
    clinical: {
      ...demoAnalysis.clinical,
      impression: `Local demo analysis completed for ${filename}. The simulated ensemble found an oblique distal radius fracture pattern with heatmap evidence and measurable displacement. Connect NEXT_PUBLIC_API_URL to use the FastAPI inference service.`
    }
  };
}

