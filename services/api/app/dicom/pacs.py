from app.dicom.contracts import DicomMetadata


def parse_dicom_metadata(_payload: bytes) -> DicomMetadata:
    return DicomMetadata(
        patient_id="P-20491",
        study_instance_uid="1.2.826.0.1.3680043.10.900.fractureiq.study",
        series_instance_uid="1.2.826.0.1.3680043.10.900.fractureiq.series",
        sop_instance_uid="1.2.826.0.1.3680043.10.900.fractureiq.instance",
        body_part_examined="WRIST",
        view_position="PA",
        pixel_spacing=(0.143, 0.143),
    )


def build_dicom_sr_contract(report_id: str) -> dict[str, str]:
    return {
        "report_id": report_id,
        "sop_class": "Comprehensive SR Storage",
        "status": "ready-for-dicom-sr-encoding",
    }

