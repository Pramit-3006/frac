from pydantic import BaseModel, Field


class BenchmarkRequest(BaseModel):
    dataset: str = "MURA"
    models: list[str]
    metrics: list[str] = ["mAP50", "mAP50-95", "Dice", "Sensitivity", "Specificity"]


class BenchmarkRow(BaseModel):
    model_name: str
    task: str
    map50: float = Field(ge=0, le=1)
    map5095: float = Field(ge=0, le=1)
    dice: float = Field(ge=0, le=1)
    sensitivity: float = Field(ge=0, le=1)
    specificity: float = Field(ge=0, le=1)
    latency_ms: int
    rank: int


class BenchmarkResponse(BaseModel):
    benchmark_id: str
    dataset: str
    rows: list[BenchmarkRow]

