from app.ai.model_registry import XAI_METHODS
from app.schemas.analysis import XAIResult


def generate_xai_outputs() -> list[XAIResult]:
    return [
        XAIResult(
            method=method,
            confidence=round(0.91 - index * 0.018, 3),
            heatmap_uri=f"mock://heatmaps/{method.lower().replace('+', 'plus').replace(' ', '-')}",
            explanation=f"{method} highlights cortical discontinuity and radiolucent fracture line near the distal radial metaphysis.",
        )
        for index, method in enumerate(XAI_METHODS)
    ]

