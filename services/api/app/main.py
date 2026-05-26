from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from app.routers import analysis, benchmark, comparison, reports, studies
from app.schemas.analysis import AnalysisResponse
from app.services.orchestrator import run_fracture_analysis

app = FastAPI(
    title="FractureIQ AI Service",
    version="0.1.0",
    description="AI orchestration service for fracture detection, segmentation, XAI, benchmarking, and reporting.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(studies.router)
app.include_router(analysis.router)
app.include_router(benchmark.router)
app.include_router(comparison.router)
app.include_router(reports.router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "fractureiq-api"}


@app.post("/quick-analyze", response_model=AnalysisResponse)
async def quick_analyze(file: UploadFile = File(...)) -> AnalysisResponse:
    payload = await file.read()
    return run_fracture_analysis(filename=file.filename or "upload", image_bytes=payload)

