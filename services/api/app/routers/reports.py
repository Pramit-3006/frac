from fastapi import APIRouter

from app.schemas.report import ReportRequest, ReportResponse
from app.services.reporting import create_report

router = APIRouter(prefix="/reports", tags=["reports"])


@router.post("", response_model=ReportResponse)
def generate_report(request: ReportRequest) -> ReportResponse:
    return create_report(request)


@router.get("/{report_id}/export/{format_name}")
def export_report(report_id: str, format_name: str) -> dict[str, str]:
    return {"report_id": report_id, "format": format_name, "uri": f"mock://reports/{report_id}.{format_name}"}

