from app.schemas.common import Measurement


def calculate_measurements() -> list[Measurement]:
    return [
        Measurement(name="Fracture length", value=18.4, unit="mm", confidence=0.88),
        Measurement(name="Fracture gap", value=2.8, unit="mm", confidence=0.84),
        Measurement(name="Displacement", value=4.2, unit="mm", confidence=0.86),
        Measurement(name="Angular deviation", value=12.6, unit="deg", confidence=0.82),
        Measurement(name="Cortical disruption", value=34.0, unit="percent", confidence=0.8),
    ]

