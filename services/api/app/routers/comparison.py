from fastapi import APIRouter

from app.schemas.comparison import ComparisonRequest, ComparisonResponse
from app.services.comparison import compare_annotations

router = APIRouter(prefix="/comparison", tags=["comparison"])


@router.post("/run", response_model=ComparisonResponse)
def run_comparison(request: ComparisonRequest) -> ComparisonResponse:
    return compare_annotations(request)

