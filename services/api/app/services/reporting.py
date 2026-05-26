from uuid import uuid4

from app.schemas.report import ReportRequest, ReportResponse


def create_report(request: ReportRequest) -> ReportResponse:
    report_id = str(uuid4())
    return ReportResponse(
        report_id=report_id,
        status="draft",
        pdf_uri=f"mock://reports/{report_id}.pdf",
        json_uri=f"mock://reports/{report_id}.json",
        csv_uri=f"mock://reports/{report_id}.csv",
        dicom_sr_uri=f"mock://reports/{report_id}.dcm",
        clinical_summary=(
            "Draft report generated with fracture type, location, severity, displacement, "
            "angular deviation, confidence, model agreement, and XAI evidence."
        ),
    )

