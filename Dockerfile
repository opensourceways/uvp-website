FROM bitnami/git
RUN git clone https://github.com/opensourceways/uvp-website.git -b BRANCH

FROM node:lts-alpine@sha256:d5b2a7869a4016b1847986ea52098fa404421e44281bb7615a9e3615e07f37fb
WORKDIR /uvp-website
COPY --from=0 /uvp-website /uvp-website

ENV NODE_OPTIONS="--openssl-legacy-provider"

RUN npm config set registry https://registry.npmmirror.com/ \
    && npm install -g @vue/cli \
    && npm install -g http-server \
    && npm install \
    && npm run build-production

EXPOSE 8080

ENTRYPOINT [ "http-server", "dist" ]
