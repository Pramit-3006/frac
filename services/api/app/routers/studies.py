from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/studies", tags=["studies"])


@router.get("")
def list_studies() -> dict[str, list[dict[str, str]]]:
    return {
        "studies": [
            {"id": "study-001", "patient_id": "P-20491", "body_part": "wrist", "status": "completed"},
            {"id": "study-002", "patient_id": "P-20492", "body_part": "ankle", "status": "queued"},
        ]
    }


@router.post("/upload")
async def upload_study(file: UploadFile = File(...)) -> dict[str, str | int]:
    payload = await file.read()
    return {
        "study_id": "study-uploaded",
        "filename": file.filename or "upload",
        "bytes": len(payload),
        "status": "queued",
    }

