# ---------- 1. Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /frontend/app

COPY package.json package-lock.json* ./
RUN npm ci

# ---------- 2. Builder ----------
FROM node:20-alpine AS builder
WORKDIR /frontend/app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ---------- 3. Runner ----------
FROM node:20-alpine AS runner
WORKDIR /frontend/app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]

