FROM node:22-alpine AS deps
WORKDIR /app/apps/web
COPY apps/web/package*.json ./
RUN npm install

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=deps /app/apps/web/node_modules ./apps/web/node_modules
COPY apps/web ./apps/web
WORKDIR /app/apps/web
EXPOSE 3000
CMD ["npm", "run", "dev"]

