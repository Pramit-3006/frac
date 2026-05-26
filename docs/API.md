# API Structure

## Authentication

- `POST /auth/token`
- `GET /auth/me`

## Imaging

- `POST /studies/upload`
- `GET /studies`
- `GET /studies/{study_id}`
- `GET /studies/{study_id}/series/{series_id}`

## AI Analysis

- `POST /analysis/fracture`
- `GET /analysis/{analysis_id}`
- `POST /analysis/{analysis_id}/xai`
- `POST /analysis/{analysis_id}/fusion`

## Benchmarking

- `POST /benchmark/run`
- `GET /benchmark/{benchmark_id}`
- `GET /benchmark/{benchmark_id}/ranking`

## Human-vs-AI Comparison

- `POST /comparison/annotations`
- `POST /comparison/run`
- `GET /comparison/{comparison_id}`

## Reports

- `POST /reports`
- `GET /reports/{report_id}`
- `GET /reports/{report_id}/export/pdf`
- `GET /reports/{report_id}/export/json`
- `GET /reports/{report_id}/export/csv`
- `GET /reports/{report_id}/export/dicom-sr`

