# Stage 1: Build the Angular SSR application
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Minimal Node SSR production runtime
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

COPY --from=builder /app/dist/satyam-portfolio ./dist/satyam-portfolio
COPY --from=builder /app/package*.json ./

EXPOSE 4000
CMD ["node", "dist/satyam-portfolio/server/server.mjs"]
