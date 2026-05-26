# Deployment Strategy

## Local

Use Docker Compose for web, API, PostgreSQL, MongoDB, and Redis.

## Production

- Kubernetes with GPU node pools
- NVIDIA device plugin
- Horizontal pod autoscaling for API and CPU preprocessing
- Dedicated GPU inference workers
- Redis for job state and websocket updates
- PostgreSQL for clinical metadata
- MongoDB for flexible analysis documents and research results
- S3-compatible object storage for images, reports, masks, and model artifacts

## GPU Optimization

- TorchScript/ONNX export where supported
- TensorRT engines for YOLO, DETR-family, and segmentation models
- Mixed precision inference
- Batched inference for research workloads
- Fallback CPU path for degraded operation
- Warm model pools and health checks per model family

