FROM node:22-alpine
WORKDIR /app/services/gateway
COPY services/gateway/package*.json ./
RUN npm install
COPY services/gateway ./
EXPOSE 8080
CMD ["npm", "run", "start"]

