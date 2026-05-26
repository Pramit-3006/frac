from uuid import uuid4

from app.ai.fusion import bayesian_confidence_fusion
from app.ai.inference import run_detection_ensemble, run_segmentation_ensemble
from app.ai.measurements import calculate_measurements
from app.ai.xai import generate_xai_outputs
from app.schemas.analysis import AnalysisResponse, ClinicalInterpretation
from app.schemas.common import Urgency


def run_fracture_analysis(filename: str, image_bytes: bytes) -> AnalysisResponse:
    predictions = run_detection_ensemble(filename)
    segmentations = run_segmentation_ensemble()
    xai = generate_xai_outputs()
    fusion = bayesian_confidence_fusion(predictions)
    measurements = calculate_measurements()

    clinical = ClinicalInterpretation(
        patient_id="P-20491",
        bone_analyzed="Radius",
        fracture_location="Distal metaphysis",
        urgency=Urgency.urgent,
        impression=(
            "AI ensemble suggests an oblique distal radius fracture with moderate displacement, "
            "measurable angular deviation, and high inter-model agreement. Radiologist review required."
        ),
        measurements=measurements,
    )

    return AnalysisResponse(
        analysis_id=str(uuid4()),
        filename=filename,
        predictions=predictions,
        segmentations=segmentations,
        xai=xai,
        fusion=fusion,
        clinical=clinical,
    )

