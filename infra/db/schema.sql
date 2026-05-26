CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'radiologist', 'orthopedist', 'researcher', 'technician')),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  external_patient_id TEXT UNIQUE NOT NULL,
  sex TEXT,
  birth_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE studies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES patients(id),
  study_instance_uid TEXT UNIQUE,
  modality TEXT NOT NULL DEFAULT 'XR',
  body_part TEXT,
  study_date TIMESTAMPTZ,
  accession_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  study_id UUID REFERENCES studies(id),
  series_instance_uid TEXT,
  sop_instance_uid TEXT,
  storage_uri TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  pixel_spacing_x NUMERIC,
  pixel_spacing_y NUMERIC,
  view_position TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_id UUID REFERENCES images(id),
  status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'completed', 'failed')),
  ensemble_confidence NUMERIC,
  severity_score NUMERIC,
  model_agreement NUMERIC,
  result_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE annotations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_id UUID REFERENCES images(id),
  analysis_id UUID REFERENCES analyses(id),
  author_id UUID REFERENCES users(id),
  source TEXT NOT NULL CHECK (source IN ('human', 'ai', 'consensus')),
  version INTEGER NOT NULL DEFAULT 1,
  geometry_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id),
  status TEXT NOT NULL CHECK (status IN ('draft', 'reviewed', 'signed')),
  report_json JSONB NOT NULL,
  pdf_uri TEXT,
  dicom_sr_uri TEXT,
  signed_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

