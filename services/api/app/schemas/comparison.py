from pydantic import BaseModel, Field


class ComparisonRequest(BaseModel):
    image_id: str
    human_annotation_id: str
    ai_annotation_id: str


class ComparisonResponse(BaseModel):
    comparison_id: str
    iou: float = Field(ge=0, le=1)
    dice: float = Field(ge=0, le=1)
    precision: float = Field(ge=0, le=1)
    recall: float = Field(ge=0, le=1)
    f1: float = Field(ge=0, le=1)
    sensitivity: float = Field(ge=0, le=1)
    specificity: float = Field(ge=0, le=1)
    agreement_score: float = Field(ge=0, le=1)
    difference_heatmap_uri: str | None = None

