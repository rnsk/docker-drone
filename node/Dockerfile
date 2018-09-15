FROM node:8.12.0-alpine

# 必要なパッケージのインストール
RUN apk --update add \
  curl \
  git \
  tar \
  wget \
 && apk del build-base \
 && rm -rf /var/cache/apk/*

RUN npm install -g --no-optional forever

# ポートを開放
EXPOSE 3000 5005

# ディレクトリを移動
WORKDIR /html
