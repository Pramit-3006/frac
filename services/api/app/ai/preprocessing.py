from dataclasses import dataclass


@dataclass(frozen=True)
class EnhancementStep:
    name: str
    description: str
    enabled: bool = True


ENHANCEMENT_PIPELINE = [
    EnhancementStep("FCET", "Feature contrast enhancement for cortical edge visibility."),
    EnhancementStep("CLAHE", "Local contrast equalization for radiographic intensity correction."),
    EnhancementStep("Histogram Equalization", "Global intensity normalization."),
    EnhancementStep("Noise Filtering", "Denoising prior to detection and segmentation."),
    EnhancementStep("Adaptive Sharpening", "Edge-preserving sharpening for hairline fracture cues."),
    EnhancementStep("Bone Structure Enhancement", "Tubular and cortical structure emphasis."),
    EnhancementStep("Super Resolution", "Optional model-backed resolution enhancement."),
    EnhancementStep("Edge Enhancement", "Canny/Sobel-style fracture candidate highlighting."),
]


def describe_enhancement_pipeline() -> list[dict[str, str | bool]]:
    return [step.__dict__ for step in ENHANCEMENT_PIPELINE]

