# This image will be used in production version only.
FROM node:20-alpine as base

FROM base as build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM base as production
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/tsconfig.json ./

EXPOSE 8080