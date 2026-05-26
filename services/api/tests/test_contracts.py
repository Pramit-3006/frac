from app.ai.fusion import bayesian_confidence_fusion
from app.ai.inference import run_detection_ensemble
from app.services.orchestrator import run_fracture_analysis


def test_orchestrator_returns_complete_analysis():
    response = run_fracture_analysis("wrist.png", b"image")
    assert response.predictions
    assert response.segmentations
    assert response.xai
    assert response.fusion.ensemble_confidence > 0
    assert response.clinical.measurements


def test_fusion_bounds_confidence():
    predictions = run_detection_ensemble("wrist.png")
    fusion = bayesian_confidence_fusion(predictions)
    assert 0 <= fusion.ensemble_confidence <= 1
    assert 0 <= fusion.model_agreement <= 1

