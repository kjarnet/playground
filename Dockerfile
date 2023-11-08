# https://github.com/GoogleContainerTools/distroless/blob/main/examples/nodejs/Dockerfile
FROM node:20-bullseye-slim AS build
COPY ./client /client
COPY ./server /server
WORKDIR /client
RUN npm ci && npm run build
WORKDIR /server
RUN npm ci && npm run build
# Uncomment following to avoid having development tools in prod image
# at the expense of longer build time:
# RUN rm -rf node_modules && npm ci --only=production

FROM gcr.io/distroless/nodejs20-debian12
COPY --from=build /server/dist /usr/src/app
COPY --from=build /server/node_modules /usr/src/node_modules
WORKDIR /usr/src/app
CMD ["index.js"]

