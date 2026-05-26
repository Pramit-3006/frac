import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
const apiTarget = process.env.AI_API_URL || "http://localhost:8000";
const port = Number(process.env.PORT || 8080);

app.use(express.json({ limit: "10mb" }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "fractureiq-gateway", apiTarget });
});

app.use(
  "/api",
  createProxyMiddleware({
    target: apiTarget,
    changeOrigin: true,
    pathRewrite: { "^/api": "" }
  })
);

app.listen(port, () => {
  console.log(`FractureIQ gateway listening on ${port}`);
});

