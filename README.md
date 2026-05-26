# FractureIQ

Production-oriented AI radiology platform scaffold for fracture detection, segmentation, explainability, model benchmarking, human-vs-AI comparison, and clinical reporting.

> Clinical safety note: this repository is an engineering scaffold and research assistant. It is not a certified medical device and must not be used for diagnosis without regulatory validation, clinical governance, calibrated models, and radiologist review.

## What Is Included

- Next.js + TypeScript + Tailwind clinical imaging frontend
- FastAPI AI service with modular inference, benchmarking, XAI, reporting, and comparison APIs
- Model registry for YOLOv9/v10/v11, Faster R-CNN, Mask R-CNN, RetinaNet, EfficientDet, DETR, RT-DETR, Cascade R-CNN, U-Net variants, DeepLabV3+, and nnU-Net
- Enhancement pipeline design for CLAHE, histogram equalization, denoising, sharpening, bone enhancement, edge enhancement, and super-resolution hooks
- PostgreSQL schema, Mongo document schema notes, Redis cache strategy
- Docker Compose and Kubernetes deployment skeletons
- PACS/DICOM integration plan and DICOM-SR report contract
- Research roadmap for training, benchmarking, ablations, and dataset support

## Repository Layout

```text
apps/
  web/                  Next.js clinical workstation UI
services/
  api/                  FastAPI AI orchestration service
infra/
  docker/               Dockerfiles
  k8s/                  Kubernetes manifests
  db/                   SQL schema
docs/                   Architecture and implementation guides
```

## Quick Start

Frontend:

```bash
cd apps/web
npm install
npm run dev
```

Backend:

```bash
cd services/api
python -m venv .venv
.venv/Scripts/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Docker:

```bash
docker compose up --build
```

## Primary URLs

- Web UI: http://localhost:3000
- Node gateway: http://localhost:8080
- API: http://localhost:8000
- API docs: http://localhost:8000/docs

## Production Modules

- `apps/web`: clinical workstation UI
- `services/gateway`: Node.js gateway for auth, routing, and edge policy
- `services/api`: Python AI orchestration service
- `infra/db`: PostgreSQL clinical schema
- `infra/k8s`: Kubernetes web, gateway, and GPU API deployments
