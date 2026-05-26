from pydantic import BaseModel


class DicomMetadata(BaseModel):
    patient_id: str | None = None
    study_instance_uid: str | None = None
    series_instance_uid: str | None = None
    sop_instance_uid: str | None = None
    modality: str | None = "XR"
    body_part_examined: str | None = None
    view_position: str | None = None
    pixel_spacing: tuple[float, float] | None = None


class DicomSrFinding(BaseModel):
    code: str
    label: str
    value: str
    confidence: float

