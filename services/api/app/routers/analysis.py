from fastapi import APIRouter, UploadFile, File

from app.schemas.analysis import AnalysisResponse
from app.services.orchestrator import run_fracture_analysis

router = APIRouter(prefix="/analysis", tags=["analysis"])


@router.post("/fracture", response_model=AnalysisResponse)
async def analyze_fracture(file: UploadFile = File(...)) -> AnalysisResponse:
    payload = await file.read()
    return run_fracture_analysis(filename=file.filename or "upload", image_bytes=payload)


@router.get("/{analysis_id}")
def get_analysis(analysis_id: str) -> dict[str, str]:
    return {"analysis_id": analysis_id, "status": "completed"}

