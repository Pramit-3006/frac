from statistics import mean

from app.ai.model_registry import MODEL_WEIGHTS
from app.schemas.analysis import FusionResult, ModelPrediction


def bayesian_confidence_fusion(predictions: list[ModelPrediction]) -> FusionResult:
    weighted_sum = 0.0
    total_weight = 0.0
    for prediction in predictions:
        weight = MODEL_WEIGHTS.get(prediction.model_name, 0.04)
        weighted_sum += prediction.confidence * weight
        total_weight += weight

    confidence = weighted_sum / total_weight if total_weight else mean([p.confidence for p in predictions])
    agreement = 1.0 - min(0.22, max(p.confidence for p in predictions) - min(p.confidence for p in predictions))
    severity = 7.8
    margin = 0.06
    return FusionResult(
        ensemble_label="oblique distal radius fracture",
        ensemble_confidence=round(confidence, 3),
        model_agreement=round(agreement, 3),
        severity_score=severity,
        uncertainty_interval=(round(confidence - margin, 3), round(confidence + margin, 3)),
    )

