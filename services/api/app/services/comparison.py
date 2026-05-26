from uuid import uuid4

from app.schemas.comparison import ComparisonRequest, ComparisonResponse


def compare_annotations(request: ComparisonRequest) -> ComparisonResponse:
    return ComparisonResponse(
        comparison_id=str(uuid4()),
        iou=0.82,
        dice=0.86,
        precision=0.9,
        recall=0.88,
        f1=0.89,
        sensitivity=0.93,
        specificity=0.88,
        agreement_score=0.87,
        difference_heatmap_uri=f"mock://comparison/{request.image_id}/difference-heatmap",
    )

