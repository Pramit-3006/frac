from fastapi import APIRouter

from app.ai.model_registry import DETECTION_MODELS, SEGMENTATION_MODELS
from app.schemas.benchmark import BenchmarkRequest, BenchmarkResponse
from app.services.benchmarking import run_benchmark

router = APIRouter(prefix="/benchmark", tags=["benchmark"])


@router.get("/models")
def list_models() -> dict[str, list[str]]:
    return {"detection": DETECTION_MODELS, "segmentation": SEGMENTATION_MODELS}


@router.post("/run", response_model=BenchmarkResponse)
def create_benchmark(request: BenchmarkRequest) -> BenchmarkResponse:
    return run_benchmark(request)

