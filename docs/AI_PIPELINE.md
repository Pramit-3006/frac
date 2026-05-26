# AI Pipeline

## Enhancement Pipeline

- FCET hook
- CLAHE
- Histogram equalization
- Noise filtering
- Adaptive sharpening
- Bone structure enhancement
- Super-resolution hook
- Edge enhancement

Each enhancement stage records parameters and image hashes for reproducibility.

## Inference Pipeline

- Detection workers return boxes, labels, confidence, and anatomical region.
- Segmentation workers return masks, Dice-ready geometry, and cortical disruption estimates.
- Measurement workers compute fracture length, gap size, displacement, angular bend, and alignment deviation.
- XAI workers produce heatmaps and attribution metadata.
- Fusion workers compute model agreement, weighted vote, uncertainty, and calibrated severity.

## Training Pipeline

- Dataset adapters: MURA, RSNA Bone Fracture, VinDr-CXR, MedPix, custom DICOM.
- Split management: patient-level train/validation/test separation.
- Augmentation: radiographic intensity transforms, rotations, crop/resize, synthetic fracture stress testing.
- Experiment tracking: metrics, model cards, calibration curves, confusion matrices, ROC, PR curves.
- Export: ONNX and TensorRT optimized engines for production.

