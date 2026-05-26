DETECTION_MODELS = [
    "YOLOv9",
    "YOLOv10",
    "YOLOv11",
    "Faster R-CNN",
    "Mask R-CNN",
    "RetinaNet",
    "EfficientDet",
    "DETR",
    "RT-DETR",
    "Cascade R-CNN",
]

SEGMENTATION_MODELS = [
    "U-Net",
    "Attention U-Net",
    "TransUNet",
    "DeepLabV3+",
    "nnU-Net",
]

XAI_METHODS = [
    "Grad-CAM",
    "Grad-CAM++",
    "Score-CAM",
    "SHAP",
    "LIME",
    "Attention Visualization",
]


MODEL_WEIGHTS = {
    "YOLOv11": 0.17,
    "RT-DETR": 0.15,
    "Mask R-CNN": 0.12,
    "Cascade R-CNN": 0.1,
    "YOLOv10": 0.1,
    "YOLOv9": 0.09,
    "Faster R-CNN": 0.08,
    "RetinaNet": 0.07,
    "EfficientDet": 0.06,
    "DETR": 0.06,
}

