# Vercel Deployment

## Scope

Deploy `apps/web` to Vercel. Keep the FastAPI AI backend, GPU inference workers, databases, Redis, object storage, and PACS integrations on a backend platform with container and GPU support.

## Vercel Project Settings

- Root Directory: `apps/web`
- Framework Preset: `Next.js`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `.next`

## Environment Variables

Set this in Vercel:

```text
NEXT_PUBLIC_API_URL=https://your-fastapi-backend.example.com
```

## CLI Deploy

```bash
cd apps/web
npm install
npm run build
vercel --prod
```

## Git Deploy

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in Vercel.
3. Set the root directory to `apps/web`.
4. Add `NEXT_PUBLIC_API_URL`.
5. Deploy.

## Backend

For the real medical AI backend, deploy `services/api` using Docker or Kubernetes on a GPU-capable platform. Vercel can run lightweight Python/FastAPI functions, but this platform requires GPU inference, long-running jobs, DICOM processing, model weights, Redis queues, and persistent data services.

