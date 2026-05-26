from app.ai.model_registry import DETECTION_MODELS, SEGMENTATION_MODELS
from app.schemas.analysis import ModelPrediction, SegmentationResult
from app.schemas.common import BoundingBox, Point


def run_detection_ensemble(filename: str) -> list[ModelPrediction]:
    predictions: list[ModelPrediction] = []
    for index, model in enumerate(DETECTION_MODELS):
        confidence = max(0.72, 0.94 - index * 0.025)
        predictions.append(
            ModelPrediction(
                model_name=model,
                task="detection" if model != "Mask R-CNN" else "detection+instance-segmentation",
                confidence=round(confidence, 3),
                fracture_type="oblique fracture",
                anatomical_region="distal radius",
                bbox=BoundingBox(x=0.44, y=0.38, width=0.18, height=0.26),
                latency_ms=34 + index * 11,
            )
        )
    return predictions


def run_segmentation_ensemble() -> list[SegmentationResult]:
    polygon = [
        Point(x=0.49, y=0.42),
        Point(x=0.56, y=0.45),
        Point(x=0.55, y=0.63),
        Point(x=0.47, y=0.61),
    ]
    return [
        SegmentationResult(
            model_name=model,
            dice_estimate=round(0.9 - index * 0.018, 3),
            mask_uri=f"mock://masks/{model.lower().replace(' ', '-')}",
            polygon=polygon,
        )
        for index, model in enumerate(SEGMENTATION_MODELS)
    ]

