from enum import Enum
from pydantic import BaseModel, Field


class Point(BaseModel):
    x: float
    y: float


class BoundingBox(BaseModel):
    x: float
    y: float
    width: float
    height: float


class Urgency(str, Enum):
    routine = "routine"
    urgent = "urgent"
    emergent = "emergent"


class Measurement(BaseModel):
    name: str
    value: float
    unit: str
    confidence: float = Field(ge=0, le=1)

