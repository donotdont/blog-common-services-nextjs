FROM node:20-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm i
RUN npm i sharp

FROM base as builder
WORKDIR /app
COPY . .
RUN npm run build || true

FROM base as production
WORKDIR /app

ENV NODE_ENV=production
RUN npm ci

#RUN mkdir -p /app/out/server/app/_next/
#RUN mkdir -p /app/out/server/app/_next/static/

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
#COPY --from=builder /app/out ./out
#COPY --from=builder /app/out/static ./out/server/app/_next/static
#COPY --from=builder /app/public ./out/server/app

CMD npm start

FROM base as dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD npm run dev

EXPOSE 3000
CMD ["npm","run","build"]
CMD ["npm","run","start"]