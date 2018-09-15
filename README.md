### 使い方

```shell-session
$ git clone https://github.com/rnsk/docker-drone.git プロジェクト名
$ cd プロジェクト名
$ cp .env.default .env
$ vi .env
$ docker-compose up -d
```

#### コンテナ確認

```shell-session
$ docker-compose ps
```

#### コンテナの中に入る

```shell-session
$ docker exec -it コンテナ名 /bin/sh
/html #
```

#### 必要なパッケージをインストール

```shell-session
# npm install
```

#### Webサーバー起動

##### 起動
```shell-session
# forever start server.js
```
##### 停止
```shell-session
# forever stop server.js
```
##### 再起動
```shell-session
# forever restart server.js
```
##### 実行中のスクリプト一覧
```shell-session
# forever list
```

#### 表示確認

ブラウザから http://localhost:8080/ にアクセスすると表示される

トップページは `html/public/index.html`

#### サンプルアプリで動作確認

```shell-session
# cd public
# bower install --allow-root
# node public/js/websocket.js
```

ブラウザから http://localhost:8080/ にアクセスすると、コンソールに `Socket 接続成功` と表示される
