from enum import Enum


class Role(str, Enum):
    admin = "admin"
    radiologist = "radiologist"
    orthopedist = "orthopedist"
    researcher = "researcher"
    technician = "technician"


ROLE_PERMISSIONS = {
    Role.admin: {"*"},
    Role.radiologist: {"study:read", "analysis:run", "annotation:write", "report:sign"},
    Role.orthopedist: {"study:read", "analysis:read", "report:read"},
    Role.researcher: {"dataset:read", "benchmark:run", "analysis:read"},
    Role.technician: {"study:upload", "study:read"},
}


def has_permission(role: Role, permission: str) -> bool:
    permissions = ROLE_PERMISSIONS[role]
    return "*" in permissions or permission in permissions

