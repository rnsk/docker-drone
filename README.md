### 使い方

```bash
$ cd ~/workspace
$ git clone git@bitbucket.org:rnsk/docker_drone.git プロジェクト名
$ cd プロジェクト名
$ cp .env.default .env
$ vi .env
$ docker-compose up -d
```

コンテナ確認

```bash
$ docker-compose ps
```

コンテナの中に入る

```bash
$ docker exec -it コンテナ名 /bin/sh
/html #
```

必要なパッケージをインストール

```bash
npm install
```

Webサーバー起動

```bash
forever start server.js

# 停止
forever stop server.js
# 再起動
forever restart server.js
# 実行中のスクリプト一覧
forever list
```

ブラウザから http://localhost:8080/ にアクセスすると表示される

トップページは `public/index.html`
