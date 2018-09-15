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
/html # npm install
```
