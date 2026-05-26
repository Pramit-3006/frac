from pydantic import BaseModel, Field

from app.schemas.common import BoundingBox, Measurement, Point, Urgency


class ModelPrediction(BaseModel):
    model_name: str
    task: str
    confidence: float = Field(ge=0, le=1)
    fracture_type: str
    anatomical_region: str
    bbox: BoundingBox
    latency_ms: int


class SegmentationResult(BaseModel):
    model_name: str
    dice_estimate: float = Field(ge=0, le=1)
    mask_uri: str | None = None
    polygon: list[Point]


class XAIResult(BaseModel):
    method: str
    confidence: float = Field(ge=0, le=1)
    heatmap_uri: str | None = None
    explanation: str


class FusionResult(BaseModel):
    ensemble_label: str
    ensemble_confidence: float = Field(ge=0, le=1)
    model_agreement: float = Field(ge=0, le=1)
    severity_score: float = Field(ge=0, le=10)
    uncertainty_interval: tuple[float, float]


class ClinicalInterpretation(BaseModel):
    patient_id: str
    bone_analyzed: str
    fracture_location: str
    urgency: Urgency
    impression: str
    measurements: list[Measurement]


class AnalysisResponse(BaseModel):
    analysis_id: str
    filename: str
    predictions: list[ModelPrediction]
    segmentations: list[SegmentationResult]
    xai: list[XAIResult]
    fusion: FusionResult
    clinical: ClinicalInterpretation

