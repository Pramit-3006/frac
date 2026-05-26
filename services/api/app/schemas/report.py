from pydantic import BaseModel


class ReportRequest(BaseModel):
    analysis_id: str
    patient_id: str
    reviewer_id: str | None = None


class ReportResponse(BaseModel):
    report_id: str
    status: str
    pdf_uri: str
    json_uri: str
    csv_uri: str
    dicom_sr_uri: str
    clinical_summary: str

