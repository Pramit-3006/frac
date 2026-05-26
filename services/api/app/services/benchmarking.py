from uuid import uuid4

from app.schemas.benchmark import BenchmarkRequest, BenchmarkResponse, BenchmarkRow


def run_benchmark(request: BenchmarkRequest) -> BenchmarkResponse:
    rows: list[BenchmarkRow] = []
    for index, model in enumerate(request.models):
        rows.append(
            BenchmarkRow(
                model_name=model,
                task="segmentation" if "U-Net" in model or model in {"DeepLabV3+", "nnU-Net"} else "detection",
                map50=round(max(0.7, 0.92 - index * 0.018), 3),
                map5095=round(max(0.62, 0.84 - index * 0.017), 3),
                dice=round(max(0.68, 0.88 - index * 0.014), 3),
                sensitivity=round(max(0.72, 0.94 - index * 0.013), 3),
                specificity=round(max(0.7, 0.9 - index * 0.012), 3),
                latency_ms=36 + index * 13,
                rank=index + 1,
            )
        )
    return BenchmarkResponse(benchmark_id=str(uuid4()), dataset=request.dataset, rows=rows)

